const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const suggestionRoutes = require('./routes/suggestionRoutes');

const port = process.env.PORT || 3000;





mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(`MongoDB Error: ${err}`));





//logging middleware
app.use(morgan('dev'));

//middleware for POST request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//useroutes middleware
app.use('/api/v1/users', suggestionRoutes);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
