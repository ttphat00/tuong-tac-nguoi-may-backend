const express = require('express');

const route = require('./routes');

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

//import DB
const db = require('./config/database');
//Connect to db
db.connect();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

//Routes init
route(app);

app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on port ${5000}`);
});
