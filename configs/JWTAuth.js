const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")
require("dotenv").config();



const Authorization =  (req, res, next) =>  {
    // const authHeader = req.headers["authorization"];
    // const token =authHeader &&  authHeader.split(" ")[1];

    const token = req.cookies.memberToken;
    console.log(token);
    
  
    if (!token) {
        res.sendStatus(403);
      }
  
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(401).json({
              error: error,
            });
          }
      
          req.user = user;
          next();
        });
  }

  module.exports = Authorization;