let fs = require("fs");
let path = require("path");

let input = process.argv[2];

if (input == path.basename(input)) {
    input = path.join(process.cwd(), input);
}

lineRemoval(input);

function lineRemoval(input) {
    let data = fs.readFileSync(input, 'utf-8');

    let strToRemove = '\r\n\r\n\r\n';
    let finalString = "";
    while (data.search(strToRemove) != -1) {
        finalString = data.replace(strToRemove, '\r\n\r\n');
        data = finalString;
    }

    fs.writeFileSync(input, finalString);

}