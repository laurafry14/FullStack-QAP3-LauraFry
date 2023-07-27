const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3003;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // This is important!
app.use(methodOverride("_method")); // So is this!

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Laura Fry" });
});

const menuRouter = require("./routes/menu");
app.use("/menu", menuRouter);

const ingredientsRouter = require("./routes/ingredients");
app.use("/ingredients", ingredientsRouter);

// anything beginning with "/api" will go into this
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use("/public", express.static("public"));

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
