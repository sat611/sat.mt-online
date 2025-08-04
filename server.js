const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // เปลี่ยนจาก 'pg' เป็น 'mysql'
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// สร้าง connection กับ MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,     // = mysql.railway.internal
  user: process.env.DB_USER,     // = root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT      // = 3306
});

// เชื่อมต่อฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// route ตัวอย่าง
app.post('/api/repair', (req, res) => {
  const { machine_name, location, problem, reporter } = req.body;

  const sql = 'INSERT INTO repairs (machine_name, location, problem, reporter) VALUES (?, ?, ?, ?)';
  const values = [machine_name, location, problem, reporter];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error inserting data:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ message: 'Success' });
    }
  });
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
