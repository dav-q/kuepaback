const express = require('express');
const router = express.Router();

const ApiKuepa = require('./API/Kuepa/index')

router.use('/v1',ApiKuepa) 

module.exports = router;
