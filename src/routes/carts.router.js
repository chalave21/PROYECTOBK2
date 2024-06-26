const express = require("express");
const router = express.Router();
const CartManager = require("../dao/da/cartManager.db.js");
const cartManager = new CartManager();
const CartModel = require("../dao/models/cart.model.js");

//crear carrito
router.post("/api/carts", async (req, res) => {
  try {
    const nuevoCarrito = await cartManager.crearCarrito();
    res.json(nuevoCarrito);
  } catch (error) {
    console.error("Error al crear un nuevo carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Agregar productos a distintos carritos
router.post("/api/carts/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const actualizarCarrito = await cartManager.agregarProductoAlCarrito(
      cartId,
      productId,
      quantity
    );
    res.json(actualizarCarrito.products);
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
//Obtener carrito segun ID
router.get("/api/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const carrito = await CartModel.findById(cartId);

    if (!carrito) {
      console.log("No existe ese carrito con el id");
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    return res.json(carrito.products);
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//4) Eliminamos un producto especifico del carrito:

router.delete("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    //Verificamos:
    console.log(cartId);
    console.log(productId);

    const updatedCart = await cartManager.eliminarProductoDelCarrito(
      cartId,
      productId
    );

    res.json({
      status: "success",
      message: "Producto eliminado del carrito correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

//5) Actualizamos productos del carrito:

router.put("/api/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body;
  // Debes enviar un arreglo de productos en el cuerpo de la solicitud

  try {
    const updatedCart = await cartManager.actualizarCarrito(
      cartId,
      updatedProducts
    );
    res.json(updatedCart);
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

//6) Actualizamos las cantidades de productos

router.put("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;

    const updatedCart = await cartManager.actualizarCantidadDeProducto(
      cartId,
      productId,
      newQuantity
    );

    res.json({
      status: "success",
      message: "Cantidad del producto actualizada correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito",
      error
    );
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

//7) Vaciamos el carrito:

router.delete("/api/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Llamamos a la función para eliminar todos los productos del carrito
    const updatedCart = await cartManager.vaciarCarrito(cartId);

    res.json({
      status: "success",
      message:
        "Todos los productos del carrito fueron eliminados correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error("Error al vaciar el carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
