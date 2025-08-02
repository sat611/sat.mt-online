<?php//บันทึกใบแจ้งซ่อม
include 'db_connect.php';

$machine = $_POST['machine'];
$location = $_POST['location'];
$problem = $_POST['problem'];
$reporter = $_POST['reporter'];

$sql = "INSERT INTO repairs (machine_name, location, problem, reporter)
        VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $machine, $location, $problem, $reporter);
$stmt->execute();

header("Location: home.html");
?>