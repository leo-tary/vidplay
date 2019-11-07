const fs = require('fs');
const path = require('path');
const genreUtil = require('../../util/utility');

class Genre {

    constructor(genreId = null) {
        this.genreId = genreId;
        // console.log(`In Const.. ${this.genreId}`);
    }

    static getGenresSize(genreLength) {
        genreUtil.readStorage((genres) => {
            genreLength(genres.length);
        })
    }

    static fetchAll (genres) {
        genreUtil.readStorage((fileContents) => {
            if(!fileContents) {
                return genres([]); 
            }
            genres(fileContents);
        })

    }

    getGenre(genreInfo) {
        // Get Genre List
        genreUtil.readStorage((genres) => {
            const genreData = genreUtil.isGenreExists(genres , this.genreId);
            genreInfo(genreData);
        })
    }


    saveGenre(genreObj) {
        // Add validation Here...
        // Saving to file (instead of array in memory)
        genreUtil.readStorage((allGenres) => {
            allGenres.push(genreObj);
            fs.writeFile(genreUtil.p , JSON.stringify(allGenres) , (err) => {
                    console.log(err);
            })
        })
    }

    removeGenre(filteredGenres) {

        genreUtil.readStorage((genres) => {
            // console.log(genres);
            const genreIndex = genres.findIndex((gen) => {
                return gen.id === parseInt(this.genreId);
            });
            // console.log(genreIndex);
            genres.splice(genreIndex , 1);
            filteredGenres(genres);
        })
     }

 
     updateGenre(genre , genreName , callback) {
        genreUtil.readStorage((allGenres) => {
            const genreIndex = allGenres.findIndex((gen) => {
                return gen.name === genre.name;
            });
            if(genreIndex === -1) {
                genres.push(genre);
            }else{
                // console.log(this.genre);
                genre.name = genreName;
                allGenres[genreIndex] = genre;
                // console.log(allGenres);
                callback(allGenres);
            }
        })
    }

    writeGenresToFile(allGenre) {
        fs.writeFile(genreUtil.p , JSON.stringify(allGenre) , (err) => {
            console.log(err);
        })
    }
}


module.exports = Genre