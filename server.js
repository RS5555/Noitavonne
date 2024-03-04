const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv=require("dotenv");
dotenv.config();


app.use(cors());

app.get("/", (req, res) => {
  res.send("hello shubham sir");
});

const signUp = require("./routes/signUp");

app.use("/signUp", signUp);

const login = require("./routes/login");

app.use("/login", login);

const donate=require("./routes/donate");

app.use("/donate",donate);


app.listen(8000, (req, res) => {
  console.log(`server is running on port ${8000}`);
});

mongoose.connect("mongodb+srv://rohitvsawant1:knbigokgrOvaZMFr@stripeserver.4vzvgix.mongodb.net/?retryWrites=true&w=majority&appName=StripeServer")
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))