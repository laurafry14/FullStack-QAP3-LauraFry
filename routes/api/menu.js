var router = require("express").Router();
const pizzasDal = require("../../services/pg.menu.dal");

// api/actors
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/menu/ GET " + req.url);
  try {
    let theMenu = await pizzasDal.getPizzas();
    res.json(theMenu);
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// api/menu/:id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/menu/:id GET " + req.url);
  try {
    let anPizza = await pizzasDal.getPizzaByPizzaId(req.params.id);
    if (anPizza.length === 0) {
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else res.json(anPizza);
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/menu/ POST");
  }
  try {
    await pizzasDal.addPizza(req.body.name);
    res.statusCode = 201;
    res.json({ message: "Created", status: 201 });
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/menu PUT " + req.params.id);
  try {
    await pizzasDal.putPizza(req.params.id, req.body.name);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/menu PATCH " + req.params.id);
  try {
    await pizzasDal.patchPizza(req.params.id, req.body.name);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/menu DELETE " + req.params.id);
  try {
    await pizzasDal.deletePizza(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

module.exports = router;
