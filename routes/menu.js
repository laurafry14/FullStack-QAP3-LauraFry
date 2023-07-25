const express = require("express");
const router = express.Router();
const pizzasDal = require("../services/pg.menu.dal");

router.get("/", async (req, res) => {
  try {
    let theMenu = await pizzasDal.getPizzas();
    if (DEBUG) console.table(theMenu);
    res.render("menu", { theMenu });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let anPizza = await pizzasDal.getPizzaByPizzaId(req.params.id);
    if (anPizza.length === 0) res.render("norecord");
    else res.render("pizza", { anPizza });
  } catch {
    res.render("503");
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("pizza.Replace : " + req.params.id);
  res.render("pizzaPut.ejs", {
    name: req.query.name,
    theId: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("menu.Delete : " + req.params.id);
  res.render("pizzaDelete.ejs", {
    name: req.query.name,
    theId: req.params.id,
  });
});

// add pizzas
router.post("/", async (req, res) => {
  if (DEBUG) console.log("menu.POST");
  try {
    await pizzasDal.addPizzas(req.body.name);
    res.redirect("/menu/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("menu.PUT: " + req.params.id);
  try {
    await pizzasDal.putPizzas(req.params.id, req.body.name);
    res.redirect("/menu/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("menu.DELETE: " + req.params.id);
  try {
    await pizzasDal.deletePizza(req.params.id);
    res.redirect("/menu/");
  } catch (err) {
    if (DEBUG) console.error(err);
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
