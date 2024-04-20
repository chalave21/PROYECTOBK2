const { json } = require("express");
const fs = require("fs");
const ProductManager = require("./productManager");
const productManager = new ProductManager();

class CartManager {
  constructor() {
    this.path = "carrito.json";
    this.carts = [];
    this.id = 0;
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);
      if (this.carts.length > 0) {
        //verifico si hay un carrito creado
        this.id = Math.max(...this.carts.map((cart) => cart.id));
      }
    } catch (error) {
      console.log("error al cargar los carritos creados");
      await this.saveCarts();
    }
  }

  async saveCarts() {
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  async createCart() {
    const newCart = {
      id: ++this.id,
      products: [],
    };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  async getCartById(id) {
    try {
      const cart = this.carts.find((c) => c.id === id);
      if (!cart) {
        throw new Error(`No existe un carrito con el id${id}`);
      }
      return cart;
    } catch (error) {
      console.error("error al obtener el carrito por el id", error);
      throw error;
    }
  }

  async addProductToCart(cid, pid, quantity = 1) {
    try {
      const cart = await this.getCartById(cid);
      const productById = await productManager.getProductById(pid);

      if (productById === "PRODUCT NOT FOUND") {
        throw new Error("Producto no encontrado");
      }
      const exist = cart.products.find((p) => p.product === pid);
      if (exist) {
        exist.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }
      await this.saveCarts();
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartManager;
