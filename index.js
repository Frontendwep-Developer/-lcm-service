// Express kutubxonasini chaqirib olamiz
const express = require('express');
const app = express();
// Render kabi hosting platformalari uchun PORTni avtomatik olish
const PORT = process.env.PORT || 3000;

// --- Matematik Funksiyalar ---

/**
 * Eng Katta Umumiy Bo'luvchini (EKUB) Evklid algoritmi yordamida topadi.
 */
function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

/**
 * Eng Kichik Umumiy Karralini (EKUK) topadi.
 * EKUK(x, y) = (x * y) / EKUB(x, y)
 */
function lcm(x, y) {
    // EKUK uchun eng yuqori aniqlikni ta'minlash uchun Math.abs() ishlatiladi,
    // ammo bizning tekshiruvimiz manfiy sonlarni avvaldan bloklaydi.
    return (x * y) / gcd(x, y);
}

// --- Veb Metod (GET so'rovini qabul qiluvchi qism) ---

// VAZIFA TALABIGA MOSLASHTIRILGAN Yagona ROUTE
app.get('/xolmominovdilshodbek4_gmail_com', (req, res) => {
    // Javob formatini faqat matn qilib belgilaymiz
    res.setHeader('Content-Type', 'text/plain');

    const x_str = req.query.x;
    const y_str = req.query.y;

    // 1. Kiritilgan qiymatlar mavjudligini tekshirish
    if (x_str === undefined || y_str === undefined) {
        // Agar ?x=... yoki ?y=... so'rovlari umuman bo'lmasa, NaN qaytaramiz (ehtiyot sharti)
        return res.send("NaN");
    }

    // Qiymatlarni butun songa (Integer) aylantiramiz
    const x = parseInt(x_str, 10);
    const y = parseInt(y_str, 10);

    // --- Talab Qilingan Tekshiruvlar ---

    // 2. NaN tekshiruvi: Agar haqiqiy son bo'lmasa
    // 3. Natural son (x > 0 va y > 0) tekshiruvi
    if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
        return res.send("NaN");
    }

    // 4. Kasr son yoki raqam bo'lmagan belgilar tekshiruvi (eng muhim tekshiruv)
    // Bu '5.5' kabi kasrlar (parseInt 5 ga aylantiradi, lekin String(x) 5.5 ga teng emas)
    // va '10a' kabi harf aralashgan qiymatlarni bloklaydi.
    if (String(x) !== x_str || String(y) !== y_str) {
        return res.send("NaN");
    }

    // 5. EKUKni hisoblash
    const result = lcm(x, y);

    // 6. Natijani oddiy string (faqat raqamlar) shaklida qaytarish
    return res.send(String(result));
});

// --- Serverni ishga tushirish ---

app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}/xolmominovdilshodbek4_gmail_com?x={}&y={}`);
});