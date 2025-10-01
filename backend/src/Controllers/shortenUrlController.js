import ShortUrl from '../Model/shortUrlSchema.js';
import { saveShortUrl } from '../Services/saveShortUrl.service.js';

// use const export because we can't have more than one default export in a module
// export const createShortUrlWithoutUser = async (req, res, next) => {
    
//     const shortUrl = await saveShortUrl(req.body.url);
//     res.send(shortUrl);
// };

export const createShortUrlWithUser = async (req, res, next) => {
  try {
    const { url, customUrl } = req.body;

    // 1. Check for existing URL for the same user
    const exists = await ShortUrl.findOne({
      originalUrl: url,
      userId: req.user?._id || null,
    });

    if (exists) {
      return res.status(400).json({ message: "URL already exists" });
    }

    // 2. Check for custom short URL conflict
    if (req.user && customUrl) {
      const existingUrl = await ShortUrl.findOne({ shortUrl: customUrl });
      if (existingUrl) {
        return res.status(400).json({ message: "Custom URL already exists" });
      }
    }
    // 3. Save new short URL
    const shortUrl = await saveShortUrl(
      url,
      req.user?._id || null,
      customUrl || null
    );
    return res.status(201).json({
      message: "Short URL created",
      shortUrl,
    });

  } catch (err) {
    next(err); // Pass to your error handler
  }
};



export const redirectFromShortUrl = async(req, res) => {
    const shortUrl = req.params.id;
    const url = await ShortUrl.findOneAndUpdate({shortUrl: shortUrl}, {$inc: {clicks: 1}});
    
    if(url) {
        res.redirect(url.originalUrl);
    }
    else {
        res.status(404).send("Short URL not found");
    }
}

export const getAllUrls = async(req, res) => {
    const urls = await ShortUrl.find({userId: req.user._id});
    res.json(urls);
}