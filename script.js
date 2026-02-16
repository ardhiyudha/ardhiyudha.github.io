// Contoh sederhana: Navbar akan berubah bayangannya saat di-scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow');
    } else {
        nav.classList.remove('shadow');
    }
});

// Kamu bisa menambahkan tracking atau animasi sederhana di sini nantinya
console.log("Portofolio Ardhi Yudha siap digunakan!");
