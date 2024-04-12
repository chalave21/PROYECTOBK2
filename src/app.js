import { ProductManager } from "./dao/fs/productManager.js";

const productManager = new ProductManager();
await productManager.addProduct("asd", "asdsd", 123, "asdsd", "123", 11);
await productManager.addProduct("asd", "asdsd", 123, "asdsd", "124", 11);
console.log(await productManager.getProductById(8));
