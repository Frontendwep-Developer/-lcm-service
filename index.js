// Express kutubxonasini chaqirib olamiz
const express = require('express');
const app = express();
// Server porti. Deploymentda bu o'zgarishi mumkin (masalan, process.env.PORT)
const PORT = 3000;

// --- Matematik Funksiyalar ---

// Eng Katta Umumiy Bo'luvchini (EKUB) topish
function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Eng Kichik Umumiy Karralini (EKUK) topish
// EKUK(x, y) = (x * y) / EKUB(x, y)
function lcm(x, y) {
    return (x * y) / gcd(x, y);
}

// --- Veb Metod (GET so'rovini qabul qiluvchi qism) ---

// VAZIFA TALABIGA MOSLASHTIRILGAN YANGI ROUTE
app.get('/xolmominovdilshodbek4_gmail_com', (req, res) => {
    // Javob formatini faqat matn qilib belgilaymiz
    res.setHeader('Content-Type', 'text/plain');

    const x_str = req.query.x;
    const y_str = req.query.y;

    // Qiymatlarni butun songa (Integer) aylantiramiz
    const x = parseInt(x_str, 10);
    const y = parseInt(y_str, 10);

    // --- Talab Qilingan Tekshiruvlar ---

    // 1. NaN tekshiruvi: Agar son bo'lmasa, bo'sh, manfiy yoki nol bo'lsa (natural son emas)
    if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
        return res.send("NaN");
    }

    // 2. Kiritmada raqamdan boshqa belgi borligini tekshirish (masalan: '10a' yoki '5.5')
    if (String(x) !== x_str || String(y) !== y_str) {
        return res.send("NaN");
    }

    // 3. EKUKni hisoblash
    const result = lcm(x, y);

    // 4. Natijani oddiy string (faqat raqamlar) shaklida qaytarish
    return res.send(String(result));
});

// --- Serverni ishga tushirish ---

app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}/xolmominovdilshodbek4_gmail_com?x={}&y={}`);
});