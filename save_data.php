<?php

//
$host = "localhost";
$user = "root";
$pass = ""; // ถ้ามีรหัสผ่านใส่ตรงนี้
$dbname = "repair_db";

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli($host, $user, $pass, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// รับค่าจากฟอร์ม
$date = $_POST['date'];
$time = $_POST['time'];
$line = $_POST['line'];
$section = $_POST['section'];
$Machine_name = $_POST['Machine_name'];
$Machine_Code = $_POST['Machine_Code'];

// เตรียมคำสั่ง SQL
$sql = "INSERT INTO repairs (date, time, line, section, Machine_name, Machine_Code)
        VALUES (?, ?, ?, ?, ?, ?)";

// เตรียม statement
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $date, $time, $line, $section, $Machine_name, $Machine_Code);

// รันคำสั่ง
if ($stmt->execute()) {
    header("Location: home.php"); // ไปหน้าแสดงรายการ
    exit();
} else {
    echo "เกิดข้อผิดพลาด: " . $stmt->error;
}

$stmt->close();
$conn->close();

include 'db_connect.php';


?>