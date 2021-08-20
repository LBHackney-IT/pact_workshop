const express = require("express");
const Post = require("../database/schemas/post");
const router = express.Router();

router.get("/books", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/books", async (req, res) => {
  try {
    const post = new Post({
    title: req.body.title,
    author: req.body.author
  });
    await post.save();
    res.status(201).send(post); 
  } catch {
    res.status(400);
    res.send({ error: "400 Bad Request"})
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Book doesn't exist!" });
  }
});

router.patch("/books/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Book doesn't exist!" });
  }
});

router.delete("/book/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Book doesn't exist!" });
  }
});

module.exports = router;