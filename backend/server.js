require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Összes növény lekérése
app.get('/plants', (req, res) => {
    db.all("SELECT * FROM plants", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 2. Új növény hozzáadása
app.post('/plants', (req, res) => {
    const { name, perennial, category, price } = req.body;
    if (!name || !category || price === undefined) {
        return res.status(400).json({ error: "Hiányzó adatok!" });
    }
    db.run(
        "INSERT INTO plants (name, perennial, category, price) VALUES (?, ?, ?, ?)",
        [name, perennial, category, price],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, perennial, category, price });
        }
    );
});

// 3. Növény módosítása
app.put('/plants/:id', (req, res) => {
    const { name, perennial, category, price } = req.body;
    db.run(
        "UPDATE plants SET name = ?, perennial = ?, category = ?, price = ? WHERE id = ?",
        [name, perennial, category, price, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Sikeresen módosítva" });
        }
    );
});

// 4. Növény törlése
app.delete('/plants/:id', (req, res) => {
    db.run("DELETE FROM plants WHERE id = ?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Sikeresen törölve" });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
