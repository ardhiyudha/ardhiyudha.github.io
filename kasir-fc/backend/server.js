const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./kasirfc.db");

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT role FROM users WHERE username=? AND password=?",
    [username, password],
    (err, row) => {
      if (!row) return res.json({ success: false });
      res.json({ success: true, role: row.role });
    }
  );
});

// OWNER: tambah produk
app.post("/products", (req, res) => {
  const { name, price, stock } = req.body;
  db.run(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock],
    () => res.json({ success: true })
  );
});

// KASIR: ambil produk
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    res.json(rows);
  });
});

// KASIR: simpan transaksi
app.post("/transaction", (req, res) => {
  const { total } = req.body;
  db.run(
    "INSERT INTO transactions (date, total) VALUES (?, ?)",
    [new Date().toISOString(), total],
    () => res.json({ success: true })
  );
});

app.listen(3000, () => console.log("Kasir FC running"));
