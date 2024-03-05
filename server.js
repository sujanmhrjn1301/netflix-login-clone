// const mysql = require('mysql')
// const express = require('express');
// const path = require('path');
// const bodyparser = require("body-parser");
// const session = require("express-session");
// const {v4: uuidv4} = require("uuid");

// const router = require('./router');


// const app = express();

// const port = process.env.PORT || 3000;

// //DB Connection
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'users'
// });

// con.connect(function(err) {
// if (err) throw err;
// console.log('Connected to database');
// });

// app.use(bodyparser.json()); // parse requests of content-type - application/
// app.use(bodyparser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencodedjson 

// app.set('view engine', 'ejs');

// //load static assets or simply use css
// app.use('/static', express.static(path.join(__dirname, '/public')));

// app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

// app.use(session({
//   secret: uuidv4(),
//   resave: false,
//   saveUninitialized: true
// }));

// app.use('/route', router);

// //homeroute 
// app.get('/', (req, res)=>{
//   res.render('base',{title:"Netflix Login"});
// })

// app.listen(port, ()=>{console.log("Listening on the server on http://localhost:3000")});


const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { init, router } = require('./router'); // Import init and router from router.js
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true
}));

// Static assets
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

app.set('view engine', 'ejs');

// Database Connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to database');
});

// Pass MySQL connection to router
init(con);

// Routes
app.use('/route', router); // Use router property from the imported object

// Home Route
app.get('/', (req, res) => {
  res.render('base', { title: 'Netflix Login' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
