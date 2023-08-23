var DataTypes = require("sequelize").DataTypes;
var _autor = require("./autor");
var _autor_libro = require("./autor_libro");
var _libro = require("./libro");
var _sequelizemeta = require("./sequelizemeta");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var autor = _autor(sequelize, DataTypes);
  var autor_libro = _autor_libro(sequelize, DataTypes);
  var libro = _libro(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  autor.belongsToMany(libro, { as: 'libro_idlibro_libros', through: autor_libro, foreignKey: "autor_idautor", otherKey: "libro_idlibro" });
  libro.belongsToMany(autor, { as: 'autor_idautor_autors', through: autor_libro, foreignKey: "libro_idlibro", otherKey: "autor_idautor" });
  autor_libro.belongsTo(autor, { as: "autor_idautor_autor", foreignKey: "autor_idautor"});
  autor.hasMany(autor_libro, { as: "autor_libros", foreignKey: "autor_idautor"});
  autor_libro.belongsTo(libro, { as: "libro_idlibro_libro", foreignKey: "libro_idlibro"});
  libro.hasMany(autor_libro, { as: "autor_libros", foreignKey: "libro_idlibro"});

  return {
    autor,
    autor_libro,
    libro,
    sequelizemeta,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
