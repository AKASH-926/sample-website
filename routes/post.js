const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");

const Blogs = require("../models/blog_schema");
const blogrouter = express.Router();

blogrouter.use(bodyparser.json());

blogrouter.post("/post", async (req, res) => {
  try {
    const blog = await Blogs.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user,
    });
    res.status(200).json({
      status: "sucess",
      blog: blog,
    });
  } catch (e) {
    res.status(401).json({
      status: "Failure",
      message: e.message,
    });
  }
});

module.exports = blogrouter;
