const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');
let db = require('./db/db.json');

app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));


// Create function to accept a query and return a filtered result, 11.1.5
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.get) {
        filteredResults = filteredResults.filter(note => note.show === query.show);
    }
    if (query.hide) {
        filteredResults = filteredResults.filter(note => note.hide === query.hide);
    }
    if (query.delete) {
        filteredResults = filteredResults.filter(note => note.delete ===query.delete);
    }
    return filteredResults;
};
// Create matching routes to each front end fetch calls


// Create a route that opens in the browser, 11.1.5
app.get('/api/notes', (req, res) => {
    // let results = notes;
    // if (req.query) {
    //     results = filterByQuery(req.query, results);
    // }
    console.log(db);
    res.json(db);
    // console.log(req.query);
    // res.JSON(results);
});

// app.post("/", (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

app.post("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.delete("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.delete("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// Acknowledge that server is listening on specified port 11.1.5
app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}.`);
});