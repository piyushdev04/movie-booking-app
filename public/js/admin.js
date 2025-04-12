const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "/login.html";
}

document.getElementById("addMovieForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movie = {
    title: titleInput.value,
    description: descInput.value,
    genre: genreInput.value,
    duration: parseInt(durationInput.value),
    date: dateInput.value,
    showtimes: showtimeInput.value.split(",").map(s => s.trim()),
    availableSeats: parseInt(seatsInput.value),
  };

  const res = await fetch("/api/admin/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(movie)
  });

  const data = await res.json();
  if (res.ok) {
    alert("Movie added");
    loadMovies();
  } else {
    alert(data.error || "Error adding Movie");
  }
});

async function loadMovies() {
  const res = await fetch("/api/admin/movies", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const movies = await res.json();
  const list = document.getElementById("movieList");
  list.innerHTML = "";

  movies.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.title} - ${m.genre} (${m.showtimes.join(", ")})`;
    list.appendChild(li);
  });
}

window.onload = loadMovies;