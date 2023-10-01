// server>routes>jobs.js
import express from 'express';

import { fetchBlogs, createBlog, fetchBlogsBySearch, fetchBlog, deleteJob } from '../controllers/jobs.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', fetchBlogs);
router.post('/', auth, createBlog);
router.get('/search', fetchBlogsBySearch);
router.get('/:id', fetchBlog); 
router.delete('/:id',auth, deleteJob); 

export default router;
