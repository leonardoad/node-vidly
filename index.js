const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.use(logger);

const genres = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Pop' },
    { id: 3, name: 'Reggae' },
];

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});
app.get('/api/genres/:id', (req, res) => {
    //look up for the course
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    //if not finding, return 404
    if (!genre) return res.status(404).send("Genre not found");

    //return course
    res.send(genre);
});
app.post('/api/genres', (req, res) => {

    //verify posted obj
    const { error } = verifyGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    }

    //add genre to list
    genres.push(genre);

    //return course
    res.send(genre);
});
app.put('/api/genres/:id', (req, res) => {
    //look up for the course
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    //if not finding, return 404
    if (!genre) return res.status(404).send("Genre not found");

    //verify posted obj
    const { error } = verifyGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    //return genre
    res.send(genre);
});
app.delete('/api/genres/:id', (req, res) => {
    //look up for the course
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    //if not finding, return 404
    if (!genre) return res.status(404).send("Genre not found");


    const index = genres.indexOf(genre);

    genres.splice(index, 1);
    //return genre
    res.send(genre);
});

function verifyGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required(),
    }

    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`istening to port ${port}...`));