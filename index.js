const express = require("express");
const app = express();
const PORT = 3002;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // This is important!
// app.use(methodOverride("_method")); // So is this!

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Laura Fry" });
});

const menuRouter = require("./routes/menu");
app.use("/menu", menuRouter);

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
