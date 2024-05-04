const mongoose = require("mongoose");

const cartsCollection = "carts";
const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model(cartsCollection, cartSchema);
module.exports = CartModel;
