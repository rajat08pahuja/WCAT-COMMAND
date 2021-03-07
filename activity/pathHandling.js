let fs = require("fs");
let path = require("path");

function pathHandler(input){
    //input can be complete file path or simply file name
    if(input == path.basename(input)){ // in case of file name we consider current working directory
        input = path.join(process.cwd() , input);
    }

    if(fs.existsSync(input) == true){ // checking if file exists or not
        return input;
    } else{
        return -1;
    }
}

module.exports = {
    pathHandler
}