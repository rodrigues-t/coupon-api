require('dotenv/config');
const mongoose = require('mongoose');

var mongoDB = process.env.DB_URL
.replace('$user$', process.env.DB_USER)
.replace('$password$', process.env.DB_PASSWORD)
.replace('$database$', process.env.DB_NAME);

mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });