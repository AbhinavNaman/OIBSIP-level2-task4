//blogPosts.js
import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: String,
    tagline: String,
    about: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    selectedVideoFile:String,
    selectedFile:String,
    user: String
})

var blogPosts = mongoose.model('blogPosts', blogSchema);

export default blogPosts;

