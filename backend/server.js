const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/fitschedDB", { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const entryRouter = require('./routes/entries');

app.use('/users', usersRouter);
app.use('/cards', cardRouter);
app.use('/entries', entryRouter);

app.listen(port, function () {
    console.log("Server is running on Port:" + port);
});