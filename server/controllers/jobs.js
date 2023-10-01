//server>controller>jobs.js
import express from 'express';
import mongoose from 'mongoose';

import blogPosts from '../models/blogPosts.js';

const router = express.Router();

export const fetchBlogs = async (req, res) => { 
    try {
        const allJobPosts = await blogPosts.find();
        // console.log(allJobPosts);
                
        res.status(200).json(allJobPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createBlog = async (req, res) => {
    const job = req.body;

    const newJobPost = new blogPosts({ ...job, createdAt: new Date().toISOString() })

    try {
        await newJobPost.save();

        res.status(201).json(newJobPost );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const fetchBlog = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await blogPosts.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await blogPosts.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const fetchBlogsBySearch = async (req, res) => {
    const searchQuery = req.query.searchQuery; 
    try {
        const Job = await blogPosts.find({ title: searchQuery });

        res.status(200).json(Job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



export default router;