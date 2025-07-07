import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Backend is running!' });
});

app.listen(8000, () => {
    console.log('Listening to http://localhost:8000')
});