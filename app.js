const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');

const path = require('path');
const cors = require('cors');
const router = require('./route');  // Assuming this is correctly defined

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(bodyParser.json());

// Configure session middleware

app.use(session({
    secret: 'book-track',  // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
   // cookie: { secure: false }  // Set secure: true for HTTPS connections
}));

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

// Use the router for routes
app.use(router);




// Define routes for specific pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'landingPage.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'register.html'));
});

app.get('/mainPage', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'mainPage.html'));
});


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

