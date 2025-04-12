const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "/login.html";
}

async function loadAvailableMovies() {
  try {
    const res = await fetch("/api/movies", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const movies = await res.json();
    const list = document.getElementById("movieList");
    list.innerHTML = "";

    movies.forEach(m => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="movie-card">
          <h3>${m.title}</h3>
          <p><strong>Genre:</strong> ${m.genre}</p>
          <p><strong>Showtimes:</strong> ${m.showtimes.join(", ")}</p>
          <p><strong>Available Seats:</strong> ${m.availableSeats}</p>
          <button onclick="book('${m._id}')">Book Now</button>
        </div>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    alert("Error loading movies.");
    console.error("Load movies error:", err);
  }
}

function book(movieId) {
  window.location.href = `/booking.html?movieId=${movieId}`;
}

window.onload = loadAvailableMovies;