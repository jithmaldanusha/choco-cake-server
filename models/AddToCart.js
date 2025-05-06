const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// userd id and items of array needs to be here
const addToCartSchema = new Schema(
  {
    email: {
      type: String,
    },
    items: [
      {
        itemID: {
          type: String,
          // ref: 'Product',
          // required: true
        },
        itemName: {
          type: String,
          // required: true
        },
        quantity: {
          type: String,
          default: 1, // Default quantity is 1 if not specified
        },
        originalPrice: {
          type: String,
        },
        priceAfterDiscount: {
          type: String,
        },
        availability: {
          type: String,
        },
        itemDescription: {
          type: [],
        },
        shortDescription: {
          type: String,
        },
      },
    ],
    timestamp: { type: Date},
  },
  
);

const AddToCart = mongoose.model("AddToCart", addToCartSchema);

module.exports = AddToCart;
