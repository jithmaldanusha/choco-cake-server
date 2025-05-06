const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  username: {
    type: String,
    // required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true, // Ensure the password is required
  },
  googleID: {
    type: String,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  shippingaddress: {
    type: String,
  },
  phone: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    // required: true,
  },
  orders: [
    {
      orderNo: {
        type: String,
      },
      status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered"],
      },
      paymentMethod: {
        type: String,
        enum: ["cash on delivery", "online transfer", "payment gateway"],
      },
      paymentReceipt: {
        type: String, // URL to uploaded receipt for online transfer
      },
      shippingStatus: {
        type: String,
        enum: ["dispatched", "delivered"],
      },
      address: {
        type: String,
      },
    },
  ],
  notifications: [
    {
      type: {
        type: String,
      },
      message: {
        type: String,
      },
    },
  ],
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
