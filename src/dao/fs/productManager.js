export class ProductManager {
  constructor() {
    this.products = [];
    this.idProduct = 1;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      //Se controla que no se repitan los campos
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("!!!!!!!!!!!!!!! TODOS LOS CAMPOS SON OBLIGATORIOS");
        return;
      }
      let repitCode = this.products.find((product) => product.code === code);

      //Se controla que no se repita el codigo
      if (repitCode) {
        console.log(
          "!!!!!!!!!!!!!!!! NO SE PUDO AGREGAR EL PRODUCTO, EL CODIGO INGRESADO YA EXISTE"
        );
        return;
      }
      const newProduct = {
        id: this.idProduct++,
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
      };
      //Se agrega el nuevo producto
      this.products.push(newProduct);
    } catch (error) {
      console.log("!!!!!!!!!!!!!!!! Error al agregar el producto", error);
    }
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(id) {
    try {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        return "PRODUCT NOT FOUND";
      }
    } catch (error) {
      console.log("!!!!!!!!!!!ERROR AL BUSCAR PRODUCTO SEGUND ID:", error);
    }
  }
}
