// Contoh sederhana: Navbar akan berubah bayangannya saat di-scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow');
    } else {
        nav.classList.remove('shadow');
    }
});
document.getElementById('shareBtn').addEventListener('click', async () => {
    const shareData = {
        title: 'Attendance - Smart Workforce Management',
        text: 'Cek aplikasi Attendance buatan Ardhi Yudha. Solusi absen anti-manipulasi dengan Geofencing!',
        url: 'https://ardhiyudha.github.io/attendance.html'
    };

    try {
        // Cek jika browser mendukung Web Share API (Mobile & Chrome Desktop terbaru)
        if (navigator.share) {
            await navigator.share(shareData);
            console.log('Berhasil membagikan');
        } else {
            // Fallback: Copy ke Clipboard jika Share API tidak tersedia
            await navigator.clipboard.writeText(shareData.url);
            
            // Munculkan notifikasi toast Bootstrap
            const toastEl = document.getElementById('shareToast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        }
    } catch (err) {
        console.log('Error saat membagikan:', err);
    }
});

// Kamu bisa menambahkan tracking atau animasi sederhana di sini nantinya
console.log("Portofolio Ardhi Yudha siap digunakan!");
