let fs = require("fs");
let path = require("path");

let concatedAns = "";
function printContent(src) {
    const data = fs.readFileSync(src, 'utf-8');
    concatedAns += data;
}

function checkpresence(src) {
    return fs.existsSync(src);
}

let input = process.argv.slice(2);

for (let i = 0; i < input.length; i++) {
    let filename = input[i];
    if (filename == path.basename(filename)) {
        filename = path.join(process.cwd(), filename);
    }
    let isPresent = checkpresence(filename);

    if (isPresent == true) {
        printContent(filename);
    } else {
        console.log("file does not exist");
        return "file does not exist";
    }
}

console.log(concatedAns);