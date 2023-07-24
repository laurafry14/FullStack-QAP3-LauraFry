const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const theMenu = [
    { name: "Pepperoni" },
    { name: "Cheese" },
    { name: "The Works" },
  ];
  try {
    // let theActors = await actorsDal.getActors();
    // if (DEBUG) console.table(theActors);
    res.render("menu", { theMenu });
  } catch {
    res.render("503");
  }
});

module.exports = router;
