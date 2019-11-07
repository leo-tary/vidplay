const Joi = require('@hapi/joi');
const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename) , 'storage'  , 'genres.json');

function isGenreExists(genres , genreId) {

    return genre = genres.find((gen) => {
        return gen.id === parseInt(genreId);
    })

}

function validateSchema(request) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return validated = Joi.validate(request.body , schema , {abortEarly:false});
}


function returnSchemaErrors(error) {

    const err = error.details;
    const errors = [];
    err.forEach(validationError => {
        errors.push(validationError.message);
    });

    return errors;

}

function readStorage(callback) {
    fs.readFile(p , (err , fileContents) => {
        if(err) {
            callback([]);
        }else{
            callback(JSON.parse(fileContents));
        }
    })
}

module.exports = {
    isGenreExists , 
    validateSchema , 
    returnSchemaErrors , 
    readStorage , 
    p
}