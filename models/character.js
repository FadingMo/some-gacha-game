const sequelize = require("../DB")
const { DataTypes } = require("sequelize") 

const Character = sequelize.define("Character", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rarity: {
        type: DataTypes.ENUM(['Rare','Legendary','Uncommon']),
        allowNull: false,
    },
    element: {
        type: DataTypes.ENUM(['Fire','Water','Earth','Air','Soul','Dark']),
        allowNull: false,
    },
    weapon_type: {
        type: DataTypes.ENUM(['One-handed sword','Two-handed sword','Bow','Staff']),
        allowNull: false,
    },
    base_hp: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 1 },
    },
    base_attack: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 1 },
    },
    base_defense: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 1 },
    },
    elemental_power: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hp_scaling: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    attack_scaling: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    defense_scaling: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
},
    {
    tableName: "characters",
    underscored: true,
    timestamps: true,
});

module.exports = Character