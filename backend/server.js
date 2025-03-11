import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import storageRoutes from "./routes/storage.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows json data in body

// Simple home
app.get("/home", async (req, res) => {
  res.send("You are home");
});

app.use("/api/storage", storageRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server start at http://localhost:5000 ");
});
