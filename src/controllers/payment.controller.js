const Membership = require("../models/membership.model");

exports.createpaymentIntent = async (req, res) => {
	const { items } = req.body;
const stripe = require("stripe")('sk_test_51KjO05SIZIXyeU3AU3WHB3kpiiJwjqqA9vaBLDkwXvmt4T9x0OmrsHQTxGZhqNkEiMXuvbH9iVLZetCBKR3fsvvx00LsoF5ACZ');

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

exports.chargePayment = async (req, res) => {
  const stripe = require("stripe")('sk_test_51KjO05SIZIXyeU3AU3WHB3kpiiJwjqqA9vaBLDkwXvmt4T9x0OmrsHQTxGZhqNkEiMXuvbH9iVLZetCBKR3fsvvx00LsoF5ACZ');

  let { membershipID,payment } = req.body;
    Membership.getMembershipById(membershipID,async (err, data) => {
      var amount=data["monthlyCost"];
      try {
    const paymentRes = await stripe.paymentIntents.create({
      amount: amount*100,
      currency: "INR",
      description:data["name"] +" subscription plan",
      payment_method: payment["id"],
      confirm: true,
      
      });
    res.status(201).send({
              status: "success",
              data: paymentRes,
            });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.status(500).send({
              status: "error",
              data: error.message,
            });
}

    });

  
}