const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  itemID: {
    type: String,
    required: true,
  },
  itemName: {
    //Gimble ,Drone ,Smartwatch
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
    default: 0, // Assuming default is 0 if not specified
  },
  originalPrice: {
    type: String,
    // required: true    //DJi,parrot ,Actual RObotics,Skydio ,Hubsan
  },
  priceAfterDiscount: {
    type: String,
    // required: true    //5px,12px,20px,48px
  },
  warranty: {
    type: String,
    // required: true    //1"CMOS ,1/2.3" CMOS
  },

  camera: {
    type: String,
    required: false, // Assuming multiple URLs to product images can be stored
  },
  range: {
    type: String,
    // default: true  // in stock ,pre-order, post order
  },
  itemBrands: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  selectedBrand: {
    type: String,
  },
  flyTime: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  // preOrderAvailability: {
  //     type: Boolean,
  //     // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  // },
  axis: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  devices: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  features: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  itemDescription: {
    type: [String],
    default: [],
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  itemsWithAccessoriesImages3: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  itemsWithAccessoriesImages2: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  itemsWithAccessoriesImages1: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  itemImage: {
    type: [String],
    default: [],
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
  // availability: {
  //   type: String,
  // },
  
  offers: {
    type: String,
    // default: true  // if only  there is a different between the previousprice and nowprice , then this becomes true
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
