let fs = require("fs");
let path = require("path");

function b_commandHelper(input){
    let data = fs.readFileSync(input , 'utf-8'); //Reading data from input
    let updatedData = addNumbersNonEmptyLines(data , 1); //Updating this data to get a number before every non empty line
    return updatedData;
}

// recursive function
function addNumbersNonEmptyLines(data , num){
    if(data.indexOf("\n") == -1){
        return "" + num + data;
    }

    let ans = "";
    let firstIdx = data.indexOf("\n"); //can also use '\r\n'
    let substr = data.substring(0 , firstIdx + 1);
    let faith;
    if(firstIdx == 1){ //why ? can also be taken to be 0 if took '\r\n'
        faith = addNumbersNonEmptyLines(data.substring(firstIdx + 1) , num);
        ans = "" + substr + faith;
    } else{
        faith = addNumbersNonEmptyLines(data.substring(firstIdx + 1) , num + 1);
        ans = "" + num + substr + faith;
    }

    return ans;
}

module.exports = {
    b_commandHelper
}