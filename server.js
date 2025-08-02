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

include 'db_connect.php';



?>
