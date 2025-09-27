// Express kutubxonasini chaqirib olamiz
const express = require('express');
const app = express();
// Server porti
const PORT = process.env.PORT || 3000;

// --- Matematik Funksiyalar ---

/**
 * Berilgan qiymat qat'iy musbat butun son (Natural son) ekanligini tekshiradi.
 * Bu '5.5', '-5', '0', '5a' kabi barcha hato holatlarni aniqlaydi.
 */
function isNaturalNumber(value) {
    if (typeof value !== 'string') return false;

    // Stringda faqat raqamlar borligini va musbat ekanligini tekshirish
    if (!/^\d+$/.test(value)) return false;

    // Qiymat 0 dan katta ekanligini tekshirish (Natural son talabi)
    const num = Number(value);
    return num > 0 && Number.isInteger(num);
}

/**
 * Eng Katta Umumiy Bo'luvchini (EKUB) BigInt bilan topish.
 */
function gcd_bigint(a, b) {
    let [x, y] = [BigInt(a), BigInt(b)];
    while (y) {
        [x, y] = [y, x % y];
    }
    return x;
}

/**
 * Eng Kichik Umumiy Karralini (EKUK) BigInt bilan topish.
 * EKUK(x, y) = (x * y) / EKUB(x, y)
 */
function lcm_bigint(x, y) {
    // BigInt hisobi xavfsiz va aniq bo'ladi
    return (BigInt(x) * BigInt(y)) / gcd_bigint(x, y);
}

// --- Veb Metod (GET so'rovini qabul qiluvchi qism) ---

app.get('/xolmominovdilshodbek4_gmail_com', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    const x_str = req.query.x;
    const y_str = req.query.y;

    // 1. Kiritilgan qiymatlarni (ular string) Natural Son sifatida tekshirish
    // Agar bu shartlardan o'tsa, qiymatlar to'g'ri musbat butun son hisoblanadi.
    if (!isNaturalNumber(x_str) || !isNaturalNumber(y_str)) {
        return res.send("NaN");
    }

    // Kiritilgan qiymatlarni BigInt ga o'tkazish
    const x = BigInt(x_str);
    const y = BigInt(y_str);

    // 2. EKUKni BigInt bilan hisoblash
    const result_bigint = lcm_bigint(x, y);

    // 3. Natijani oddiy string shaklida qaytarish
    // BigInt() ni String() ga o'tkazish
    return res.send(String(result_bigint));
});

// --- Serverni ishga tushirish ---

app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}/xolmominovdilshodbek4_gmail_com?x={}&y={}`);
});