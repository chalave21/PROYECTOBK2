const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/fs/productManager.js");
const productManager = new ProductManager();
router.get("/api/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (limit) {
      const productsFilter = products.slice(0, limit);
      res.status(200).send({ productsFilter });
      return;
    }
    res.status(200).send({ products });
    return;
  } catch (error) {
    console.log("!!!!!!!!!!!!!Error en la ruta GET api/products");
    console.log(error);
  }
});

router.get("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(+pid);
  res.status(200).send(product);
});
module.exports = router;
