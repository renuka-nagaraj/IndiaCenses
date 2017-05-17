module.exports = function () {
    var fs = require("fs");
    var writeStream = fs.createWriteStream('final.csv', {
        'flags': 'a'
    });
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('data/csv/India2011.csv')
    });
    lineReader.on('line', function (line) //reads line by line
        {
            writeStream.write(line + "\n"); //write line to the file
        });
    var lineReader1 = require('readline').createInterface({
        input: require('fs').createReadStream('data/csv/IndiaSC2011.csv')
    });
    lineReader1.on('line', function (line) //reads line by line
        {
            writeStream.write(line + "\n"); //write line to the file
        });
    var lineReader2 = require('readline').createInterface({
        input: require('fs').createReadStream('data/csv/IndiaST2011.csv')
    }); 
    lineReader2.on('line', function (line) //reads line by line
        {
            writeStream.write(line + "\n"); //write line to the file
        });
}