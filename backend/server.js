import express from "express";
import { connectDB } from "./config/db.js";
import storageRoutes from "./routes/storage.routes.js";

const app = express();

app.use(express.json()); // allows json data in body

app.use("/api/storage", storageRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server start at http://localhost:5000 ");
});
