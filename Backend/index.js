require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const AdminAuth = require('./Routes/UserAuth');



app.use('/authusers', AdminAuth);


// Start server
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
