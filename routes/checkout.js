const express = require("express");
const { getCheckout } = require("../controllers/checkout");
const router = express.Router();

router.post('/checkout', getCheckout)

module.exports = router;
