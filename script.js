let cart = [];
let total = 0;

fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products");
    data.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `<b>${p.name}</b><br>Rp ${p.price}`;
      div.onclick = () => addToCart(p);
      container.appendChild(div);
    });
  });

function addToCart(product) {
  cart.push({ ...product, qty: 1 });
  total += product.price;
  document.getElementById("total").innerText = total;
}

function pay() {
  fetch("http://localhost:3000/transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart, total })
  });

  alert("Transaksi tersimpan!");
  cart = [];
  total = 0;
  document.getElementById("total").innerText = 0;
}