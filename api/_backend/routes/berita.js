const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const Berita = require("../models/Berita");

// =============================
// POST: Tambah Berita
// =============================
router.post(
  "/cloud",
  [auth, isAdmin],
  async (req, res) => {
    const { judul, isi, gambar } = req.body;
    console.log("📦 Body (Hanya URL):", req.body);
    
    if (!gambar) {
      return res.status(400).json({ msg: "URL Gambar wajib diisi" });
    }

    try {
      const beritaBaru = new Berita({
        judul,
        isi,
        tanggal: new Date(),
        gambar: gambar, // Langsung simpan string URL yang diinput admin
        penulis: req.user.id,
      });
      const berita = await beritaBaru.save();
      res.status(201).json(berita);
    } catch (err) {
      console.error("❌ Error Tambah Berita:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

// =============================
// GET: Semua Berita
// =============================
router.get("/", async (req, res) => {
  try {
    const allBerita = await Berita.find().sort({ tanggal: -1 });
    res.json(allBerita);
  } catch (err) {
    console.error("Error saat mengambil semua berita:", err);
    res.status(500).json({ msg: "Server Error saat mengambil semua berita" });
  }
});

// =============================
// GET: Berita berdasarkan ID
// =============================
router.get("/:id", async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) return res.status(404).json({ msg: "Berita tidak ditemukan" });
    res.json(berita);
  } catch (err) {
    console.error(`Error saat mengambil berita ID ${req.params.id}:`, err);
    res.status(500).json({ msg: "Server Error saat mengambil berita" });
  }
});

// =============================
// PUT: Edit Berita
// =============================
router.put(
  "/:id",
  [auth, isAdmin],
  async (req, res) => {
    const { judul, isi, gambar } = req.body;

    try {
      let berita = await Berita.findById(req.params.id);
      if (!berita) {
        return res.status(404).json({ msg: "Berita tidak ditemukan" });
      }

      // Update kolom berdasarkan input form (berupa URL teks)
      if (judul) berita.judul = judul;
      if (isi) berita.isi = isi;
      if (gambar) berita.gambar = gambar;

      const beritaUpdated = await berita.save();
      res.json(beritaUpdated);
    } catch (err) {
      console.error(`Error saat mengedit berita ID ${req.params.id}:`, err);
      res.status(500).json({ msg: "Server Error saat mengedit berita" });
    }
  }
);

// =============================
// DELETE: Hapus Berita
// =============================
router.delete("/:id", [auth, isAdmin], async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) {
      return res.status(404).json({ msg: "Berita tidak ditemukan" });
    }

    await Berita.findByIdAndDelete(req.params.id);

    res.json({ msg: "Berita berhasil dihapus (Tanpa proses hapus file lokal)" });
  } catch (err) {
    console.error(`Error saat menghapus berita ID ${req.params.id}:`, err);
    res.status(500).json({ msg: "Server Error saat menghapus berita" });
  }
});

module.exports = router;
