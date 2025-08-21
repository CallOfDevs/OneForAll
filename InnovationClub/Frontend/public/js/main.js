async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageBox = document.getElementById("message");
  try {
    const res = await fetch("http://localhost:6969/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      messageBox.innerText = data.message;
      messageBox.style.color = "red";
      return;
    }

    // ✅ Redirect based on role from backend
    if (data.role === "admin") {
      window.location.href = "pages/adminDashboard.html";
    } else if (data.role === "faculty") {
      window.location.href = "pages/facultyDashboard.html";
    } else if (data.role === "student") {
      window.location.href = "pages/studentDashboard.html";
    } else {
      messageBox.innerText = "Unknown role!";
      messageBox.style.color = "red";
    }

  } catch (error) {
    messageBox.innerText = "⚠️ Server not responding";
    messageBox.style.color = "red";
  }
}
