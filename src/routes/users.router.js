const express = require("express");
const router = express.Router();
const userModel = require("../dao/models/user.model.js");

router.get("/api/users", async (req, res) => {
  try {
    let users = await userModel.find();
    res.send({ result: "succes", users });
  } catch (error) {
    res.send("Error al obtener usuarios");
  }
});

router.post("/api/users", async (req, res) => {
  const { name, last_name, email } = req.body;
  if (!name || !last_name || !email) {
    res.send({ status: "Error", error: "Incomplete values" });
  }
  const result = await userModel.create({
    name,
    last_name,
    email,
  });
  res.send({ status: "succes", payload: result });
});

router.put("/api/users/:uid", async (req, res) => {
  let { uid } = req.params;
  let userReplace = req.body;

  if (!userReplace.name || !userReplace.last_name || !userReplace.email) {
    return res.send({ status: "Error", error: "Incomplete values" });
  }
  let result = await userModel.updateOne({ _id: uid }, userReplace);
  res.send({ status: "succes", payload: result });
});

router.delete("/api/users/:uid", async (req, res) => {
  try {
    let { uid } = req.params;

    let result = await userModel.deleteOne({ _id: uid });
    res.send({ status: "succes", payload: result });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
