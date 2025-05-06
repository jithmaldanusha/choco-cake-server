const express = require("express");
const router = express.Router();
const AddToCart = require("../models/AddToCart");
require("dotenv").config();
const Member = require("../models/Member")
const Product = require("../models/Product")
const statusCode = require("../constants/status_codes");
const Authorization = require("../configs/JWTAuth");


// Get all items in the cart
router.get("/getCartItems/:email", async (req, res) => {

  const userEmail = req.params.email;
 
  console.log(userEmail);
  

  try {
    const cartItems = await AddToCart.findOne({email : userEmail});

    if (!cartItems || cartItems.length === 0) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "No items in the cart"
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: cartItems
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message
    });
  }
});


router.post('/addToCart', async (req, res) => {
  // items and user sent from FE
  const { items, user } = req.body;
  console.log(req.body);
  

  try {
    // Check if user exists
    const foundUser = await Member.findOne({email: user.email});
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure that products exist
    const productIds = items.map(item => item.itemID);
    const products = await Product.find({ itemID: { $in: productIds } });
    // console.log("===============hh=================");
   


    // error for now if condition not matching
    if (products.length !== productIds.length) {
      return res.status(404).json({ message: 'Some products not found' });
    }

    // Find or create the cart
    let cart = await AddToCart.findOne({ email: user.email });
    if (!cart) {
      cart = new AddToCart({ email:  user.email, items: [] });
    }

    // Update cart items
    items.forEach(item => {
      const existingItem = cart.items.find(cartItem => cartItem._id.equals(item._id));
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
    });

    // Save the cart
    await cart.save();
    res.status(200).json({ message: 'Items added to cart successfully', cart });
  } catch (error) {
    console.error('Error adding items to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Update an item in the cart
router.patch("/updateCartItem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCartItem = await AddToCart.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCartItem) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Cart item not found"
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Cart item updated successfully",
      data: updatedCartItem
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message
    });
  }
});

// Delete an item from the cart
router.delete("/deleteCartItem/:id", async (req, res) => {
  try {
    const id  = req.params.id;
    console.log(id);
    

    const deletedCartItem = await AddToCart.updateOne(
      { items: { $elemMatch: { itemID: id } } },
      { $pull: { items: { itemID: id } } }
    );

    if (!deletedCartItem) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Cart item not found"
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Cart item deleted successfully",
      data: deletedCartItem
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
