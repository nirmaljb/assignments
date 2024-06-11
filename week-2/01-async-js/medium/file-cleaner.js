const fs = require("fs")

fs.readFile("a.txt", "utf-8", (err, data) => {
    if(err) throw err;
    const cleanResponse = data.replace(/\s+/g, ' ')
    fs.writeFile("a.txt", cleanResponse, (err) => {
        if(err) throw err;
    })
})