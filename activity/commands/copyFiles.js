let fs = require("fs");
let path = require("path");

function copyFilesHelper(input , output){
    let data = fs.readFileSync(input , 'utf-8'); //reading input
    fs.writeFileSync(output , data); // writing to this file (overriding possible)
}

module.exports = {
    copyFilesHelper
}