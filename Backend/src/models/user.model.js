import db from "../config/db";

export const getAllUsers = async () => {
    try {
        const conn = await db;
        const [rows] = await conn.query("SELECT * FROM users");
        return rows;
    } catch (err) {
        throw err;
    }
};

export const getUserById = async (id) => {
    try {
        const conn = await db;
        const [rows] = await conn.execute("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0] || null;
    } catch (err) {
        throw err;
    }
};

export const findUserByEmail = async (email) => {
    try {
        const conn = await db;
        const [rows] = await conn.execute("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        return rows[0] || null;
    } catch (err) {
        throw err;
    }
};

export const createUser = async (user) => {
    try {
        const { name, email, password } = user;
        const conn = await db;
        const [result] = await conn.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        );
        return { insertId: result.insertId };
    } catch (err) {
        throw err;
    }
};

export const updateUser = async (id, fields) => {
    try {
        const conn = await db;
        const keys = Object.keys(fields);
        if (keys.length === 0) return null;
        const values = keys.map((k) => fields[k]);
        const setClause = keys.map((k) => `${k} = ?`).join(", ");
        const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
        const [result] = await conn.execute(sql, [...values, id]);
        return result;
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (id) => {
    try {
        const conn = await db;
        const [result] = await conn.execute("DELETE FROM users WHERE id = ?", [id]);
        return result;
    } catch (err) {
        throw err;
    }
};