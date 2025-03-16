const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

//********middleware*******
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

//********routes**********


module.exports = app;