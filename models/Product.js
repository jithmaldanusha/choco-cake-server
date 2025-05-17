const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  itemID: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    // required: true
  },
  shortDescription: {
    type: String,
    // required: true
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
    type: String,
    default: 0,
  },
  originalPrice: {
    type: String,
  },
  priceAfterDiscount: {
    type: String,
  },
  warranty: {
    type: String,
  },

  camera: {
    type: String,
    required: false,
  },
  range: {
    type: String,
  },
  itemBrands: {
    type: String,
  },
  selectedBrand: {
    type: String,
  },
  flyTime: {
    type: String,
  },
  axis: {
    type: String,
  },
  devices: {
    type: String,
  },
  features: {
    type: String,
  },
  itemDescription: {
    type: [String],
    default: [],
  },
  itemsWithAccessoriesImages3: {
    type: String,
  },
  itemsWithAccessoriesImages2: {
    type: String,
  },
  itemsWithAccessoriesImages1: {
    type: String,
  },
  itemImage: {
    type: [String],
    default: [],
  },
  
  offers: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
