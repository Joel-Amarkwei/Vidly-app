
const mongoose = require('mongoose')
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/genres')
.then(() => console.log('Connected to Database Successfully'))
.catch((err) => console.log('Could not connect to Database', err.message))


app.use(express.json());
//app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
