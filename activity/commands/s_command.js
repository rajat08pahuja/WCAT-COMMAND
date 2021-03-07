let fs = require("fs");
let path = require("path");

function s_commandHelper(input){
    let content = fs.readFileSync(input , 'utf-8');

    let strToSearch = "\r\n\r\n\r\n"; //this string will be present in case of 2 consecutive line breaks
    let strToUpdate = "\r\n\r\n"; // we will replace 2 cosecutive line breaks with a single line break
    while(content.search(strToSearch) != -1){
        let updatedContent = content.replace(strToSearch , strToUpdate);
        content = updatedContent; //updating the original content everytime
    }

    return content;
}

module.exports = {
    s_commandHelper
}