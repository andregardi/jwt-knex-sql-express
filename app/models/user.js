"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already in use!"
        },
        validate: {
          len: {
            args: 3,
            msg: "userName must be atleast 3 characters in length"
          },
        }
      },
      password: DataTypes.STRING,
      fulllName: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
