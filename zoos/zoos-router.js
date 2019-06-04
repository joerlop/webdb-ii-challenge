const knex = require("knex");

const router = require('express').Router();

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true,
  debug: true
}

const db = knex(knexConfig);

router.post('/', (req, res) => {
  db("zoos").insert(req.body, "id").then(ids => {
    res.status(201).json(ids)
  }).catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;
