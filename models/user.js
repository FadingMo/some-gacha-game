const { underscored } = require("sequelize/lib/utils");
const sequelize = require("../DB")
const { DataTypes } = require("sequelize") 

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pullCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },   
}, {
    tableName: "users",
    underscored: true,
    timestamps: true,
});

module.exports = User