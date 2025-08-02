<?php
$conn = new mysqli("localhost", "root", "", "repair_db");// update หน้าHome
if ($conn->connect_error) { die("Connection failed"); }

$id = $_GET['id'];
$to = $_GET['to']; // in_progress หรือ completed

$conn->query("UPDATE repairs SET status='$to' WHERE id=$id");
header("Location: home.html"); // กลับไปหน้าแรก

//เปลี่ยนสถานะการซ่อม
include 'db_connect.php';

$id = intval($_GET['id']);
$to = $_GET['to'];

$allowed = ['pending', 'in_progress', 'completed'];
if (!in_array($to, $allowed)) {
    die("Invalid status.");
}

$sql = "UPDATE repairs SET status=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $to, $id);
$stmt->execute();

header("Location: home.html");
?>