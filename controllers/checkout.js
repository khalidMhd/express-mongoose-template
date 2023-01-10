const stripe = require("stripe")(
  "sk_test_51MLjFbECYBjDJma4dWvB6gX6MI2ABNAGwjoXSeJpWOvlKiUxWpImZYvjnTsc9d5omLxcvK8j5EH1QmM7QwPY3V2v00B8J4ImaZ"
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

exports.getCheckout = (req, res, next) => async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};