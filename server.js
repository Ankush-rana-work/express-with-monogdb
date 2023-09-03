const express = require('express')
const app = express()
const { Mongoose } = require('./config/db');
const v1Routes = require("./v1/routes");
const { sendError } = require("./util/commonHelper");
require('dotenv').config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/api/v1', v1Routes)
app.get("/", (req, res) => res.send("Hello World!"));

app.use((req, res) => {
    sendError(res, 404, 'Not found');
});

app.use((err, req, res, next) => {
    console.log("Middleware Error Handling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    sendError(res, errStatus, errMsg);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));