const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51OpmpaSH4cbIkpl01LYQST4vUR3bedqDwOKQKKyeodOeAlykd0ZREBfosE3mbRjkRcegH3kaAwZpmVBcF3jilVwB00FJ60GXRX');
const json = require("body-parser");
const dotenv=require("dotenv");

dotenv.config();

router.use(json.json());

router.post('/', async (req, res) => {
    try {
        const { name,amount } = req.body;
        if (!name && !amount) return res.status(400).json({ message: "Please enter a name and amount" });
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          currency: "INR",
          payment_method_types: ["card"],
          metadata: { name,amount },
          Name:name
        });
        const clientSecret = paymentIntent.client_secret;
        res.json({ status:'ok', message: "Payment initiated", clientSecret });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
})



module.exports = router;
