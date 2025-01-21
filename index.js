
//we use a express.js framework and create a server
const express = require("express");
const app = express();

//load config from env file to process object
require("dotenv").config();
const port = process.env.port || 3000; // it access port number in process object if not found then assign port number 3000

//MIDLEWARE TO PARSE JSON object
app.use(express.json());

//import api route

const authRoutes = require("./routes/users");
//mount the  api routes
app.use("/api/v1", authRoutes);


//start server at port number port
app.listen(port, () => {
    console.log(`Server started successfully at ${port}`);

})

//import and connect with dbconnect fxn
const dbconnect = require("./config/database");
dbconnect(); //call the db connect fxn

//default route for home page
app.get("/", (req, res) => {
    res.send(`<h1> this is homepage body <h1>`);
})