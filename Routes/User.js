const express = require("express");
const router = express.Router();
const Members = require("../models/Member");
require("dotenv").config();
const statusCode = require("../constants/status_codes");
const respones = require("../constants/responses");
const { USER_NOT_FOUND } = require("../constants/messages");
const passport = require("passport");
const jwt = require("jsonwebtoken")

router.get("/getmember", async (req, res) => {
  try {
    // find function of owner collection
    const event_members = await Members.find();

    // chcek if user exists
    if (!event_members) {
      res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
      });
    }
    // send data to fronend
    // 200 successful
    res.json({
      statusCode: statusCode.ACCEPTED.code,
      status: statusCode.ACCEPTED.status,
      data: event_members,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
    });
  }
});

router.post("/addmembers", async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    // find specificowner by email function of owner collection
    const event_members = await Members.findOne({
      email: req.body.email,
    });

    // chcek if user exists

    if (event_members) {
      res.json({
        statusCode: statusCode.CONFLICT.code,
        status: statusCode.CONFLICT.status,
      });
    }

    // create new Owner using model
    const memberUser = new Members({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      googleID: req.body.googleID,
      role: req.body.role,
      profile: {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
      },
      orders: [
        {
          orderNo: req.body.orderNo,
          status: req.body.status,
          paymentMethod: req.body.paymentMethod,
          paymentReceipt: req.body.paymentReceipt,
          shippingStatus: req.body.shippingStatus,
          address: req.body.addressOrder,
        },
      ],
      notifications: [
        {
          type: req.body.type,
          message: req.body.message,
        },
      ],
    });

    console.log(memberUser);
    // save created user
    const addedMember = await memberUser.save();

    // send successful message to frontend
    // send as json obj
    res.json({
      statusCode: statusCode.ACCEPTED.code,
      status: statusCode.ACCEPTED.status,
      data: "User added successfully",
      value: addedMember,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
    });
  }
});

// delete member
router.delete("/deleteMember/:email", async (req, res) => {
  try {
    const event_members = await Members.findOne({
      email: req.params.email,
    });

    // chcek if user exists
    if (!event_members) {
      res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
      });
    }

    // delete specific user
    // relavant to owner
    const deletedMember = await event_members.deleteOne();

    res.json({
      statusCode: statusCode.ACCEPTED.code,
      status: statusCode.ACCEPTED.status,
      message: "User deleted successfully",
      value: deletedMember,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
    });
  }
});

// update member
router.patch("/updateMember/:email", async (req, res) => {
  console.log(req.body);
  try {
    // find specificowner by email function of owner collection

    const event_members = await Members.findOne({ email: req.params.email });
    // chcek if user exists

    if (!event_members) {
      res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
      });
    }
    // update one specific user
    // update only selected fields mention below
    const updatedMember = await event_members.updateOne({
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profile: {
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
        },
      },
    });

    console.log(updatedMember);

    res.json({
      statusCode: statusCode.ACCEPTED.code,
      status: statusCode.ACCEPTED.status,
      message: "User updated successfully",
      value: updatedMember,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
    });
  }
});

module.exports = router;
