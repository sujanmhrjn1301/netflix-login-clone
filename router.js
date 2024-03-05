// const mysql = require('mysql');
// var express = require("express");

// var router = express.Router();



// const credential = {
//   username: "admin",
//   password: "admin"
// }
// //login user
// router.post('/login', (req, res) => {
//   if (req.body.username == credential.username && req.body.password == credential.password) {
//     req.session.user = req.body.username;
//     // res.redirect('dashboard');
//     res.end("Login Successful...!");
//   } else {
//     res.send("Invalid Username or Password")
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

// Initialize MySQL connection
let con;

// Initialize function to receive MySQL connection
function init(connection) {
  con = connection;
}

// Authentication credentials (just for demonstration)
const credentials = {
  username: 'admin',
  password: 'admin'
};

// Login route
router.post('/login', (req, res) => {
  // Here you can query the database to check if the provided username and password are valid
  const { username, password } = req.body;
  
  // Example query to check if username and password match
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  con.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    if (result.length > 0) {
      req.session.user = username;
      res.redirect('dashboard');
    } else {
      res.send('Invalid Username or Password');
    }
  });
});

//dashboard route
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    // Redirect to login if user is not logged in
    res.redirect('/');
  } else {
    // Render dashboard
    res.render('dashboard');
  }

});

module.exports = { init, router };
