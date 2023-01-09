const { config } = require('dotenv')
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

module.exports = { DATABASE_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, IMAGEKIT_PUBLIC, IMAGEKIT_PRIVATE, RAILWAY_TOKEN } = process.env;
