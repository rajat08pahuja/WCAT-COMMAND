let fs = require("fs");
let path = require("path");

function n_commandHelper(input){
    let content = fs.readFileSync(input , 'utf-8');
    let updatedContent = addNumbers(content , 1); //updating data so that it gets a number before every line
    return updatedContent;
}

// recursive fun
function addNumbers(content , num){
    if(content.indexOf('\n') == -1){
        return ("" + num + content);
    }

    let firstIdx = content.indexOf('\n'); //can also take '\r\n'
    let faith = addNumbers(content.substring(firstIdx + 1) , num + 1);
    let ans = "" + num + content.substring(0 , firstIdx + 1) + faith;
    return ans;
}

module.exports = {
    n_commandHelper
}