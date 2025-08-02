<?php
$conn = new mysqli("localhost", "root", "", "repair_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM repairs ORDER BY id DESC";
$result = $conn->query($sql);

echo "<h2>📋 รายการแจ้งซ่อมทั้งหมด</h2>";

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "📆 วันที่: " . $row['date'] . 
             " | 🕐 เวลา: " . $row['time'] . 
             " | 🏭 ไลน์: " . $row['line'] . 
             " | 🧩 แผนก: " . $row['section'] . 
             " | 🔧 เครื่องจักร: " . $row['Machine_name'] . 
             " | รหัส: " . $row['Machine_Code'] . "<br><hr>";
    }
} else {
    echo "ยังไม่มีรายการแจ้งซ่อม";
}

$conn->close();

include 'db_connect.php';



?>