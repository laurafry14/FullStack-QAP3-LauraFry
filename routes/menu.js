const express = require("express");
const router = express.Router();
const pizzasDal = require("../services/pg.menu.dal");

// get all pizzas
router.get("/", async (req, res) => {
  try {
    let theMenu = await pizzasDal.getPizzas();
    let theDescriptions = await pizzasDal.getDescriptions();
    if (DEBUG) console.table(theMenu);
    res.render("menu", { theMenu, theDescriptions });
  } catch {
    res.render("503");
  }
});

// get all descriptions
// router.get("/", async (req, res) => {
//   try {
//     let theDescriptions = await pizzasDal.getDescriptions();
//     if (DEBUG) console.table(theDescriptions);
//     res.render("menu", { theDescriptions });
//   } catch {
//     res.render("503");
//   }
// });

// get pizza by ID
router.get("/:id", async (req, res) => {
  try {
    let anPizza = await pizzasDal.getPizzaByPizzaId(req.params.id);
    if (anPizza.length === 0) res.render("norecord");
    else res.render("pizza", { anPizza });
  } catch {
    res.render("503");
  }
});

// get updated pizza
router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("pizza.Replace : " + req.params.id);
  res.render("pizzaPut.ejs", {
    name: req.query.name,
    theId: req.params.id,
  });
});

// get edited pizza
router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("menu.Edit : " + req.params.id);
  res.render("pizzaPatch.ejs", {
    name: req.query.name,
    theId: req.params.id,
  });
});

// get deleted pizza
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
    res.render("503");
  }
});

// update pizza
router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("menu.PUT: " + req.params.id);
  try {
    await pizzasDal.putPizzas(req.params.id, req.body.name);
    res.redirect("/menu/");
  } catch {
    res.render("503");
  }
});

// edit pizza
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("menu.PATCH: " + req.params.id);
  try {
    await pizzasDal.patchPizza(req.params.id, req.body.name);
    res.redirect("/menu/");
  } catch {
    res.render("503");
  }
});

// delete pizzas
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("menu.DELETE: " + req.params.id);
  try {
    await pizzasDal.deletePizza(req.params.id);
    res.redirect("/menu/");
  } catch (err) {
    if (DEBUG) console.error(err);
    res.render("503");
  }
});

module.exports = router;
