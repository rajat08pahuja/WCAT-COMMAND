let fs = require("fs");
let path = require("path");

function appendFiles(file1, file2) {
    if (file1 == path.basename(file1)) {
        file1 = path.join(process.cwd(), file1);
    }
    
    let content = "";
    if (fs.existsSync(file1) == true) {
        content = fs.readFileSync(file1, "utf-8");
    } else {
        console.log("input file does not exist");
        return "input file does not exist";
    }
    
    if (file2 == path.basename(file2)) {
        file2 = path.join(process.cwd(), file2);
    }
    
    if (fs.existsSync(file2) == false) {
        console.log("output file not found");
        return "output file not found";
    }
    
    fs.appendFileSync(file2, content);
}


let input = process.argv.slice(2);

let file1 = input[0];
let file2 = input[1];
appendFiles(file1, file2);