const express = require("express");
const router = express.Router();
const ingredientsDal = require("../services/pg.ingredients.dal");

// get all ingredients
router.get("/", async (req, res) => {
  try {
    let theIngredients = await ingredientsDal.getIngredients();
    if (DEBUG) console.table(theIngredients);
    res.render("ingredients", { theIngredients });
  } catch {
    res.render("503");
  }
});

module.exports = router;
