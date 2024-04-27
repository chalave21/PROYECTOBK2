const express = require("express");
const router = express.Router();

router.get("/api/hbs", async (req, res) => {
  const obj = {
    name: "Maria",
    edad: 23,
  };
  res.render("index", obj);
});

module.exports = router;
