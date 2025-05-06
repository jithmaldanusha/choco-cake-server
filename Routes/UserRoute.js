const express = require("express");
const router = express.Router();
const Members = require("../models/Member");
require("dotenv").config();
const statusCode = require("../constants/status_codes");
const responses = require("../constants/responses");
const { USER_NOT_FOUND } = require("../constants/messages");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Get all members
router.get("/getmember", async (req, res) => {
  try {
    const event_members = await Members.find();

    if (!event_members) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
      });
    }

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


// Get member by email
router.get("/getmember/:email", async (req, res) => {
  try {
    const event_members = await Members.findOne({email: req.params.email});

    if (!event_members) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
      });
    }

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

// Add a new member
router.post("/addmembers", async (req, res) => {
  try {
    const existingMember = await Members.findOne({ email: req.body.email });

    if (existingMember) {
      return res.json({
        statusCode: statusCode.CONFLICT.code,
        status: statusCode.CONFLICT.status,
      });
    }

    const memberUser = new Members({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      contactnumber: req.body.contactnumber,
      email: req.body.email,
      password: req.body.password,
      googleID: req.body.googleID,
      role: req.body.role,
      shippingaddress: req.body.shippingaddress,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      orders: [
        {
          orderNo: req.body.orderNo,
          status: req.body.status,
          paymentMethod: req.body.paymentMethod,
          paymentReceipt: req.body.paymentReceipt,
          shippingStatus: req.body.shippingStatus,
          address: req.body.addressOrder,
          delivered: req.body.delivered || "pending", // Default to "pending" if not provided
          approved: req.body.approved || "pending",   // Default to "pending" if not provided
        },
      ],
      notifications: [
        {
          type: req.body.type,
          message: req.body.message,
        },
      ],
    });

    const addedMember = await memberUser.save();

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

// Delete a member
router.delete("/deleteMember/:email", async (req, res) => {
  try {
    const event_members = await Members.findOne({ email: req.params.email });

    if (!event_members) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
      });
    }

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



// Update a member
router.patch("/updateMember/:email", async (req, res) => {
  try {
    const event_members = await Members.findOne({ email: req.params.email });

    if (!event_members) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
      });
    }

    const updatedMember = await event_members.updateOne({
      $set: {
        // username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contactnumber: req.body.contactnumber,
        shippingaddress: req.body.shippingaddress,
        // password: req.body.password,
      
        dateOfBirth: req.body.dateOfBirth,
        // orders: req.body.orders || event_members.orders, // Update orders if provided
      },
    });

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


// Update a member password to new
router.patch("/updatePassword/:email", async (req, res) => {
  console.log(req.body);
  
  try {
    const event_members = await Members.findOne({ email: req.params.email });

    if (!event_members) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
      });
    }



    const updatedMember = await event_members.updateOne({
      $set: {
        password: req.body.field2,
        // lastname: req.body.lastname,
      
      },
    });

    res.json({
      statusCode: statusCode.ACCEPTED.code,
      status: statusCode.ACCEPTED.status,
      message: "User password updated successfully",
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
