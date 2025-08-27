async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageBox = document.getElementById("message");
  try {
    const res = await fetch("/api/login", {
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

    localStorage.setItem("token", data.token);

    // ✅ Redirect based on role from backend
    if (data.role === "admin") {
      document.body.className = "admin-bg";
      window.location.href = "/admin/dashboard";
    } else if (data.role === "faculty") {
      document.body.className = "faculty-bg";
      window.location.href = "/faculty/dashboard";
    } else if (data.role === "student") {
      document.body.className = "student-bg";
      window.location.href = "/student/dashboard";
    }

  } catch (error) {
    messageBox.innerText = "⚠️ Server not responding";
    messageBox.style.color = "red";
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

async function validCheck() {
  const token = localStorage.getItem("token");
  await fetch("/api/validate", {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` }
  }).then(res => {
    if (res.status === 401) {
      alert("Session expired. Please log in again.");
      logout();
    }
  }).catch(() => {
    alert("⚠️ Server not responding");
    logout();
  });
}
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    login();
  }
})