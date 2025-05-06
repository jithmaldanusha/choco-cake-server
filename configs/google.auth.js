// import GoogleStrategy from "passport-google-oauth20";

const GoogleStrategy = require("passport-google-oauth20")
require("dotenv").config();
const config = require("./index.js")
const Member = require("../models/Member.js")
const MongoStore = require("connect-mongo")


// passport-google-oauth20 documentation
const googleAuth = (passport) => {
    GoogleStrategy.Strategy; 

    passport.use(
        new GoogleStrategy(
            {
        clientID:config.GOOGLE_CLIENT_ID,
        clientSecret:config.GOOGLE_CLIENT_SECRET,
        callbackURL:config.GOOGLE_CALLBACK_URL
    },
    async (accessToken,refreshToken,profile,callback) => {
        // will cretae obj here to save in mongodb
        const userObj = {
            username: profile.displayName,
            email: profile.emails[0].value,
            // password: req.body.password,
            googleID: profile.id,
            // role: req.body.role,
            profile: {
              name: profile.name.familyName,
            //   address: req.body.address,
            //   phone: req.body.phone,
            },
            orders: [
              {
                // orderNo: req.body.orderNo,
                // status: req.body.status,
                // paymentMethod: req.body.paymentMethod,
                // paymentReceipt: req.body.paymentReceipt,
                // shippingStatus: req.body.shippingStatus,
                // address: req.body.addressOrder,
              },
            ],
            notifications: [
              {
                // type: req.body.type,
                // message: req.body.message,
              },
            ],
        }
        const User = await Member.findOne({googleID: profile.id})

       

        if (User) {
            return callback(null,User);
        }

        const mem = new Member(userObj);
        const googleSaved = await mem.save();

         console.log(profile);
         return callback(null,googleSaved);
    }));


    //user serialize
    passport.serializeUser((user, callback) => {
        callback(null, user.id);
      });
      
      //user deserialize
      passport.deserializeUser((id, callback) => {
        Member.findById(id)
        .then(user => {
            callback(user)
        })
        .catch(err => {
          callback(err)
        })
        // callback(null, id);
        });   

};

//export the google auth function 
module.exports = googleAuth