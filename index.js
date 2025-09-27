// Express kutubxonasini chaqirib olamiz
const express = require('express');
const app = express();
// Render kabi hosting platformalari uchun PORTni avtomatik olish
const PORT = process.env.PORT || 3000;

// --- Matematik Funksiyalar ---

/**
 * Berilgan qiymat qat'iy musbat butun son (Natural son) ekanligini tekshiradi.
 * Bu '5', '5.0', '-5', '0', '5a' kabi barcha hato holatlarni aniqlaydi.
 */
function isNaturalNumber(value) {
    if (typeof value !== 'string') return false;

    // Stringda faqat raqamlar borligini va musbat ekanligini tekshirish
    if (!/^\d+$/.test(value)) return false;

    const num = Number(value);

    // Nol yoki manfiy emasligini va butun son ekanligini tekshirish
    return num > 0 && Number.isInteger(num);
}

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(x, y) {
    // EKUKni hisoblashda Number.isSafeInteger ishlatiladi
    return (x * y) / gcd(x, y);
}

// --- Veb Metod (GET so'rovini qabul qiluvchi qism) ---

app.get('/xolmominovdilshodbek4_gmail_com', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    const x_str = req.query.x;
    const y_str = req.query.y;

    // 1. Kiritilgan qiymatlarni (ular string) Natural Son sifatida tekshirish
    if (!isNaturalNumber(x_str) || !isNaturalNumber(y_str)) {
        return res.send("NaN");
    }

    // Kiritilgan qiymatlarni Number tipiga o'tkazamiz
    const x = Number(x_str);
    const y = Number(y_str);

    // 2. EKUKni hisoblash
    const result = lcm(x, y);

    // 3. Natijani oddiy string shaklida qaytarish
    return res.send(String(result));
});

// --- Serverni ishga tushirish ---

app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}/xolmominovdilshodbek4_gmail_com?x={}&y={}`);
});