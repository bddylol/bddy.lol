import express from "express";

const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { example: "Express + Pug" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
