const express = require("express");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const exphbs = require("express-handlebars");
const viewsRouter = require("./routes/views.router.js");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users.router.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "./public"));

app.engine("handlebars", exphbs.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//rutas
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);
app.use("/", usersRouter);

const PUERTO = 8080;

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

async function conectarDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://coderhouse:coder@cluster0.7hlgznp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conexión exitosa a MongoDB");
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  }
}

conectarDB();
