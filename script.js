let total = 0;

// LOGIN
function login() {
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user.value,
      password: pass.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) return alert("Login gagal");
    location.href = data.role === "owner" ? "owner.html" : "kasir.html";
  });
}

// OWNER
function addProduct() {
  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      price: price.value,
      stock: stock.value
    })
  }).then(() => alert("Menu ditambahkan"));
}

// KASIR
fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(data => {
    if (!document.getElementById("menu")) return;
    data.forEach(p => {
      const d = document.createElement("div");
      d.innerText = `${p.name} - Rp ${p.price}`;
      d.onclick = () => {
        total += p.price;
        document.getElementById("total").innerText = total;
      };
      menu.appendChild(d);
    });
  });

function pay() {
  fetch("http://localhost:3000/transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ total })
  });
  alert("Transaksi berhasil");
  total = 0;
}
