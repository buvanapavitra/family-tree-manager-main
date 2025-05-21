import dotenv from "dotenv";
dotenv.config({ path: "./family-tree-backend/.env" });
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import path from "path";
import { fileURLToPath } from "url";
import memberRoutes from "./routes/memberRoutes.js";
import "./db.js"; // Import the database connection
// Load environment variables from .env file
import { connectDB } from "./db.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("__dirname is:", __dirname);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from frontend build
const staticPath = path.join(__dirname, "..", "family-tree-frontend", "dist");
console.log("Serving static files from:", staticPath);
app.use(express.static(staticPath));

// API routes
app.use("/api/members", memberRoutes);

// Serve frontend app (for React Router fallback)
// Fallback for React Router (must come after API routes and static serve)
app.get(/(.*)/, (req, res) => {
  const indexPath = path.join(staticPath, "index.html");
  res.sendFile(indexPath);
});

//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
