import mongoose from "mongoose";


const shortUrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        index: true // Create index for faster lookup
    },
    clicks: {
        type: Number,
        default: 0,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ShortUrl =  mongoose.model('ShortUrl', shortUrlSchema); // we have to import like this: import ShortUrl from './ShortUrl';
// if we do module.exports then we can just import it directly from the file like this: const ShortUrl = require('./ShortUrl');

export default ShortUrl;