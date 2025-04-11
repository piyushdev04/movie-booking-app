const token = locakStorage.getItem("token");
const movieId = new URLSearchParams(window.location.search).get("movieId");

document.getElementById("bookingForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const seats = parseInt(document.getElementById("seats").value);

    const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${token}`
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
});