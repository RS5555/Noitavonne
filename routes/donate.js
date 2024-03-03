const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51OpmpaSH4cbIkpl01LYQST4vUR3bedqDwOKQKKyeodOeAlykd0ZREBfosE3mbRjkRcegH3kaAwZpmVBcF3jilVwB00FJ60GXRX');
const json = require("body-parser");

router.use(json.json());

router.post('/', async (req, res) => {
    // try {
    //     const { amount, token } = req.body;

    //     // Create a Payment Intent with Stripe
    //     const paymentIntent = await stripe.paymentIntents.create({
    //         amount: amount,
    //         currency: 'usd',
    //         description: 'Donation',
    //         payment_method: token, // Token representing the payment source
    //         confirm: true, // Confirm the Payment Intent immediately
    //     });

    //     // Handle successful payment
    //     console.log(paymentIntent);
    //     res.status(200).json({ message: 'Payment successful', paymentIntent });
    // } catch (error) {
    //     // Handle payment error
    //     console.error(error);
    //     res.status(500).json({ error: error.message });
    // }

    try {
        const { name,amount } = req.body;
        if (!name) return res.status(400).json({ message: "Please enter a name" });
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          currency: "INR",
          payment_method_types: ["card"],
          metadata: { name },
        });
        const clientSecret = paymentIntent.client_secret;
        res.json({ status:'ok', message: "Payment initiated", clientSecret });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
})



module.exports = router;
