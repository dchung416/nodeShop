// const Sequelize = require('sequelize');

// const sequelize = require('../helpers/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

// module.exports = User;

//For mongo
const mongodb = require('mongodb');
const getDb = require('../helpers/database').getDb;

const ObjectId = mongodb.ObjectID;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId)})
  }
}

module.exports = User;