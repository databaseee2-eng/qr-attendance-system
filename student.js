const urlParams = new URLSearchParams(window.location.search);
let sessionId = urlParams.get("session");

document.getElementById("submitBtn").addEventListener("click", () => {
    let roll = document.getElementById("roll").value.trim();
    let name = document.getElementById("name").value.trim();

    if (!roll || !name) {
        alert("Please fill all fields");
        return;
    }

    let data = JSON.parse(localStorage.getItem("attendance") || "{}");

    if (!data[roll]) {
        data[roll] = { name: name, present: 0, sessions: [] };
    }

    if (data[roll].sessions.includes(sessionId)) {
        document.getElementById("msg").innerText = "Attendance already marked for this session.";
        return;
    }

    data[roll].present++;
    data[roll].sessions.push(sessionId);

    localStorage.setItem("attendance", JSON.stringify(data));

    document.getElementById("msg").innerText = "Attendance marked successfully!";
});

