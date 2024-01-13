require('dotenv').config();
const express = require('express');
const app = express();
const dbConfig = require('./config/dbConfig');

const port = 5000;


app.listen(port, () => console.log(`Invoice app server running at port ${port}`));
