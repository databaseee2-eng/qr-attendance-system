let totalSessions = 0;

document.getElementById("startSessionBtn").addEventListener("click", () => {
    totalSessions++;
    let sessionId = "session_" + Date.now();

    let url = window.location.origin + window.location.pathname.replace("index.html", "") + "student.html?session=" + sessionId;

    document.getElementById("qrSection").style.display = "block";

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 200,
        height: 200
    });

    localStorage.setItem("totalSessions", totalSessions);
});

function loadAttendance() {
    let data = JSON.parse(localStorage.getItem("attendance") || "{}");
    totalSessions = parseInt(localStorage.getItem("totalSessions") || 0);

    let tbody = document.querySelector("#attendanceTable tbody");
    tbody.innerHTML = "";

    for (let roll in data) {
        let name = data[roll].name;
        let present = data[roll].present;
        let percent = totalSessions ? ((present / totalSessions) * 100).toFixed(1) : 0;

        let row = `<tr>
            <td>${roll}</td>
            <td>${name}</td>
            <td>${present}</td>
            <td>${percent}%</td>
        </tr>`;

        tbody.innerHTML += row;
    }
}

setInterval(loadAttendance, 1000);

document.getElementById("generateDefaulters").addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("attendance") || "{}");
    let csv = "Roll,Name,Present,Total,Percentage\n";

    for (let roll in data) {
        let obj = data[roll];
        let percent = totalSessions ? ((obj.present / totalSessions) * 100).toFixed(1) : 0;

        if (percent < 75) {
            csv += `${roll},${obj.name},${obj.present},${totalSessions},${percent}%\n`;
        }
    }

    let file = new Blob([csv], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "defaulters.csv";
    a.click();
});


loadAttendance();

document.getElementById("generateDefaulters").addEventListener("click", function () {
    let data = JSON.parse(localStorage.getItem("attendanceData")) || [];
    let csv = "Roll No,Name,Percentage\n";

    data.forEach(student => {
        let percent = (student.present / student.total) * 100;

        if (percent < 75) {
            csv += `${student.roll},${student.name},${percent.toFixed(1)}%\n`;
        }
    });

    let a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    a.download = "defaulters.csv";
    a.click();
});
