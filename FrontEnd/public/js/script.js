function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU264f44b43d77af936daf5de80a472a601ef11a11ea917586b51bc287990d5fc226ec81a9df38a7a225eaa1c70e65c5b6'
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        
        const infoContainer = document.getElementById("infoContainer");
        infoContainer.innerHTML = ""; // ล้างข้อมูลก่อนหน้า
        
        for (const key in data) {
            const p = document.createElement("p");
            p.id = key; // ตั้งค่า id ตาม key
            p.innerText = `${key}: ${data[key]}`; // ตั้งค่าเนื้อหาเป็นค่าใน data
            infoContainer.appendChild(p); // เพิ่ม <p> ลงใน container
        }

        // เปิดป็อปอัพ
        openPopup();
    })
    .catch(error => console.error('Error:', error));
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