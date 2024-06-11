const fs = require("fs")

const data = "Hello, from code"

fs.writeFile("a.txt", data, (err) => {
    if(err) throw err;
})