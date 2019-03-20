const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const genres = require('./routes/genres');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/api/genres', genres);

app.use(logger);



app.get('/', (req, res) => {
    res.send('Hello World!')
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`istening to port ${port}...`));