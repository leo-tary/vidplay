
const Genre = require('../../model/genre/genre');

const homeHeader = (req , res) => {
    Genre.fetchAll((genres) => {
        res.render('home' , {
            homePageHeader: 'Vidplay Home Page',
            docTitle: 'Vidplay Home' ,
            vidGenres: genres , 
            path: '/'
        });

    });
    // res.send('<h1>Vid Play Home Page</h1>');
    // res.sendFile(path.join(__dirname , '../' , 'views' , 'home.html'));

}

module.exports = homeHeader;