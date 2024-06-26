const sequelize = require('../DB');

const User = require('./user');
const Character = require('./character');
const UserCharacter = require('./userCharacter')

User.hasMany(Character);
Character.belongsTo(User);

User.belongsToMany(Character, { through: UserCharacter });
Character.belongsToMany(User, { through: UserCharacter });

module.exports = { User, Character, UserCharacter };