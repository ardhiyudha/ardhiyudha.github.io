// Contoh sederhana: Navbar akan berubah bayangannya saat di-scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow');
    } else {
        nav.classList.remove('shadow');
    }
});
document.addEventListener('click', async (e) => {
    // Mencari apakah yang diklik adalah tombol share atau icon di dalamnya
    const btn = e.target.closest('#shareBtn');
    
    if (btn) {
        // Mengambil data secara dinamis dari atribut 'data-'
        const shareData = {
            title: btn.getAttribute('data-title'),
            text: btn.getAttribute('data-text'),
            url: btn.getAttribute('data-url') || window.location.href // Fallback ke URL saat ini jika data-url kosong
        };

        try {
            if (navigator.share) {
                // Berbagi ke aplikasi (Mobile/Modern Browser)
                await navigator.share(shareData);
            } else {
                // Salin ke clipboard (Fallback Desktop)
                await navigator.clipboard.writeText(shareData.url);
                
                // Munculkan toast sukses (Pastikan element toast ada di HTML)
                const toastEl = document.getElementById('shareToast');
                if (toastEl) {
                    const toast = new bootstrap.Toast(toastEl);
                    toast.show();
                }
            }
        } catch (err) {
            console.log('User membatalkan atau terjadi kesalahan:', err);
        }
    }
});

// Kamu bisa menambahkan tracking atau animasi sederhana di sini nantinya
console.log("Portofolio Ardhi Yudha siap digunakan!");
