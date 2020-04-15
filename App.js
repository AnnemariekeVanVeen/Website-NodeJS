// Node modules
const express = require("express");
const sequelize = require('./config/database');
const config = require("./config/app.json");
const session = require("express-session");
const path = require("path");

const site = require("./routes/site");

const app = express();
const port = 20074;
//const port = 1074;

// Check if prefix is needed
const prefix = config.environment === "dev" ? "" : "/~annemarieke/dagtentamen/74";

// Check if the database connection is established
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Routing Static Dir with a prefix
app.use(`${prefix}/`, express.static(path.join(__dirname, '/public')));

// Set the view engine
app.set("view engine", "ejs");
app.set("views", `${process.cwd()}/resources/views`);

// Set the Session
app.set('trust proxy', 1);
app.use(session({
    secret: 'unicorn',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

app.use(function(req, res, next) {
    res.locals.employeeObject = req.session.employeeObject;
    next();
});

// Set prefix for deployment on server
app.use(`${prefix}/`, site);

app.listen(port, () => {
    console.log("Website on " + port);
});

