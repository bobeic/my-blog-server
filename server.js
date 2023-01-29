const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db.js");
const { ObjectID, ObjectId } = require("bson");
// const fs = require("fs");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let db;
connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    });
    db = getDb();
  }
});

// routes
app.get("/posts", (req, res) => {
  let posts = [];
  db.collection("posts")
    .find()
    .forEach((post) => posts.push(post))
    .then(() => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/posts/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("posts")
      .findOne({ _id: ObjectID(req.params.id) })
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch doc" });
      });
  } else {
    res.status(500).json({ error: "invalid doc id" });
  }
});

app.post("/posts", (req, res) => {
  let post = req.body;
  db.collection("posts")
    .insertOne(post)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.delete("/posts/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("posts")
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete doc" });
      });
  } else {
    res.status(500).json({ error: "invalid doc id" });
  }
});

app.patch("/posts/:id", (req, res) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("posts")
      .updateOne({ _id: ObjectID(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete doc" });
      });
  } else {
    res.status(500).json({ error: "invalid doc id" });
  }
});

// app.get('/api/posts/', (req, res) => {
//     fs.readFile('./data/posts.json', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         const posts = JSON.parse(data);
//         res.status(200).send(posts)
//     })
// })

// app.get('/api/posts/:id', (req, res) => {
//     fs.readFile('./data/posts.json', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         const posts = JSON.parse(data);
//         const post = posts.find((p) => p.id === req.params.id);
//         res.status(200).send(post)
//     })
// })

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
