import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/user.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 1234;

app.get("/", (req, res) => {
    res.send("Expense Tracker Backend is running");
});

app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});