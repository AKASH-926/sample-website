const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/user");
const Blogroute = require("./routes/post");
const jwt = require("jsonwebtoken");
const secret = "RESTAPIAUTH";
var cors = require("cors");

const app = express();
app.use(cors());
mongoose.connect("mongodb://localhost/SignupDB", () => {
  console.log("connected to Database");
});
app.use("/nosebook", users);
//------------------------------------------------------------------------------------------------------------------------------
//jwt authorization here if it is passed moved next to post end point
app.use("/nosebook/home", (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (token) {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return res.status(401).json(err);
        }
        req.user = decoded.data;
        next();
      });
    } else {
      return res.status(401).json({
        status: "Failed",
        message: "Token is missing",
      });
    }
  } else {
    return res.status(403).json({
      status: "Failed",
      message: "Not authenticated user",
    });
  }
});
//--------------------------------------------------------------------------------------------------------------------------------
app.use("/nosebook/home", Blogroute);
//--------------------------------------------------------------------------------------------------------------------------------
app.listen(8000, () => console.log("server up at 8000"));
