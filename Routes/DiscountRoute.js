const express = require("express");
const router = express.Router();
const Discount = require("../models/Discount");
require("dotenv").config();
const statusCode = require("../constants/status_codes");



// Get all discounts
router.get("/getDiscounts", async (req, res) => {
  try {
    const discounts = await Discount.find();

    if (!discounts || discounts.length === 0) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "No discounts found"
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: discounts
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message
    });
  }
});

// Add a new discount
router.post("/addDiscount", async (req, res) => {
  try {
    const { product_id, discount } = req.body;

    const newDiscount = new Discount({
      product_id,
      discount
    });

    const savedDiscount = await newDiscount.save();

    res.json({
      statusCode: statusCode.CREATED.code,
      status: statusCode.CREATED.status,
      message: "Discount added successfully",
      data: savedDiscount
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message
    });
  }
});

// Update a discount
router.patch("/updateDiscount/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedDiscount = await Discount.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedDiscount) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Discount not found"
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Discount updated successfully",
      data: updatedDiscount
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message
    });
  }
});

// Delete a discount
router.delete("/deleteDiscount/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDiscount = await Discount.findByIdAndDelete(id);

    if (!deletedDiscount) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Discount not found"
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Discount deleted successfully",
      data: deletedDiscount
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message
    });
  }
});

module.exports = router;
