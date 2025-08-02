app.use(express.static('public'));
// server.js //save_data
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'repair_db'
});

// 🔧 ดึงข้อมูลรายการแจ้งซ่อม
app.get('/repairs', (req, res) => {
  db.query('SELECT * FROM repairs', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});





//home

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public')); // สำหรับเสิร์ฟไฟล์ HTML ถ้ามี

// ✅ เชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'repair_db'
});

// 🔧 API แสดงรายการแจ้งซ่อมทั้งหมด
app.get('/repairs', (req, res) => {
  const sql = 'SELECT * FROM repairs ORDER BY id DESC';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ:', err);
      return res.status(500).send('Database error');
    }

    // 🔄 แปลงเป็น HTML (ถ้าต้องการแบบ PHP เดิม)
    if (results.length > 0) {
      const html = results.map(row => `
        📆 วันที่: ${row.date}
        | 🕐 เวลา: ${row.time}
        | 🏭 ไลน์: ${row.line}
        | 🧩 แผนก: ${row.section}
        | 🔧 เครื่องจักร: ${row.Machine_name}
        | รหัส: ${row.Machine_Code}<br><hr>
      `).join('');
      res.send(`<h2>📋 รายการแจ้งซ่อมทั้งหมด</h2>${html}`);
    } else {
      res.send('ยังไม่มีรายการแจ้งซ่อม');
    }
  });
});

// ✅ เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready: http://localhost:${PORT}`);
});


//บันทึกใบแจ้งซ่อม
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // ไฟล์ static เช่น home.html ต้องอยู่ในโฟลเดอร์ public

// เชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'repair_db'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// Route สำหรับรับข้อมูลฟอร์มและบันทึกลงฐานข้อมูล
app.post('/save-report', (req, res) => {
  const { machine, location, problem, reporter } = req.body;

  const sql = `INSERT INTO repairs (machine_name, location, problem, reporter)
               VALUES (?, ?, ?, ?)`;
  connection.execute(sql, [machine, location, problem, reporter], (err, results) => {
    if (err) {
      console.error('❌ Failed to insert data:', err);
      res.status(500).send('Error saving report');
      return;
    }

    // ✅ Redirect กลับไปหน้า home.html
    res.redirect('/home.html');
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});


//update status
app.get('/update-status', (req, res) => {
  const id = parseInt(req.query.id);
  const to = req.query.to;

  const allowed = ['pending', 'in_progress', 'completed'];
  if (!allowed.includes(to)) {
    return res.status(400).send("Invalid status.");
  }

  const sql = `UPDATE repairs SET status = ? WHERE id = ?`;
  db.execute(sql, [to, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating status:', err);
      return res.status(500).send("Failed to update status.");
    }

    res.redirect('/home.html'); // กลับไปหน้าแรก
  });
});













?>
