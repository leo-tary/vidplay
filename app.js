const config = require('config');
const path = require('path');
const express = require('express');
const pug = require('pug');
const app = express();      // Invoking express application
const port = process.env.PORT || 5432;
const viewLoader = path.join(__dirname , 'views');


const home = require('./routes/home');
const genres = require('./routes/genres');
const logger = require('./middleware/logging');
const notfound = require('./middleware/notfound');
const code = config.get('DEFAULT.code');
const message = config.get('DEFAULT.message');        


app.set('view engine' , 'pug');  // Registering Templating Engine
app.set('views' , 'views');     // Where to find views (default is 'views' folder)
app.set('viewLoader' , viewLoader);
app.set('code' , code);
app.set('message' , message);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));  // Serving static files

// Custom Middleware
app.use(logger.logger);
app.use('/' , home);
app.use('/genres' , genres);   
app.use(notfound);

app.listen(port , () => {
    console.log(`Listening on port ${port}...`);
})