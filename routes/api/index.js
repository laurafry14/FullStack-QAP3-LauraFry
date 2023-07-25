var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/menu");
}
// http://localhost:3000/api/actors/
const menuRouter = require("./menu");
router.use("/menu", menuRouter);

module.exports = router;
