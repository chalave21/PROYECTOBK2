const fs = require("fs");
class ProductManager {
  constructor() {
    this.path = "data.txt";
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      // Validación de campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("!!!!!!!!!!!!!!! TODOS LOS CAMPOS SON OBLIGATORIOS");
        return;
      }

      let products = [];

      // Si el archivo ya existe, lee su contenido y parsea la cadena JSON
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(data);

        // Verifica si el código del producto ya existe
        if (products.find((product) => product.code === code)) {
          console.log(
            "!!!!!!!!!!!!!!!! NO SE PUDO AGREGAR EL PRODUCTO, EL CODIGO INGRESADO YA EXISTE"
          );
          return;
        }
      }

      const lastProductId =
        products.length > 0 ? products[products.length - 1].id : 0;

      // Crea el nuevo producto
      const newProduct = {
        id: lastProductId + 1,
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
      };

      // Agrega el nuevo producto al array de productos
      products.push(newProduct);

      // Convierte el array de productos a formato JSON
      const jsonData = JSON.stringify(products, null, 2);

      // Escribe los datos en el archivo
      await fs.promises.writeFile(this.path, jsonData, "utf-8");

      console.log("¡Producto agregado correctamente!");
    } catch (error) {
      console.log("!!!!!!!!!!!!!!!! Error al agregar el producto", error);
    }
  }

  async getProducts() {
    try {
      // Si el archivo no existe, retorna un array vacío
      if (!fs.existsSync(this.path)) {
        return [];
      }

      // Lee el contenido del archivo y parsea la cadena JSON
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);

      return products;
    } catch (error) {
      console.log("!!!!!!!!!!! Error al obtener los productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      // Obtiene todos los productos
      const products = await this.getProducts();

      // Busca el producto por su ID
      const product = products.find((p) => p.id === id);

      if (product) {
        return product;
      } else {
        return "PRODUCT NOT FOUND";
      }
    } catch (error) {
      console.log("!!!!!!!!!!!ERROR AL BUSCAR PRODUCTO SEGUN ID:", error);
      return "ERROR";
    }
  }
  async updateProduct(id, updatedProduct) {
    try {
      // Obtener todos los productos
      let products = await this.getProducts();

      // Buscar el índice del producto a actualizar
      const index = products.findIndex((p) => p.id === id);

      // Verificar si se encontró el producto
      if (index !== -1) {
        // Actualizar el producto en el array
        products[index] = { ...products[index], ...updatedProduct };

        // Convertir el array de productos a formato JSON
        const jsonData = JSON.stringify(products, null, 2);

        // Escribir los datos actualizados en el archivo
        await fs.promises.writeFile(this.path, jsonData, "utf-8");

        console.log("¡Producto actualizado correctamente!");
      } else {
        console.log("¡Producto no encontrado!");
      }
    } catch (error) {
      console.log("!!!!!!!!!!!!!!!! Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      // Obtener todos los productos
      let products = await this.getProducts();

      // Filtrar los productos para excluir el que se va a eliminar
      products = products.filter((product) => product.id !== id);

      // Convertir el array de productos a formato JSON
      const jsonData = JSON.stringify(products, null, 2);

      // Escribir los datos actualizados en el archivo
      await fs.promises.writeFile(this.path, jsonData, "utf-8");

      console.log("¡Producto eliminado correctamente!");
    } catch (error) {
      console.log("!!!!!!!!!!!!!!!! Error al eliminar el producto", error);
    }
  }
}

module.exports = ProductManager;
