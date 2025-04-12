document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = data.role === "admin" ? "/admin.html" : "/user.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Server error. Please try again.");
      console.error("Login error:", err);
    }
  });  