const express = require("express");
const router = express.Router();
const CartManager = require("../dao/fs/cartManager.js");
const cartManager = new CartManager();

//crear carrito
router.post("/api/carts", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Agregar productos a distintos carritos
router.post("/api/carts/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;
  try {
    const updateCart = await cartManager.addProductToCart(+cid, +pid, quantity);
    res.status(200).json(updateCart.products);
  } catch (error) {
    console.log("error al agregar un producto al carrito");
    res.status(500).json(error.message);
  }
});
//Obtener carrito segun ID
router.get("/api/carts/:cid", async (req, res) => {
  try {
    let id = req.params.cid;
    const cart = await cartManager.getCartById(+id);
    res.send(cart);
  } catch (error) {
    res.send("error al obtener el carrito por su id");
  }
});

module.exports = router;
