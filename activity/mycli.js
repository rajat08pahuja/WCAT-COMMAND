#!/usr/bin/env node

let fs = require("fs");
let path = require("path");

// requiring all files
let pathHandling = require("./pathHandling");
let appendFiles = require("./commands/appendFiles");
let b_command = require("./commands/b_command");
let copyFiles = require("./commands/copyFiles");
let n_command = require("./commands/n_command");
let readFiles = require("./commands/readFiles");
let s_command = require("./commands/s_command");

let input = process.argv.slice(2); //input

// 3 different arrays to store different command line arguments
let filesToProcess = [];
let optionsToProcess = [];
let specialCommandsToProcess = [];

for (let i = 0; i < input.length; i++) {
    let op = input[i];
    if (op == '-n' || op == '-s' || op == '-b') {
        optionsToProcess.push(op);
    } else if (op == '>' || op == '>>') {
        specialCommandsToProcess.push(op);
    } else {
        filesToProcess.push(op);
    }
}

// 8 cases
if (filesToProcess.length == 0 && optionsToProcess.length == 0 && specialCommandsToProcess.length == 0) {
    // no arguments provided
    console.log("Wrong Command Entered");
} else if (filesToProcess.length == 0 && optionsToProcess.length == 0 && specialCommandsToProcess.length != 0) {
    // only > , >> used without any filename
    console.log(`Wrong Command Entered`);
} else if (filesToProcess.length == 0 && optionsToProcess.length != 0 && specialCommandsToProcess.length == 0) {
    // only options -n ,-s , -b given
    console.log("Wrong Command Entered");
} else if (filesToProcess.length == 0 && optionsToProcess.length != 0 && specialCommandsToProcess.length != 0) {
    // options -n , -s , -b , > , >> are given without filename
    console.log("Wrong Command Entered");
} else if (filesToProcess.length != 0 && optionsToProcess.length == 0 && specialCommandsToProcess.length == 0) {
    // filename given --> display them to console
    let concatedAns = ""; // concate the answers in case of multiple files
    for (let i = 0; i < filesToProcess.length; i++) {
        let file = filesToProcess[i];
        let path = pathHandling.pathHandler(file); // check if path exists or not
        if (path == -1) {
            console.log("File Does Not Exist");
            return;
        } else {
            concatedAns += readFiles.readFilesHelper(path);
        }
    }

    console.log(concatedAns);
} else if (filesToProcess.length != 0 && optionsToProcess.length == 0 && specialCommandsToProcess.length != 0) {
    // files and special characters given > , >>
    // only 1 operation can be used at a time
    // exactly 2 files required
    if (specialCommandsToProcess.length == 1 && filesToProcess.length == 2) {
        let op = specialCommandsToProcess[0];

        let input = filesToProcess[0];
        let output = filesToProcess[1];
        let i_path = pathHandling.pathHandler(input);
        let o_path = pathHandling.pathHandler(output);
        if (op == '>') {
            // copy files
            if (o_path == -1) {
                if (output == path.basename(output)) {
                    output = path.join(process.cwd(), output);
                }
            }
            if (i_path == -1) {
                console.log("Input File Does Not Exist");
            } else {
                copyFiles.copyFilesHelper(i_path, output);
            }
        } else if (op == '>>') {
            // append files
            if(i_path == -1){
                console.log("File Does Not Exist");
            } else if(o_path == -1){
                console.log("Output File Does Not Exist");
            } else{
                appendFiles.appendFilesHelper(i_path , o_path);
            }
        }
    } else {
        console.log("Wrong Command Entered");
    }
} else if (filesToProcess.length != 0 && optionsToProcess.length != 0 && specialCommandsToProcess.length == 0) {
    // files and options are given
    // in case of multiple options available use the first option only
    let concatedAns = ""; //concating ans for multiple files
    for (let i = 0; i < filesToProcess.length; i++) {
        let file = filesToProcess[i];
        let path = pathHandling.pathHandler(file);

        if (path == -1) {
            console.log("File Does Not Exist");
            return;
        }
        let op = optionsToProcess[0];

        if (op == '-n') {
            concatedAns += n_command.n_commandHelper(path);
        } else if (op == '-b') {
            concatedAns += b_command.b_commandHelper(path);
        } else if (op == '-s') {
            concatedAns += s_command.s_commandHelper(path);
        }
    }

    console.log(concatedAns);
} else if (filesToProcess.length != 0 && optionsToProcess.length != 0 && specialCommandsToProcess.length != 0) {
    // all 3 types present together
    // use only first option in case of multiple available options
    if (filesToProcess.length == 2 && specialCommandsToProcess.length == 1) {
        let op = optionsToProcess[0];
        let sop = specialCommandsToProcess[0];
        let input = filesToProcess[0];
        let output = filesToProcess[1];
        let i_path = pathHandling.pathHandler(input);
        let o_path = pathHandling.pathHandler(output);

        if (i_path == -1) {
            console.log("File Does Not Exist");
            return;
        }

        let data = "";
        if (op == '-n') {
            data = n_command.n_commandHelper(i_path);
        } else if (op == '-s') {
            data = s_command.s_commandHelper(i_path);
        } else if (op == '-b') {
            data = b_command.b_commandHelper(i_path);
        }

        if (sop == '>') {
            // copy files
            if (o_path == -1) {
                if (output == path.basename(output)) {
                    output = path.join(process.cwd(), output);
                }
            }

            fs.writeFileSync(output, data);
        } else if (sop == '>>') {
            // append files
            if (o_path == -1) {
                console.log("Output File Does Not Exist");
            } else {
                fs.appendFileSync(o_path, data);
            }
        }
    } else {
        console.log("Wrong Command Entered");
    }
}