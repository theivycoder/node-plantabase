import express from 'express';
import cors from 'cors';
const app = express();

import testPlantRoutes from './app/routes/testPlant.routes.js';
import authRoutes from './app/routes/auth.routes.js';

var corsOptions = {
    origin: "http://localhost:8100"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/testPlant', testPlantRoutes);
app.use('/auth', authRoutes);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to plantabase application." });
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

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