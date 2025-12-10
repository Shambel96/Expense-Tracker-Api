const db = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const connection = db.createConnection({
    host: "localhost",
    user: "expense_tracker",
    password: "111111",
    database: "expense_tracker",
})
connection.then(()=>{
    console.log("Database connected successfully!");
    
}).catch((err)=>{
    console.log("Database connection failed:", err);
})
module.exports = connection;