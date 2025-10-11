import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully!");
});

app.listen(PORT, () => console.log(`🔥 Server running on port http://localhost:${PORT}`));
