const path = require('path');

const notfound = (req , res , next) => {
    const viewLoader = req.app.get('viewLoader');
    res.status(404).sendFile(path.join(viewLoader , 'not-found.html'));
}

module.exports = notfound;