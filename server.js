import express from 'express';
import cors from 'cors';

const app = express();

import User from './app/models/user.model.js';
import authController from './app/controllers/auth.controller.js';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import passport from 'passport';



// import routes
import testPlantRoutes from './app/routes/testPlant.routes.js';
import userRoutes from './app/routes/user.routes.js';

// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());

var corsOptions = {
    origin: "http://localhost:8100"
};

app.use(cors(corsOptions), passport.initialize());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/testPlant', testPlantRoutes);
app.use('/user', userRoutes);

// Generic Home Route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to plantabase application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// import database connection
import db from './app/models/index.js';

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });