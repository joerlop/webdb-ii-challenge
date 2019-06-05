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
  db("zoos").insert(req.body, "id")
  .then(ids => {
    db("zoos")
    .where({id: ids[0]})
    .first()
    .then(zoo => {
      res.status(201).json(zoo)
    })
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.get('/', (req, res) => {
  db("zoos")
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  db("zoos")
  .where({id: req.params.id})
  .first()
  .then(zoo => {
    if (zoo) res.status(200).json(zoo)
    else zoo.status(404).json("Record not found")
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  db("zoos")
  .where({id: req.params.id})
  .update(changes)
  .then(count => {
    if (count > 0) {
      db("zoos")
      .where({id: req.params.id})
      .first()
      .then(zoo => {
        res.status(200).json(zoo)
      }) 
    } else {
      res.status(404).json("Zoo not found")
    }
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  db("zoos")
  .where({id: req.params.id})
  .del()
  .then(count => {
    if (count > 0) res.status(204).end()
    else zoo.status(404).json("Zoo not found")
  }).catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;
