let fs = require("fs");
let path = require("path");

function readFilesHelper(input){
    let content = fs.readFileSync(input , 'utf-8'); //reading from input path
    return content;
}

module.exports = {
    readFilesHelper
}