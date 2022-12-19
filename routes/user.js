const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const { body, validationResult } = require("express-validator");
const User = require("../models/user_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "RESTAPIAUTH";
const router = express.Router();
router.use(bodyparser.json());
//-------------------------------------------------------------------------------------------------------------------------------------
router.post(
  "/signup",
  body("name").isAlphanumeric(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          status: 400,
          message: "check entered Credentials",
        });
      }
      const { name, email, password, confirmPassword } = req.body;

      const user_email = await User.findOne({ email: email });
      if (user_email) {
        return res.status(401).json({
          status: "failure",
          message: "Email aldready present",
        });
      }
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            status: "failure",
            message: err.message,
          });
        }
        const user = await User.create({
          name: name,
          email: email,
          password: hash,
          confirmPassword: hash,
        });
        res.status(200).json({
          status: "Success",
          user: user,
        });
      });
    } catch (e) {
      res.status(401).json({
        status: "failure",
        message: e.message,
      });
    }
  }
);
// -------------------------------------------------------------------------------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "Email doesnot exist",
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(401).json({
          status: "failure",
          message: err,
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user._id,
          },
          secret
        );

        return res.status(200).json({
          status: "Success",
          message: "Login Successfull",
          token,
        });
      } else {
        res.status(401).json({
          status: "failure",
          message: "password Incorrect",
        });
      }
    });
  } catch (e) {
    res.status(401).json({
      status: "failure",
      message: e.message,
    });
  }
});

module.exports = router;
