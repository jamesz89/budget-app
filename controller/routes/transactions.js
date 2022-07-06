const { Router } = require('express');
const db = require('../../db');

const router = Router();

router.get('/', async (req, res) => {
  await db.query('SELECT * FROM transactions ORDER BY id ASC', [], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

router.post('/', async (req, res) => {
  const {
    concept,
    amount,
    date,
    categoryId,
  } = req.body;

  await db.query(
    'INSERT INTO transactions (concept, amount, date, category_id) VALUES ($1, $2, $3, $4) RETURNING id, concept, amount, date, category_id',
    [concept, amount, date, categoryId],
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows[0]);
    },
  );
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM transactions WHERE id = $1',
    [id],
    (err) => {
      if (err) throw err;
      res.status(204).send({
        message: 'Transaction deleted',
      });
    },
  );
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    concept,
    amount,
    date,
    categoryId,
  } = req.body;

  db.query(
    'UPDATE transactions SET concept = $1, amount = $2, date = $3, category_id = $4 WHERE id = $5 RETURNING id, concept, amount, date, category_id',
    [concept, amount, date, categoryId, id],
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows[0]);
    },
  );
});

module.exports = router;
