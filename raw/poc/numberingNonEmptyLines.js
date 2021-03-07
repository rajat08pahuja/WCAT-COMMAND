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
    // console.log(content);
}


function addingNumberHelper(data, num) {
    if (data.indexOf("\n") == -1) {
        return ("" + num + data);
    }
    let ans = "";
    let firstIdx = data.indexOf("\n");
    // console.log(firstIdx);
    let substr = data.substring(0, firstIdx + 1);
    let faith;
    if (firstIdx == 1) {
        faith = addingNumberHelper(data.substring(firstIdx + 1), num);
        ans = "" + substr + faith;
    } else {
        faith = addingNumberHelper(data.substring(firstIdx + 1), num + 1);
        ans = "" + num + substr + faith;
    }
    return ans;
}