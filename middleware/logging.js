const fs = require('fs');

const logger = (req , res , next) => {
    console.log(`URL: - ${req.url}`);
    console.log('Request Method: ' + req.method);

    const logOP = {
        time: new Date().toISOString(),
        url: req.url,
        method: req.method
    };

    const stream = fs.createWriteStream("./middleware/request.txt", {flags:'a'});
    stream.write(JSON.stringify(logOP) + ' ,\r\n');
    stream.end();
    next();
}

function errToFile(errObject) {
    
    const timeToLog = new Date().toISOString();
    const errToWriteStream = fs.createWriteStream('./middleware/errLogs.txt' , {flags:'a'});
    errToWriteStream.write(timeToLog + ': ' + JSON.stringify(errObject) + ',\r\n');
    errToWriteStream.end();

}


module.exports = {
    logger , 
    errToFile
}