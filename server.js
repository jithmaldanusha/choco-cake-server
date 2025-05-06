const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();
// Make sure to add .js extension for ES modules
const logger = require("./utils/logger.js");
const passport = require("passport");
const googleAuth = require("./configs/google.auth.js");
const session = require("express-session");
const config = require("./configs/index.js");
const MongoStore = require("connect-mongo");
const path = require("path");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");

//import google auth function
//import { googleAuth } from './configs/google.auth.js';

//import passport
///import passport from  "passport";

// Load environment variables from .env file
// dotenv.config();

// Create Express app
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend origin
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(cookieParser()); // Parse cookies

app.use("/images", express.static(path.join(__dirname, "images")));
// Middleware
app.use(express.json());
app.use(bodyParser.json());
// create expression session for passport session stuff
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 10000),
      maxAge: 10000,
    },
  })
);
// to initialize session in google auth
app.use(passport.initialize());
app.use(passport.session());
// MongoDB connection string from .env file
const URL = process.env.MONGODB_URL;

// MongoDB connection
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// i have both user and UserRoute here i used userRoute
// this might me issue with my curent logged user it uses old user details
// change accordingly
const Member = require("./Routes/UserRoute.js");
app.use("/member", Member);

const Admin = require("./Routes/AdminRoute.js");
app.use("/admin", Admin);

const Product = require("./Routes/ProductRoute.js");
app.use("/product", Product);

const Discount = require("./Routes/DiscountRoute.js");
app.use("/discount", Discount);

const AddToCart = require("./Routes/AddToCartRoute.js");
app.use("/cart", AddToCart);

const OrderRoute = require("./Routes/OrderRoute.js");
app.use("/order", OrderRoute);

const gAuth = require("./configs/GAuth.js");
app.use("/gAuth", gAuth);

const Jtoken = require("./configs/JWTToken.js");
app.use("/jAuth", Jtoken);

const JAuth = require("./configs/JWTAuth.js");
const { log } = require("console");
app.use("/Auth", JAuth);

// email send
//send approval email starts here

//sending email route
app.post("/send-email", async (req, res) => {
  // Create a transporter with environment variables for email credentials
  const {
    inputValue,
    email,
    deliveryCost,
    orderTotal,
    firstName,
    lastName,
    shippingAddress,
    paymentMethod,
    status,
    contactNumber,
    poNumber,
    invoiceDate,
    paymentTerms,
    dueDate,
    balanceDue,
    item,
    quantity,
    rate,
    subtotal,
    discount,
    total,
    amountPaid,
    products
  } = req.body;
  console.log(inputValue);
  console.log(email);
  console.log(products);

  // Function to transform raw product data into the expected schema format





  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for email user
      pass: process.env.EMAIL_PASS, // Use environment variable for email password
    },
  });

  // Create a PDF document to send
  const doc = new PDFDocument();
  const passThroughStream = new PassThrough();
  doc.pipe(passThroughStream);

  // Generate a random invoice number
  const generateRandomInvoiceNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000); // Generates a number between 0 and 999999
    return `INV-${randomNum.toString().padStart(6, '0')}`; // Format with leading zeros
  };

  // Use the function to generate a random invoice number
  const invoiceNumber = generateRandomInvoiceNumber();

  // PDF content with additional details
  // Generate the PDF content
  doc.fontSize(12);

  // SPK Store Logo
  doc.image("images/spklogo.jpeg", 50, 45, { width: 100 }).moveDown();

  // Store Information
  doc.font("Helvetica-Bold").text("SPK STORE", 200, 50, { align: "right" });
  doc.font("Helvetica").text(`Invoice # ${invoiceNumber}`, 200, 65, { align: "right" });
  doc.font("Helvetica").text(`Track Id # ${inputValue}`, 200, 80, { align: "right" });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 200, 95, { align: "right" });
  doc.text(`Payment Method: ${paymentMethod}`, 200, 110, { align: "right" });

  // Billing and Shipping Information
  doc.moveDown().moveDown();
  doc.font("Helvetica-Bold").text("Ship To:", 50, 200);
  doc.font("Helvetica").text(`${firstName} ${lastName}`, 50, 215);
  doc.text(`${shippingAddress}`, 50, 230);
  doc.text(`${contactNumber}`, 50, 245) // Add phone number


  // Items Table Header
  doc.moveDown().moveDown();
  doc.rect(50, 280, 500, 20).fillColor("#000000").fill();  // Black background for the header
  doc.fillColor("white").font("Helvetica-Bold").text("Item", 55, 283);
  doc.text("Quantity", 250, 283);
  doc.text("Rate", 350, 283);
  doc.text("Amount", 450, 283);

  //  const arr = JSON.parse(products);

  // const flattenedProducts = arr;
  // console.log(typeof flattenedProducts);
  let currentY = 310;  // Starting Y positio

  products.filter(prod => prod && prod.itemID).forEach((product) => {
    const { itemName, quantity, priceAfterDiscount } = product;  // Correct destructuring
    console.log(itemName + quantity + priceAfterDiscount)
    console.log(product)
    doc.fillColor("black").font("Helvetica").text(itemName, 55, currentY);
    doc.text(quantity, 250, currentY);
    doc.text(priceAfterDiscount, 350, currentY);
    doc.text(`${parseFloat(priceAfterDiscount) * parseInt(quantity)}`, 450, currentY);
    currentY += 30;
  });


  // Summary Section
  doc.moveDown().moveDown();
  doc.text(`Total: ${orderTotal}`, 400, 370);
  doc.text(`Delivery cost: ${deliveryCost}`, 400, 385);
  //doc.rect(395, 395, doc.widthOfString(`Balance Due: ${balanceDue}`) + 10, 20).fillAndStroke("#000", "#000").fillColor("#FFF").fontSize(12).font("Helvetica-Bold").text(`Balance Due: ${balanceDue}`, 400, 400);


  // Notes and Terms
  doc.moveDown().moveDown();
  doc.font("Helvetica-Bold").text("Notes:", 50, 450);
  doc.font("Helvetica").text("Thanks for buying our product.", 50, 465);

  doc.font("Helvetica-Bold").text("Terms:", 50, 490);
  doc.font("Helvetica").text("This warranty is valid for manufacturing defects only. We do not take any responsibility for the effects caused by external factors.", 50, 505, { width: 500 });

  doc.end();

  // Email options
  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Invoice ${inputValue}`,
    text: `Dear ${firstName} ${lastName},\n\nPlease find attached your invoice for the recent purchase.\n\nBest regards,\nSPK Store`,
    attachments: [
      {
        filename: `Invoice-${poNumber}.pdf`,
        content: passThroughStream,
        contentType: "application/pdf",
      },
    ],
  };


  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email with PDF sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
});

//send approve email ends here

//refuse email starts here
// Route to send refusal email
app.post("/refuse-email", async (req, res) => {


  const { email } = req.body;  // Ensure email is being sent in req.body
  console.log(email);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }




  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for email user
      pass: process.env.EMAIL_PASS, // Use environment variable for email password
    },
  });

  //the refuse mail content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable for sender email
    //this should be user's email
    to: email,
    subject: "Order Declined – Further Action Required",
    text: `Dear Customer,

    We regret to inform you that your recent order has been declined. Below are some possible reasons for the decline:
    
    - False Payment: The payment information provided appears to be incorrect or fraudulent.
    - Incorrect Uploaded Slip: The payment slip you uploaded does not match our records or contains errors.
    - Incomplete Payment: The payment process was not completed successfully.
    - Insufficient Funds: There may be insufficient funds in your account to complete the transaction.
    - Card Declined: Your card issuer may have declined the transaction for various reasons.
    - Technical Error: A technical issue may have occurred during the payment process.
    
    Please review your payment details and try again. If you believe this message is an error or need further assistance, feel free to contact our customer support team.
    
    We apologize for any inconvenience caused and appreciate your understanding.
    
    For more details, contact us:
    
    WhatsApp: 0772761689
    Email: contacspkstore@gmail.com.com
    

    Best regards`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order refusal email sent successfully" });
  } catch (error) {
    console.error("Error sending refusal email:", error);
    res
      .status(500)
      .json({ message: "Error sending refusal email", error: error.message });
  }
});



//sending notify email starts here
app.post("/notify-order", async (req, res) => {
  // console.log( " ======== = = "+req.body + " ===== ==== === === ");

  const { to, subject, message, qty, prods } = req.body;
  console.log("==== req.body prods ==== " + req.body.prods);
  console.log("==== req.body prods ==== " + typeof req.body.prods);
  console.log("==== req.body msg ==== " + req.body.message);
  console.log("==== req.body subject ==== " + req.body.subject);

  let jsonString = JSON.stringify(prods);
  console.log(jsonString);
  console.log("========= string ======= " + typeof + jsonString);

  // Convert it back to a JSON object
  let jsonObject = JSON.parse(jsonString);

  console.log("orderNO: " + jsonObject.orderNo);

  // jsonObject.products.filter(prod => prod && prod.itemID).forEach((product) => {
  //   const { itemName, quantity, priceAfterDiscount } = product;  // Correct destructuring
  //   console.log("============== "+itemName + quantity + priceAfterDiscount+" ========")
  //   // console.log(product)
  //   // doc.fillColor("black").font("Helvetica").text(itemName, 55, currentY);
  //   // doc.text(quantity, 250, currentY);
  //   // doc.text(priceAfterDiscount, 350, currentY);
  //   // doc.text(`${parseFloat(priceAfterDiscount) * parseInt(quantity)}`, 450, currentY);
  //   // currentY += 30;
  // });

  const productDetails = jsonObject.products
    .filter(prod => prod && prod.itemID)
    .map(product => {
      const { itemName, quantity, priceAfterDiscount } = product;
      return `${itemName}: Quantity - ${quantity}, Product Price - LKR ${priceAfterDiscount}, Total - LKR ${parseFloat(priceAfterDiscount) * parseInt(quantity)}`;
    })
    .join('\n'); // Join the details with a new line


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for email user
      pass: process.env.EMAIL_PASS, // Use environment variable for email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'contacspkstore@gmail.com',//admin's email
    subject: subject,
    text: `Dear Admin,

    ${message}

    product Details: ${productDetails}
    
    Best regards,
    SPK Store`

    ,
  };

  // product details : ${prods.itemName}, (${prods.quantity})



  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order notification email sent successfully" });
  } catch (error) {
    console.error("Error sending order notification email:", error);
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
});
//notify email ends here



// mongo connection
const connection = mongoose.connection;
connection.once("open", () => {
  logger.info("MongoDB connected");
});

// Start the server
const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  googleAuth(passport);
});
