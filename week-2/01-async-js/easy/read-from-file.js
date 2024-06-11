const fs = require("fs")

fs.readFile('sample.txt', "utf-8", (err, data) => {
    if(err) {
        console.log("Error reading the file", err);
    }else {
        console.log("Content :\n", data);
    }
})