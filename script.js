// popup กดส่งซ่อมใบแจ้งซ่อม
document.getElementById("repairForm").addEventListener("submit", function(event) {
  event.preventDefault(); // ป้องกันการส่งฟอร์มทันที

  const confirmed = confirm("คุณแน่ใจหรือไม่ว่าจะส่ง?");

  if (confirmed) {
    alert("กำลังส่งข้อมูล...");

    const formData = new FormData(this);

    fetch("repair.php", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        alert("ส่งข้อมูลสำเร็จแล้ว!");
        document.getElementById("repairForm").reset();
        closeForm(); // ปิด popup
      } else {
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
    });

/*updata status*/
fetch('/update-status?id=3&to=completed')
  .then(() => window.location.href = '/home.html');


    

  } else {
    alert("ยกเลิกการส่งข้อมูล");
  }
});
