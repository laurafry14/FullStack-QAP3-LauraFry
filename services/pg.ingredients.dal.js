const dal = require("./pizzaria_db");

// get all ingredients
var getIngredients = function () {
  if (DEBUG) console.log("ingredients.pg.dal.getIngredients()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT ingredient_id AS _id, name FROM ingredients \
        ORDER BY ingredient_id;";
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

module.exports = {
  getIngredients,
};
