const links = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const toggle = document.getElementById("chatbot-toggle");
const chatbot = document.getElementById("chatbot");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("chat-input");
const body = document.getElementById("chat-body");

toggle.onclick = () => chatbot.style.display = "flex";
closeBtn.onclick = () => chatbot.style.display = "none";

sendBtn.onclick = sendMessage;

function sendMessage() {
  if (!input.value.trim()) return;

  body.innerHTML += `<div class="user-message">${input.value}</div>`;
  body.innerHTML += `<div class="bot-message">
    Terima kasih 🙌  
    Untuk diskusi detail, silakan lanjut via Fastwork agar lebih terarah.
  </div>`;

  input.value = "";
  body.scrollTop = body.scrollHeight;
}
