var express = require('express');
var router = express.Router();

const { Op } = require("sequelize");

const Libro = require('../models').libro;
const AutorLibro = require('../models').autor_libro;


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/findAll/json', function (req, res, next) {
  
  /* VERIFICADOR DE AUTORIZACIÓN */

  // const { rol } = req.user;

  // if (rol !== 'admin') {
  //     return res.sendStatus(403);
  // }

  
  /* MÉTODO ESTÁTICO findAll  */

  Libro.findAll({
    attributes: { exclude: ["updatedAt", "createdAt"] },
  })
    .then(resultado => {
      res.json(resultado);
    })
    .catch(error => res.status(400).send(error))

});

router.get('/findBookByAuthor/:id/json', function (req, res, next) {

  let id = parseInt(req.params.id);

  AutorLibro.findAll({
    attributes: { exclude: ["id", "updatedAt", "createdAt"] },
    where: {
      autor_idautor: id
    }
  })
    .then(resultado => {

      let keys = resultado.map(element => element.libro_idlibro );

      Libro.findAll({
        attributes: { exclude: ["updatedAt", "createdAt"] },
        where: {
          idlibro: {
            [Op.or]: keys
          }
        }
      })
        .then(resultado => {
          res.json(resultado);
        })
        .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))

});

module.exports = router;
