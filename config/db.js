// SQL Server connection setup using mssql package
const sql = require("mssql");
const dotenv = require("dotenv");

//Loading the env variables
dotenv.config();

//SQL server configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },

};

async function connectDB(){
    try{
        console.log(config)
        const pool = await sql.connect(config);
        console.log("Connected to SQL Server");
        return pool;
    }
    catch(error){
        console.log("Error Occurred in DB Connection", error)
    }
};

module.exports = {
    connectDB,
}