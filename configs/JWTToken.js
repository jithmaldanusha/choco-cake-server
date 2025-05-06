const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Members = require("../models/Member");
const statusCode = require("../constants/status_codes");
require("dotenv").config();

router.post("/memberlogin", async (req, res) => {
  console.log(req.body);

  const { Memberemail, MemberPassword } = req.body;

  const userExist = await Members.findOne({ email: req.body.Memberemail });
console.log(userExist);

  if (!userExist) {
    res.json({
      statusCode: statusCode.NOT_FOUND.code,
      status: statusCode.NOT_FOUND.status,
    });
  } else {

    if (
      Memberemail === userExist.email &&
      MemberPassword === userExist.password
    ) {
      const payload = {
        email: req.body.Memberemail,
        // MemberPassword: req.body.MemberPassword,
        username: userExist.username,
        role: userExist.role,
      };

      const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });
      // refresh tokewn needs to be in DB
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: "100s",
      });
      // then need to push refresh token to DB

      // res.setHeader("authorization", accessToken);
      // res.setHeader("REfershauthorization", refreshToken);

      res.send({
        messsage: "Token Created",
        token: accessToken,
        refresh: refreshToken,
      });
    }
  }
});

// to get the tokens from refresh token
router.post("/getTokenRe", (req, res) => {
  // token willget from header
  // const authHeader = req.headers["REfershauthorization"];
  // const refresh =authHeader &&  authHeader.split(" ")[1];
  // token needs to come in body
  const refresh = req.body.refreshToken;
  if (!refresh) {
    res.json({
      statusCode: statusCode.UNAUTHORIZED.code,
      status: statusCode.UNAUTHORIZED.status,
    });
  }
  // now check refresh token from db and chek if this token(refresh) includse in db
  // if not forbidden
  // if(!token_from_db.include(refresh)){
  //   res.json({
  //     statusCode: statusCode.FORBIDDEN.code,
  //     status: statusCode.FORBIDDEN.status,
  //   })
  // }

  // if db has the token which is sent from req.body.refreshToken
  // thern verify
  jwt.verify(refresh, process.env.REFRESH_TOKEN, (error, user) => {
    if (error) {
      return res.status(401).json({
        error: error,
      });
    }
    // if no error means need to send new token again
    const accessToken = jwt.sign(
      { name: user.name },
      process.env.TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.json({
      messsage: "Token Created",
      token: accessToken,
    });
  });
});

// after operation need to delete token
// according to video token save in aray "refresh"
// then filter that to not to be in array
router.delete("/logout", (req, res) => {
  // delete token in DB
  const refresh = req.body.refreshToken;
  refresh = refresh.filter((t) => t !== refresh);
  res.json({
    statusCode: statusCode.NO_CONTENT.code,
    status: statusCode.NO_CONTENT.status,
  });
});

module.exports = router;
