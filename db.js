// const { MongoClient } = require("mongodb");
// require("dotenv").config();


// let dbConnection;

// const MONGO_URI = process.env.MONGO_URI

// module.exports = {
//   connectToDb: (callback) => {
//     MongoClient.connect(URL)
//       .then((client) => {
//         dbConnection = client.db();
//         return callback();
//       })
//       .catch((err) => {
//         console.log(err);
//         return callback(err);
//       });
//   },
//   getDb: () => dbConnection,
// };
