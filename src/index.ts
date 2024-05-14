import express from "express";

const app = express();
// get port from environment variable or use 3000 as default
const port = process.env.PORT || 3000;
const production = process.env.NODE_ENV === "production";

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { example: "Express + Pug" });
});

app.listen(port, () => {
  console.log(
    `Server is running at ${
      production ? "https://bddy.lol" : `http://localhost:${port}`
    }`
  );
});
