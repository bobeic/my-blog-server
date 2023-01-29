const { MongoClient } = require("mongodb");
require("dotenv").config();


let dbConnection;

const URL = process.env.URL

module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect(URL)
      .then((client) => {
        dbConnection = client.db();
        return callback();
      })
      .catch((err) => {
        console.log(err);
        return callback(err);
      });
  },
  getDb: () => dbConnection,
};
