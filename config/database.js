const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = () => {
    mongoose
        .connect(process.env.DATABASE_URL, {  // with the help of mongoose here load the.env file configuration load inside the process object
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB connection successful")) // successful case
        .catch((error) => {
            console.log("Issue in DB connection"); // fail case
            console.error(error.message);
            process.exit(1);
        });
};


module.exports = dbconnect;