const express = require("express");
const productsRouter = require("./routes/products.router.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "./public"));

// app.engine("handlebars", exphbs.engine());
// app.set("view engine", "handlebars");
// app.set("views", "./src/views");

//rutas
app.use("/", productsRouter);
// app.use("/", cartsRouter);
// app.use("/", viewsRouter);

const PUERTO = 8080;

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
