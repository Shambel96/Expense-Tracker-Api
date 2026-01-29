import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "expense_tracker",
    password: process.env.DB_PASSWORD || "111111",
    database: process.env.DB_NAME || "expense_tracker",
});

connection
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    });

export default connection;