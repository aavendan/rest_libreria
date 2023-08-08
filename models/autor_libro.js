const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('autor_libro', {
    autor_idautor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'autor',
        key: 'idautor'
      }
    },
    libro_idlibro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'libro',
        key: 'idlibro'
      }
    }
  }, {
    sequelize,
    tableName: 'autor_libro',
    timestamps: false,
    indexes: [
      {
        name: "fk_autor_libro_autor_idx",
        using: "BTREE",
        fields: [
          { name: "autor_idautor" },
        ]
      },
      {
        name: "fk_autor_libro_libro1_idx",
        using: "BTREE",
        fields: [
          { name: "libro_idlibro" },
        ]
      },
    ]
  });
};
