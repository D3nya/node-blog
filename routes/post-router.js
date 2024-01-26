import express from 'express';
import {
  getPosts,
  getPost,
  deletePost,
  addPost,
  getAddPost,
  editPost,
  getEditPost,
} from '../controllers/post-controller.js';

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/add', getAddPost);
router.get('/posts/edit/:id', getEditPost);
router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.post('/posts', addPost);
router.put('/posts/:id', editPost);

export default router;
