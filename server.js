const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv=require("dotenv");
// dotenv.config();

app.get("/", (req, res) => {
  res.send("hello shubham sir");
});

const signUp = require("./routes/signUp");

app.use("/signUp", signUp);

const login = require("./routes/login");

app.use("/login", login);


app.listen(5000, (req, res) => {
  console.log("server is running on port 5000");
});

mongoose.connect("mongodb://127.0.0.1:27017/noitavonne")
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))