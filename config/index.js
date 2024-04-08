// import dotenv from 'dotenv'
// dotenv.config()

// export const { APP_PORT, DB_URL,  } = process.env;
const dotenv = require('dotenv');
dotenv.config();

const APP_PORT = process.env.APP_PORT;
const DB_URL = process.env.DB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = { APP_PORT, DB_URL,JWT_SECRET };
