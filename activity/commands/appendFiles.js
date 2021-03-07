let fs = require("fs");
let path = require("path");

function appendFilesHelper(input , output){
    // Reading Content from Input File
    let content = fs.readFileSync(input , 'utf-8');
    // Appending the Content to the output file
    fs.appendFileSync(output , content);
}

module.exports = {
    appendFilesHelper
}