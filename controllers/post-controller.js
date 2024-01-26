import { Post } from '../models/post.js';
import { year } from '../utils/date.js';

export const getPosts = (req, res) => {
  Post.find({}, { title: 1, text: 1, author: 1, createdAt: 1, _id: 1 })
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render('posts', {
        title: 'Posts',
        year,
        posts: posts.map((post) => post.toJSON()),
      });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.render('post', {
      title: 'Post',
      year,
      post: post.toJSON(),
    });
  });
};

export const addPost = (req, res) => {
  const { title, text, author } = req.body;
  const post = new Post({ title, text, author });
  post.save().then(() => res.redirect('/posts'));
};

export const getAddPost = (req, res) => {
  res.render('postAdd', {
    title: 'Add post',
    year,
  });
};

export const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id).then(() => res.sendStatus(200));
};

export const getEditPost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.render('postEdit', {
      title: 'Edit post',
      year,
      post: post.toJSON(),
    });
  });
};

export const editPost = (req, res) => {
  const { title, text, author } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, text, author }).then((result) => {
    res.redirect(`/posts/${id}`);
  });
};
