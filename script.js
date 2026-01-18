// LOGIN
function login() {
  const u = username.value;
  const p = password.value;

  if (u === "owner" && p === "123") {
    localStorage.setItem("role", "owner");
    location.href = "owner.html";
  } else if (u === "kasir" && p === "123") {
    localStorage.setItem("role", "kasir");
    location.href = "kasir.html";
  } else {
    alert("Login salah");
  }
}

// INIT DATA
let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name: "Ayam Crispy Original", price: 12000 },
  { id: 2, name: "Ayam Crispy Pedas", price: 13000 }
];

localStorage.setItem("products", JSON.stringify(products));

// OWNER
function addProduct() {
  const newProduct = {
    id: Date.now(),
    name: name.value,
    price: parseInt(price.value)
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}

if (document.getElementById("productList")) {
  productList.innerHTML = "";
  products.forEach(p => {
    productList.innerHTML += `
      <div class="card">
        ${p.name}<br>Rp ${p.price}
      </div>
    `;
  });
}

// KASIR
let total = 0;

if (document.getElementById("menu")) {
  menu.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `${p.name}<br>Rp ${p.price}`;
    div.onclick = () => {
      total += p.price;
      document.getElementById("total").innerText = total;
    };
    menu.appendChild(div);
  });
}

function bayar() {
  alert("Transaksi sukses!");
  total = 0;
  document.getElementById("total").innerText = 0;
}
