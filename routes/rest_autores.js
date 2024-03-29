var express = require('express');
var router = express.Router();

const Autor = require('../models').autor;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/findAll/json', function(req, res, next) {  

  /* MÉTODO ESTÁTICO findAll  */

  Autor.findAll({  
      attributes: { exclude: ["updatedAt", "createdAt"] } ,
  })  
  .then(resultado => {  
      res.json(resultado);  
  })  
  .catch(error => res.status(400).send(error)) 

});

router.get('/findById/:id/json', function(req, res, next) {  

  let id = req.params.id;

  Autor.findByPk(id)
    .then(instancia => {
      if(instancia) {
        res.status(200).json(instancia);
      } else {
        res.status(404).json({error: "No existe registro con el identificador "+id})
      }
    })
    .catch(error => res.status(400).send(error))

});




router.post('/save', function(req, res, next) {  

  let { idautor, nombre } = req.body;

  if(idautor != null && nombre != null) {
    Autor.create(req.body)
    .then(instancia => {
      res.status(201).json(instancia);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear el registro' });
    });
  } else {
    res.status(500).json({ error: 'Faltan valores a los atributos idautor o nombre' });
  }

  

});







router.put('/update/:id', function(req, res, next) {  

  let id = req.params.id;

  Autor.findByPk(id)
    .then(instancia => {
      if(instancia) {

        instancia.update(req.body)
          .then(instanciaActualizada => {
            res.status(201).json(instanciaActualizada);
          })
          .catch(error => {
            res.status(500).json({ error: 'Error al actualizar el registro' });
          });

      } else {
        res.status(404).json({error: "No existe registro con el identificador "+id})
      }
    })
    .catch(error => res.status(400).send(error))
  
});









router.delete('/delete/:id', function(req, res, next) {  

      let id = req.params.id;

      Autor.findByPk(id)
        .then(instancia => {
          if(instancia) {

            instancia.destroy()
              .then(() => {
                res.status(204).json({ mensaje: 'Registro eliminado'});
              })
              .catch(error => {
                res.status(500).json({ error: 'Error al actualizar el registro' });
              });

          } else {
            res.status(404).json({error: "No existe registro con el identificador "+id})
          }
        })
        .catch(error => res.status(400).send(error))
      
    });

module.exports = router;
