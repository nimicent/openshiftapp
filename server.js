const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();


// routes
const dataRoutes = require('./routes/data');

const app = express();


// IBM Cloud DB for MongoDB setup -
let ca = Buffer.from(process.env.CERTIFICATE_BASE64, "base64");

let mongoDbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  ssl: true,
  sslValidate: true,
  useUnifiedTopology: true,
  sslCA: ca
};

let mongoDB = process.env.MONGO_URL
mongoose.connect(mongoDB, mongoDbOptions);

mongoose.Promise = global.Promise;
let db = mongoose.connection;
//- end of setup

//check health
db.once('open', function(){
  console.log('connected to MongoDB 🦦');
});

// middlewarez
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
//point to routes
app.use('/api', dataRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
