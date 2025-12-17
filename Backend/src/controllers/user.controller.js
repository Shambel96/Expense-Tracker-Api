import db from "../config/db";

export const getAllUsers = async (req, res)=>{
    try{
        const conn = await db;
        const [rows]= await conn.query("SELECT * FROM users");
        res.json(rows);
    } catch(err){
        console.error("Error fetching users:", err);
        res.status(500).json({
            message: "Interval server error"
        })
}
}