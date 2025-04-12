const token = localStorage.getItem("token");
const movieId = new URLSearchParams(window.location.search).get("movieId");

if (!token) {
  alert("Please login first");
  window.location.href = "/login.html";
}

if (!movieId) {
  alert("No movie selected for booking.");
  window.location.href = "/user.html";
}

document.getElementById("bookingForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const seats = parseInt(document.getElementById("seats").value);

  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ movieId, seats })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Booking successful!");
      window.location.href = "/user.html";
    } else {
      alert(data.message || "Booking failed");
    }
  } catch (err) {
    alert("Server error. Please try again.");
    console.error("Booking error:", err);
  }
});