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
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(+pid);
    res.status(200).send(product);
  } catch (error) {
    console.log("!!!! error en la ruta get api/products/:pid", error);
    res.status(500).send("Algo salio mal...");
  }
});

router.post("/api/products", async (req, res) => {
  try {
    const getProduct = req.body;
    console.log(getProduct);
    await productManager.addProduct(getProduct);
    res.status(200).send("Producto agregado con excito");
  } catch (error) {
    console.log("!!!! error en la ruta post api/prodcts", error);
    res.status(500).send("Algo salio mal...");
  }
});

router.put("/api/products/:pid", async (req, res) => {
  try {
    let pId = req.params.pid;
    let product = req.body;
    await productManager.updateProduct(+pId, product);
    res.status(200).send("producto actualizado correctamente");
  } catch (error) {
    console.log("error en ruta put/api/products", error);
  }
});

router.delete("/api/products/:pid", async (req, res) => {
  try {
    let pId = req.params.pid;
    await productManager.deleteProduct(+pId);
    res.status(200).send("producto eliminado con exito.");
  } catch (error) {
    console.log("!!!error en ruta delete api/products/:pid", error);
    res.status(500).send("Algo salio mal...");
  }
});
module.exports = router;
