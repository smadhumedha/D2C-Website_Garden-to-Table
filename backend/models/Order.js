const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  date: { type: Date, default: Date.now }, // Auto timestamps
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;