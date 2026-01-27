import {
    getAllUsers as modelGetAllUsers,
    getUserById,
    createUser as modelCreateUser,
    updateUser as modelUpdateUser,
    deleteUser as modelDeleteUser,
    findUserByEmail,
} from "../models/user.model";

export const getAllUsers = async (req, res) => {
    try {
        const users = await modelGetAllUsers();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existing = await findUserByEmail(email);
        if (existing) return res.status(409).json({ message: "Email already in use" });

        const result = await modelCreateUser({ name, email, password });
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    try {
        const result = await modelUpdateUser(id, fields);
        res.json({ affectedRows: result.affectedRows });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await modelDeleteUser(id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
        res.status(204).send();
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};