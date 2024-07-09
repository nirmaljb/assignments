const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.use((err, req, res) => {
    console.log(err)
    res.json({msg: 'internal server error'})
})

app.use((err, req, res, next) => {
    console.log(err)
    res.json({msg: 'internal server error', error: err})
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
