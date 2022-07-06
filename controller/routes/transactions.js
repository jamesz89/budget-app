const { Router } = require('express');
const db = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  await db.query('SELECT * FROM transactions ORDER BY id ASC', [], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

module.exports = router;
