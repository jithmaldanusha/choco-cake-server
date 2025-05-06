const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const statusCode = require("../constants/status_codes");
const multer = require("multer");

// multer image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // image save in upload folder
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

// which files need to be sent to db
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/pdf" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, filefilter: filefilter });

// Get all orders
router.get("/getOrders", async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "No orders found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: orders,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Get an order by email
router.get("/getOrder/:Email", async (req, res) => {
  console.log(req.params);

  try {
    const { Email } = req.params;
    const order = await Order.find({ email: Email });

    if (!order) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Order not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: order,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});


// Get an order by ID
router.get("/getOrderQty/:id", async (req, res) => {
  console.log(req.params);

  try {
    const { id } = req.params;
    console.log("==="+ id + "myid");
    
    const order = await Order.findById(id);

    if (!order) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Order not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: order,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Create a new order
router.post(
  "/createOrder",
  upload.single("paymentReceipt"),
  async (req, res) => {
    console.log("======body=======");

    console.log(req.body);

    try {
      const {
        orderNo,
        products,
        userId,
        firstName,
        lastName,
        contactNumber,
        email,
        birthday,
        shippingAddress,
        nearestCity,
        district,
        paymentMethod,
        paymentReceipt,
        orderTotal,
        itemCount,
        deliveryCost,
        
      } = req.body;

      const rawProducts = req.body.products;

      // Function to transform raw product data into the expected schema format
      function transformProducts(rawProducts) {
        console.log(typeof rawProducts);
          // for cart values
        if (typeof rawProducts === "string") {
          const prods = JSON.parse(rawProducts);
          console.log(prods);

          return prods
            .map((product) => {
              if (product === "") {
                return null;
              } else {
                // const prod = JSON.parse(product);
                // console.log("prod" +prod);

                return {
                  productId: product._id,
                  quantity: product.quantity,
                  itemID: product.itemID,
                  priceAfterDiscount: product.priceAfterDiscount,
                  itemName: product.itemName,
                  shortDescription: product.shortDescription,
                  // availability: product.availability,
                };
              }
            })
            .filter((product) => product !== null); // Remove null entries if any
        } else {
          // onr product
          return rawProducts
            .map((product) => {
              if (product === "") {
                return null;
              } else {
                const prod = JSON.parse(product);
                console.log("prod" + prod);

                return {
                  productId: prod._id,
                  quantity: prod.quantity,
                  itemID: prod.itemID,
                  priceAfterDiscount: prod.priceAfterDiscount,
                  itemName: prod.itemName,
                  shortDescription: prod.shortDescription,
                  // availability: prod.availability,
                };
              }
            })
            .filter((product) => product !== null); // Remove null entries if any
        }
      }

      // // Use the transformation function
      const formattedProducts = transformProducts(rawProducts);

      

      const newOrder = new Order({
        orderNo,
        products: formattedProducts,
        userId,
        firstName,
        lastName,
        contactNumber,
        email,
        birthday,
        shippingAddress,
        nearestCity,
        district,
        paymentMethod,
        paymentReceipt: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`: null,
        orderTotal,
        itemCount,
        deliveryCost,
     
      });

      const savedOrder = await newOrder.save();

      res.json({
        statusCode: statusCode.CREATED.code,
        status: statusCode.CREATED.status,
        message: "Order created successfully",
        data: savedOrder,
      });
    } catch (error) {
      res.json({
        statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
        status: statusCode.INTERNAL_SERVER_ERROR.status,
        message: error.message,
      });
    }
  }
);

// Update an order
router.patch("/updateOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body.status;

    console.log(id, updateData);

    const updatedOrder = await Order.findByIdAndUpdate(id, {
      status: updateData,
    });

    if (!updatedOrder) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Order not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Delete an order
router.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Order not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Approve or refuse an order
router.patch("/approveOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { approved },
      { new: true }
    )
      .populate("userId", "firstName lastName email")
      .exec();

    if (!updatedOrder) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Order not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: `Order ${approved}`,
      data: updatedOrder,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Mark order as delivered
router.patch("/markAsDelivered/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { delivered } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { delivered },
      { new: true }
    )
      .populate("userId", "firstName lastName email")
      .exec();

    if (!updatedOrder) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Order not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: `Order marked as ${delivered}`,
      data: updatedOrder,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});



// Get Order total income
router.get("/getTotalIncome", async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "No orders found",
      });
    }
   

    // Calculate the total income
    const totalIncome = orders.reduce((sum, order) => sum + (parseInt(order.orderTotal) || 0), 0);

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: { totalIncome },
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});


// Get Monthly Income
router.get("/getMonthlyIncome", async (req, res) => {
  try {
    const startOfMonth = new Date();
    console.log(startOfMonth);
    
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);
    endOfMonth.setDate(0)
    endOfMonth.setHours(0, 0, 0, 0);

    console.log(endOfMonth);
    console.log(startOfMonth);
    

    const orders = await Order.find({
      timePlaced: { $gte: startOfMonth, $lt: endOfMonth }
    });
    console.log(orders);
    

    if (!orders || orders.length === 0) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "No orders found for the current month",
      });
    }

    console.log(orders);
    

    // Calculate the total income for the current month
    const totalMonthlyIncome = orders.reduce((sum, order) => sum + (parseInt(order.orderTotal) || 0) , 0);
    

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data:  {totalMonthlyIncome} ,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});


module.exports = router;
