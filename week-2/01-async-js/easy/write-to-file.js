const fs = require("fs")
const data = "this is a random sample sentence.\nthis is sentence two, also a random sentence."

fs.writeFile('sample.txt', data, (err) => {
    if(err) {
        console.log("Error writing to the file", err);
    }else {
        console.log('File Written successfully');
    }
})

