const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('game', 'root', 'Kermit123', {
  host: 'localhost',
  dialect: 'mysql'
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();

module.exports = sequelize;