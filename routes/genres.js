const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genres/genresController');
const genreViewController = require('../controllers/genres/genreViewController');

// HTML routes

router.get('/list-genre' , genreViewController.genreList);
router.get('/add-genre' , genreViewController.genreAdd);

// API routes

router.get('/list' , genreController.genreList)
router.get('/list/:genreId' , genreController.genreById);
router.post('/add' , genreController.addGenre);
router.put('/update/:genreId' , genreController.updateGenre);
router.delete('/remove/:genreId' , genreController.removeGenre)

module.exports = router;