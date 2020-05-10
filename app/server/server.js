const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const PORT = 8080;

app.use(bodyParser.json());

app.use(cors());

// Serving Vue app
app.use(express.static(path.join(__dirname, "..", "/client")));

const apiRoutes = require("./api/routes.js");

app.use('/api', apiRoutes);

app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
})