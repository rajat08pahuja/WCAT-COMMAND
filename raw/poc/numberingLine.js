let fs = require("fs");
let path = require("path");

let input = process.argv.slice(2)[0];

if (input == path.basename(input)) {
    input = path.join(process.cwd(), input);
}

addingNumber(input);

function addingNumber(input) {
    let data = fs.readFileSync(input, 'utf-8');
    let content = addingNumberHelper(data, 1);
    fs.writeFileSync(input, content);
}


function addingNumberHelper(data, num) {
    if (data.indexOf("\n") == -1) {
        return ("" + num + data);
    }

    let firstIdx = data.indexOf("\n");
    let substr = data.substring(0, firstIdx + 1);
    let faith = addingNumberHelper(data.substring(firstIdx + 1), num + 1);
    let ans = "" + num + substr + faith;
    return ans;
}