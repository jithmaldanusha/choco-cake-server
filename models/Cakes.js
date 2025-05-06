const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  itemID: {
    type: String,
    required: true,
    unique: true, 
  },
  itemName: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
  },
  topic1: {
    type: String,
  },
  description1: {
    type: String,
  },
  topic2: {
    type: String,
  },
  description2: {
    type: String,
  },
  topic3: {
    type: String,
  },
  description3: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  priceAfterDiscount: {
    type: Number,
  },
  itemDescription: {
    type: String,
  },
  itemImageMain: {
    type: String,
  },
  itemImage1: {
    type: String,
  },
  itemImage2: {
    type: String,
  },
  itemImage3: {
    type: String,
  },
});

const Cake = mongoose.model("Cake", productSchema);

module.exports = Cake;