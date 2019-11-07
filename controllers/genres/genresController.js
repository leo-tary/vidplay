const config = require('config');
const Genre = require('../../model/genre/genre');
const genreUtil = require('../../util/utility');
const errLogging = require('../../middleware/logging');

const genreById = (req , res) => {

    let code = req.app.get('code');
    let message = req.app.get('message');
    const genreId = req.params.genreId;
    const genreObj = new Genre(genreId);
    const notFound = config.has('NOT_FOUND') ? config.get('NOT_FOUND') : false;
    
    if(notFound !== false) {
        code = notFound.code;
        message = notFound.message;
        
    }
    const response = {
                code, 
                message 
    }

    genreObj.getGenre((genre) => {
        if(!genre || genre === undefined) {
            if(notFound !== false) {
                return res.send(response);
            }else {
                errLogging.errToFile(response);
                return res.send('Cannot find required genre...');
            }
        }
        const genreData = {
            name: genre.name
        }
        res.send(genreData);
    });
}

const genreList =  (req  ,res) => {
    // const isConfigExists = config.has('database.catalog.pwd');
    try {
        // const dbPwd = config.get('database.catalog.pwd'); 
        // some work   
        Genre.fetchAll((genres) => {
            res.send(genres);
        });

    }catch(err) {
        console.log('Error log goes here...' + err);
        return res.send('Unable to pull genres...');
    }

}


const addGenre = (req , res) => {

    Genre.getGenresSize((genreSize) => {
        // console.log(`Genres Length: ${genreSize}`);
        const genreObj = {
            id: genreSize +1,
            name: req.body.name
        };        
        const { error } = genreUtil.validateSchema(req);
        if(error){
            const errors = genreUtil.returnSchemaErrors(error);
            return res.send(errors);
        }
        const genre = new Genre();
        genre.saveGenre(genreObj);
        res.redirect('/');
    })

}


const updateGenre = (req , res) => {
    const genreId = req.params.genreId;
    const genreName = req.body.name;
    // Check for existence of genreId
    const genreObj = new Genre(genreId);
    genreObj.getGenre((genre) => {
        // console.log(genre);
        if(!genre || genre === undefined) {
            return res.send('Cannot find required genre to update...');
        }

        // validate; if it body params are rightly passed
        
        const { error } = genreUtil.validateSchema(req);
        if(error){
            const errors = genreUtil.returnSchemaErrors(error);
            return res.send(errors);
        }

        // console.log(genre);
        genreObj.updateGenre(genre , genreName , (genres) => {
            // console.log(genres);
            genreObj.writeGenresToFile(genres);
        });        

        res.send(genre);

    });

}

const removeGenre = (req , res) => {

    const genreId = req.params.genreId;
    // const removeGenreMessage = config.get('removeGenre');
    // Find the existence of genreId
    const genreObj = new Genre(genreId);
    genreObj.getGenre((genre) => {
        genreObj.removeGenre((genres) => {
            genreObj.writeGenresToFile(genres)

        });

        res.send(genre);
    });

}


module.exports = {
    genreById , 
    genreList , 
    addGenre , 
    updateGenre , 
    removeGenre 
}