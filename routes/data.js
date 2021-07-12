const express = require('express');
const router = express.Router();
const { time, status, to, from, headers } = require('../controllers/data');

// GET the time, http status, the location, headers
router.get('/', time, status, to, from, headers);

module.exports = router;
