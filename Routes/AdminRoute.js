const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); 
require("dotenv").config();
const statusCode = require("../constants/status_codes");


// Route to fetch all admins (Only 1 admin is there)
router.get("/getAdmins", async (req, res) => {
    try {
      // find function of owner collection
      const event_admins = await Admin.find();
  
      // chcek if user exists
      if (!event_admins) {
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
        data: event_admins,
      });
    } catch (error) {
      res.json({
        statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
        status: statusCode.INTERNAL_SERVER_ERROR.status,
      });
    }
  });




// Route to create a new admin
router.post('/addAdmins', async (req, res) => {

    console.log(req.body);
  try {
    // console.log(req.body);
    // find specificowner by email function of owner collection
    const event_admin= await Admin.findOne({
      email: req.body.email,
    });

    // chcek if user exists

    if (event_admin) {
      res.json({
        statusCode: statusCode.CONFLICT.code,
        status: statusCode.CONFLICT.status,
      });
    }

    // create new Owner using model
    const admin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profile: {
            name: req.body.name,
            phone: req.body.phone,
        },
        
    });

    console.log(admin);
    // save created user
    const addedAdmin = await admin.save();

    // send successful message to frontend
    // send as json obj
    res.json({
      statusCode: statusCode.CREATED.code,
      status: statusCode.CREATED.status,
      data: "Admin added successfully",
      value: addedAdmin,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
    });
  }

});








// Route to update an admin's details
router.patch("/updateAdmin/:id", async (req, res) => {
    console.log(req.body);
    try {
      // find specificowner by email function of owner collection
  
      const event_members = await Admin.findById(req.params.id);
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
        },
      });
  
      console.log(updatedMember);
  
      res.json({
        statusCode: statusCode.ACCEPTED.code,
        status: statusCode.ACCEPTED.status,
        message: "Admin updated successfully",
        value: updatedMember,
      });
    } catch (error) {
      res.json({
        statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
        status: statusCode.INTERNAL_SERVER_ERROR.status,
      });
    }
  });




// delete admin
router.delete("/deleteAdmin/:id", async (req, res) => {
    try {
      const event_admin = await Admin.findById(req.params.id);
        console.log();
      // chcek if user exists
      if (!event_admin) {
        res.json({
          statusCode: statusCode.NOT_FOUND.code,
          status: statusCode.NOT_FOUND.status,
        });
      }
  
      // delete specific user
      // relavant to owner
      const deletedMember = await event_admin.deleteOne();
  
      res.json({
        statusCode: statusCode.OK.code,
        status: statusCode.OK.status,
        message: "Admin deleted successfully",
        value: deletedMember,
      });
    } catch (error) {
      res.json({
        statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
        status: statusCode.INTERNAL_SERVER_ERROR.status,
      });
    }
  });

module.exports = router;
