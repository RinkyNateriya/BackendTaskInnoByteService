const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const appRoutes = require("../api/src/router/approuter");

const dbconfig="mongodb+srv://samratmalviya1998:COBj69o6x9sjn8HV@cluster0.zodvnmm.mongodb.net/";
app.use(bodyParser.json());
mongoose.connect(dbconfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.use(cors());
app.use(appRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
