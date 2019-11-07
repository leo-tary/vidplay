const path = require('path');

const Genre = require('../../model/genre/genre');

const genreList = (req , res) => {
    const viewLoader = req.app.get('viewLoader');
    Genre.fetchAll((genres) => {
        // res.sendFile(path.join(viewLoader , 'genre-listing.html'));
        res.render('genre-listing' , {
            docTitle: 'Vidplay Genres' , 
            genListText: 'Genre Listing...' ,
            noGenre: 'No Genre Found' ,
            vidGenres: genres , 
            path: '/genres/list-genre'
        })
    });

}

const genreAdd = (req , res) => {
    const viewLoader = req.app.get('viewLoader');
    // res.sendFile(path.join(viewLoader , 'add-genre.html'));
    res.render('add-genre' , {
        docTitle: 'Add vidplay Genre' , 
        path: '/genres/add-genre'
    });
    
}

module.exports = {
    genreList: genreList , 
    genreAdd
}