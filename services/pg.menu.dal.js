const dal = require("./pizzaria_db");

// get all pizzas
var getPizzas = function () {
  if (DEBUG) console.log("menu.pg.dal.getPizzas()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT pizza_id AS _id, name FROM pizzas \
        ORDER BY pizza_id;";
    dal.query(sql, [], (err, result) => {
      if (err) {
        // if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var getDescriptions = function () {
  if (DEBUG) console.log("menu.pg.dal.getDescriptions()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT pizza_id AS _id, description FROM pizzas \
        ORDER BY pizza_id;";
    dal.query(sql, [], (err, result) => {
      if (err) {
        // if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var getPizzaByPizzaId = function (id) {
  if (DEBUG) console.log("menu.pg.dal.getPizzaByPizzaId()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT pizza_id AS _id, name FROM pizzas WHERE pizza_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var addPizzas = function (name) {
  if (DEBUG) console.log("menu.pg.dal.addPizza()");
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO public.pizzas(name) \
        VALUES ($1);";
    dal.query(sql, [name], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var putPizzas = function (id, name) {
  if (DEBUG) console.log("menu.pg.dal.putPizzas()");
  return new Promise(function (resolve, reject) {
    const sql = "UPDATE public.pizzas SET name=$2 WHERE pizza_id=$1;";
    dal.query(sql, [id, name], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var patchPizza = function (id, name) {
  if (DEBUG) console.log("menu.pg.dal.patchActor()");
  return new Promise(function (resolve, reject) {
    const sql = "UPDATE public.pizzas SET name=$2 WHERE pizza_id=$1;";
    dal.query(sql, [id, name], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var deletePizza = function (id) {
  if (DEBUG) console.log("menu.pg.dal.deletePizza()");
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM public.pizzas WHERE pizza_id = $1;";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getPizzas,
  getDescriptions,
  getPizzaByPizzaId,
  addPizzas,
  putPizzas,
  patchPizza,
  deletePizza,
};
