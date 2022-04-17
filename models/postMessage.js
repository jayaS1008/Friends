import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name:String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;