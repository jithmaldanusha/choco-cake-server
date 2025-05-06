const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")
require("dotenv").config();



// we can put this passport.authenticate () in a seperate middleware
router.get("/auth/google",
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
 
  
  router.get("/auth/google/callback", 
    passport.authenticate('google', { failureRedirect: '/admin' }),
    
    function(req, res) {
      // Successful authentication, redirect home.
      // successRedirect: "/someroute is will go to route when success"
      console.log("User authenticated");
      res.redirect('http://localhost:3000/');
    }
  )

  module.exports = router;