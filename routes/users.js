var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const { Op } = require("sequelize");
const Usuario = require('../models').usuario;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
