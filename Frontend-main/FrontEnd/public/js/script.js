async function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ตรวจสอบว่าผู้ใช้กรอกข้อมูลหรือไม่
    if (!username || !password) {
        alert('กรุณากรอก Username และ Password');
        return;
    }

    try {
        const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TU264f44b43d77af936daf5de80a472a601ef11a11ea917586b51bc287990d5fc226ec81a9df38a7a225eaa1c70e65c5b6' // แนะนำให้ใช้ตัวแปรในฝั่งเซิร์ฟเวอร์แทน
            },
            body: JSON.stringify({ "UserName": username, "PassWord": password })
        });
    
        // ตรวจสอบสถานะการตอบกลับจาก API
        if (!response.ok) {
            // แจ้งเตือนผู้ใช้กรณีล็อกอินไม่สำเร็จ
            alert('ล็อคอินไม่สำเร็จ กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
            throw new Error('ล็อคอินไม่สำเร็จ โปรดตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
        }
        
         // หากล็อกอินสำเร็จ
         const data = await response.json();
         const infoContainer = document.getElementById("infoContainer");
         infoContainer.innerHTML = ""; // ล้างข้อมูลก่อนหน้า
         displayData(data); // แสดงข้อมูลที่ได้รับจาก API
         openPopup(); // เปิดป็อปอัพ

    } catch (error) {
        // จัดการข้อผิดพลาดที่เกิดขึ้น
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
}

async function saveStudentData(Student) {
    console.log('Preparing to send data:', Student); // ตรวจสอบว่าข้อมูลกำลังจะถูกส่งหรือไม่
    try {
        const response = await fetch('http://localhost:8080/students/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: Student.username,
                engName: Student.displayname_en,
                email: Student.email,
                faculty: Student.faculty,
                type: Student.type
            })
        });

        console.log('Response received'); // ตรวจสอบว่ามีการตอบกลับจากเซิร์ฟเวอร์หรือไม่
        if (!response.ok) {
            throw new Error('ไม่สามารถบันทึกข้อมูลได้ โปรดลองอีกครั้ง');
        }

        console.log('ข้อมูลนักศึกษาถูกบันทึกสำเร็จ');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error.message);
    }
}

function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = (
        'http://localhost:8080/hello?' +
        new URLSearchParams({ myName: username, lastName: password}).toString()
      );
    
    fetch(url)
    .then(response => response.text())
    .then(text => {
        document.getElementById('message').innerText = text;
    })
    .catch(error => console.error('Error:', error));
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}




function displayData(data){
    for (const key in data) {
        const p = document.createElement("p");
        p.id = key; // ตั้งค่า id ตาม key
        p.innerText = `${key}: ${data[key]}`; // ตั้งค่าเนื้อหาเป็นค่าใน data
        infoContainer.appendChild(p); // เพิ่ม <p> ลงใน container
    }
}