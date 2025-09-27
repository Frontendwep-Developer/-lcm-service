// Express kutubxonasini chaqirib olamiz
const express = require('express');
const app = express();
// Server porti
const PORT = process.env.PORT || 3000;

// --- Matematik Funksiyalar (BigInt versiyasi) ---

function isNaturalNumber(value) {
    if (typeof value !== 'string') return false;
    if (!/^\d+$/.test(value)) return false;

    const num = Number(value);
    return num > 0 && Number.isInteger(num);
}

function gcd_bigint(a, b) {
    let [x, y] = [BigInt(a), BigInt(b)];
    while (y) {
        [x, y] = [y, x % y];
    }
    return x;
}

function lcm_bigint(x, y) {
    return (BigInt(x) * BigInt(y)) / gcd_bigint(x, y);
}

// --- Veb Metod (GET so'rovini qabul qiluvchi qism) ---

// YANFI ROUTE BILAN ALMASHTIRILGAN QISM
app.get('/dilshodbekxolmominov_gmail_com', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    const x_str = req.query.x;
    const y_str = req.query.y;

    if (!isNaturalNumber(x_str) || !isNaturalNumber(y_str)) {
        return res.send("NaN");
    }

    const x = BigInt(x_str);
    const y = BigInt(y_str);

    const result_bigint = lcm_bigint(x, y);

    return res.send(String(result_bigint));
});

// --- Serverni ishga tushirish ---

app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}/dilshodbekxolmominov_gmail_com?x={}&y={}`);
});