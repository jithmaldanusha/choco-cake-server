const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
require("dotenv").config();
const statusCode = require("../constants/status_codes");
const multer = require("multer");
const Authorization = require("../configs/JWTAuth");

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
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, filefilter: filefilter });

// Get all products
router.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "No products found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: products,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Get all products
router.get("/getSingleProduct/:id", async (req, res) => {
  console.log("67 line" +req.params);
  
  try {
    const { id } = req.params;
    console.log("=====" + id + "dsfsdf");
    
    const products = await Product.findOne({"itemID": id});

    if (!products || products.length === 0) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "No products found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: products,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Get all products by filters
router.post("/getProductsFilter", async (req, res) => {
  const { checkboxes } = req.body;
  console.log(checkboxes);

  // Construct the query object dynamically
  const query = {};

  // Group values by fields
  checkboxes.forEach(({ field, value }) => {
    if (!query[field]) {
      query[field] = [];
    }
    query[field].push(value);
  });

  // Apply $in operator to query
  for (const [field, values] of Object.entries(query)) {
    query[field] = { $in: values };
  }

  try {
    // Find documents that match the constructed query
    console.log("+=============");
    console.log(query);
    const products = await Product.find(query);

    console.log(products);

    if (!products || products.length === 0) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "No products found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      data: products,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Add a new product
router.post(
  "/addProduct",
  upload.fields([
    { name: "itemDescription", maxCount: 3 },
    { name: "itemsWithAccessoriesImages1", maxCount: 1 },
    { name: "itemsWithAccessoriesImages2", maxCount: 1 },
    { name: "itemsWithAccessoriesImages3", maxCount: 1 },
    { name: "itemImage", maxCount: 5 },
  ]),
  async (req, res) => {
    console.log(req.body);
    try {
      const {
        itemID,
        itemName,
        itemType,
        shortDescription,
        topic1,
        description1,
        topic2,
        description2,
        topic3,
        description3,
        originalPrice,
        priceAfterDiscount,
        warranty,
        quantity,
        camera,
        range,
        itemBrands,
        selectedBrand,
        flyTime,
        axis,
        devices,
        features,
        itemDescription,
        itemsWithAccessoriesImages3,
        itemsWithAccessoriesImages2,
        itemsWithAccessoriesImages1,
        productImages,
        // availability,
        offers,
      } = req.body;
      // let imagename = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
      // const descImg = req.files["itemDescription"][0];
      const accessories1 = req.files["itemsWithAccessoriesImages1"][0];
      const accessories2 = req.files["itemsWithAccessoriesImages2"][0];
      const accessories3 = req.files["itemsWithAccessoriesImages3"][0];
      const files = [];
      for (let index = 0; index < req.files["itemImage"].length; index++) {
        files.push(
          req.protocol +
            "://" +
            req.get("host") +
            "/images/" +
            req.files["itemImage"][index].filename
        );
      }

      const filesGallery = [];
      for (let index = 0; index < req.files['itemDescription'].length; index++) {
        filesGallery.push(req.protocol + '://' + req.get('host') + '/images/' + req.files['itemDescription'][index].filename)
        
      }
      // const image4 = req.files["itemImage"][0];
      const newProduct = new Product({
        itemID,
        itemName,
        itemType,
        shortDescription,
        topic1,
        description1,
        topic2,
        description2,
        topic3,
        description3,
        originalPrice,
        priceAfterDiscount,
        warranty,
        quantity,
        camera,
        range,
        itemBrands,
        selectedBrand,
        flyTime,
        // preOrderAvailability,
        axis,
        devices,
        features,
        itemDescription: filesGallery,
        itemsWithAccessoriesImages1:
          req.protocol +
          "://" +
          req.get("host") +
          "/images/" +
          accessories1.filename,
        itemsWithAccessoriesImages2:
          req.protocol +
          "://" +
          req.get("host") +
          "/images/" +
          accessories2.filename,
        itemsWithAccessoriesImages3:
          req.protocol +
          "://" +
          req.get("host") +
          "/images/" +
          accessories3.filename,
        itemImage: files,
        // productImages,
        // availability,
        offers,
      });

      const savedProduct = await newProduct.save();

      res.json({
        statusCode: statusCode.CREATED.code,
        status: statusCode.CREATED.status,
        message: "Product added successfully",
        data: savedProduct,
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

// Update a product
router.patch("/updateProduct/:id",  async (req, res) => {
  console.log(req.body);
  try {
    const  {id}  = req.params;
    console.log(id);
    
    const updateData = req.body;
    // const accessories1 = req.files["itemsWithAccessoriesImages1"][0];


    console.log(req.body);
    

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData);
    
    

    if (!updatedProduct) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Product not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});



// Update a product for qty
router.patch("/updateSingleProduct/:id",  async (req, res) => {
  try {
    const  {id}  = req.params;
    console.log("updateSingleProduct"+id);
    
    const updateData = req.body;
    // const accessories1 = req.files["itemsWithAccessoriesImages1"][0];


    console.log(req.body);
    

    const updatedProduct = await Product.findOneAndUpdate({"itemID": id}, {$set: {quantity: req.body.quantity}});
    
    

    if (!updatedProduct) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Product not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});

// Delete a product
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.json({
        statusCode: statusCode.NOT_FOUND.code,
        status: statusCode.NOT_FOUND.status,
        message: "Product not found",
      });
    }

    res.json({
      statusCode: statusCode.OK.code,
      status: statusCode.OK.status,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
      status: statusCode.INTERNAL_SERVER_ERROR.status,
      message: error.message,
    });
  }
});



// router.patch("/getSingleProduct/:id", async (req, res) => {
//   try {
//     const  {id}  = req.params;
//     console.log(id);
    
//     const updateData = req.body;
//     // const accessories1 = req.files["itemsWithAccessoriesImages1"][0];


//     console.log(req.body);
    

//     const updatedProduct = await Product.findByIdAndUpdate(id, updateData);
    
    

//     if (!updatedProduct) {
//       return res.json({
//         statusCode: statusCode.NOT_FOUND.code,
//         status: statusCode.NOT_FOUND.status,
//         message: "Product not found",
//       });
//     }

//     res.json({
//       statusCode: statusCode.OK.code,
//       status: statusCode.OK.status,
//       message: "Product updated successfully",
//       data: updatedProduct,
//     });
//   } catch (error) {
//     res.json({
//       statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
//       status: statusCode.INTERNAL_SERVER_ERROR.status,
//       message: error.message,
//     });
//   }
// });



// router.get("/getProduct/:orderNo", async (req, res) => {
//   try {

//     const  {orderNo}  = req.params;
//     console.log(orderNo);
    

//     const products = await Product.findOne({"_id": orderNo});

//     if (!products || products.length === 0) {
//       return res.json({
//         statusCode: statusCode.NOT_FOUND.code,
//         status: statusCode.NOT_FOUND.status,
//         message: "No products found",
//       });
//     }

//     res.json({
//       statusCode: statusCode.OK.code,
//       status: statusCode.OK.status,
//       data: products,
//     });
//   } catch (error) {
//     res.json({
//       statusCode: statusCode.INTERNAL_SERVER_ERROR.code,
//       status: statusCode.INTERNAL_SERVER_ERROR.status,
//       message: error.message,
//     });
//   }
// });


module.exports = router;

