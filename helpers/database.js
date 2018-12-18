//When not using Sequelize
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node_complete',
//   password: ''
// });

// module.exports = pool.promise();

//When using Sequelize
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('node_complete', 'root', '', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

//When using MongoDB
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://dchung:U8yPmcj9MBfCUZQ@cluster0-viq0l.mongodb.net/test?retryWrites=true')
  .then(client => {
    console.log('Connected!')
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err)
    throw err;
  })
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;