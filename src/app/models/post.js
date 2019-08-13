const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    size: {
        type: Number,
        required: true,
        trim: true,
    }, 
    key: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps : true });

module.exports =  mongoose.model("Post", PostSchema);