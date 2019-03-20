const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Pop' },
    { id: 3, name: 'Reggae' },
];

router.get('/', (req, res) => {
    res.send(genres);
});
router.get('/:id', (req, res) => {
    //look up for the course
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    //if not finding, return 404
    if (!genre) return res.status(404).send("Genre not found");

    //return course
    res.send(genre);
});
router.post('/', (req, res) => {

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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;