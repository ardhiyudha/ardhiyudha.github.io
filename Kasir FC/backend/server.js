const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./kasirfc.db");

// Ambil semua produk
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    res.json(rows);
  });
});

// Simpan transaksi
app.post("/transaction", (req, res) => {
  const { items, total } = req.body;
  const date = new Date().toISOString();

  db.run(
    "INSERT INTO transactions (date, total) VALUES (?, ?)",
    [date, total],
    function () {
      const transactionId = this.lastID;

      items.forEach(item => {
        db.run(
          "INSERT INTO transaction_items (transaction_id, product_id, qty, subtotal) VALUES (?, ?, ?, ?)",
          [transactionId, item.id, item.qty, item.qty * item.price]
        );
      });

      res.json({ success: true });
    }
  );
});

app.listen(3000, () => {
  console.log("Kasir FC backend running on port 3000");
});
