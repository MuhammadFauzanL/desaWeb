const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// ✅ Muat .env (di root)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Hubungkan ke DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Logger sederhana
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Sajikan folder public statis (tergantung kebutuhan)
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => res.send("API Desa Cibiru Berjalan... (Monorepo)"));

// Register Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/berita", require("./routes/berita"));
app.use("/api/profil", require("./routes/profile"));
app.use("/api/aspirasi", require("./routes/aspirasi"));
app.use("/api/peminjaman", require("./routes/peminjaman"));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error detail:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server.",
  });
});

// Hanya listen jika dipanggil langsung (Local Development)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
}

// ✅ WAJIB DI EKSPOR agar dikenali Vercel sebagai serverless function
module.exports = app;
