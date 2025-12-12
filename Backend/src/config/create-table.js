const db = require("./db");

const createTable = async ()=>{
    try{
        const conn = await db;
        const createExpensesTableQuery = `
        CREATE TABLE IF NOT EXISTS expenses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amount DECIMAL(10, 2) NOT NULL,
            description VARCHAR(255),
            category VARCHAR(100),
            date DATE NOT NULL
        ),
            CREATE TABLE IF NOT EXISTS expensess (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amount DECIMAL(10, 2) NOT NULL,
            description VARCHAR(255),
            category VARCHAR(100),
            date DATE NOT NULL
        )
        `;
        await conn.query(createExpensesTableQuery);
        console.log("Expenses table created or already exists.");
    }catch(err){
        console.error("Error creating expenses table:", err);
    }
}
createTable();