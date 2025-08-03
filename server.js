require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// เชื่อมต่อ MySQL (ใช้ของ AwardSpace)
const db = mysql.createConnection({
  host: 'fdb1034.awardspace.net',
  user: '4666545_datareport',
  password: 'specialactivityteam4434',  // 🔒 ต้องใส่รหัสผ่านจริงของคุณ
  database: '4666545_datareport',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// 📋 ดึงข้อมูลแบบ JSON
app.get('/repairs', (req, res) => {
  const sql = 'SELECT * FROM repairs ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// 📋 ดึงข้อมูลแบบ HTML
app.get('/repairs-html', (req, res) => {
  const sql = 'SELECT * FROM repairs ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      return res.status(500).send('Database error');
    }

    const html = results.map(row => `
      📆 วันที่: ${row.date}
      | 🕐 เวลา: ${row.time}
      | 🏭 ไลน์: ${row.line}
      | 🧩 แผนก: ${row.section}
      | 🔧 เครื่องจักร: ${row.Machine_name}
      | รหัส: ${row.Machine_Code}<br><hr>
    `).join('');

    res.send(`<h2>📋 รายการแจ้งซ่อมทั้งหมด</h2>${html}`);
  });
});

// 📥 POST บันทึกข้อมูล
app.post('/save-report', (req, res) => {
  const { machine, location, problem, reporter } = req.body;
  const sql = `INSERT INTO repairs (machine_name, location, problem, reporter)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [machine, location, problem, reporter], (err, results) => {
    if (err) {
      console.error('❌ Failed to insert data:', err);
      return res.status(500).send('Error saving report');
    }

    res.redirect('/home.html');
  });
});

// ✅ เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
require('dotenv').config();






