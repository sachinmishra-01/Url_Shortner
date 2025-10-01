import ShortUrl from '../Model/shortUrlSchema.js';
import { nanoid } from 'nanoid';
import { ConflictError } from '../Utils/errorHandler.js';
import { generateShortUrl } from '../Utils/generateShortUrl.js';

export const saveShortUrl = async (longUrl, userId, customUrl = null) => {
    try {
        let shortUrl;
        if (customUrl) {
            shortUrl = customUrl;
        } else {
            let exists = true;
            while (exists) {
                shortUrl = generateShortUrl();
                exists = await ShortUrl.findOne({ shortUrl });
            }
        }
        let originalUrl = longUrl;

        // This is a regEx expression which Ensure the longUrl starts with http:// or https:// if not then it adds that
        if (!/^https?:\/\//i.test(originalUrl)) {
            originalUrl = 'https://' + originalUrl;
        }


        const newUrl = new ShortUrl({
            originalUrl: originalUrl,
            shortUrl: shortUrl
        })
        if (userId) {
            newUrl.userId = userId;
        }
        await newUrl.save();
        return shortUrl
    } catch (err) {
        if (err.code == 11000) throw new ConflictError(err);
        throw new Error(err);
    }
}