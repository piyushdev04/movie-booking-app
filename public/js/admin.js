const token = localStorage.getItem("token");

// Add movie
document.getElementById("addMovieForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const movie = {
        title: titleInput.value,
        description: descInput.value,
        genre: genreInput.value,
        duration: parseInt(durationTnput.value),
        date: dateInput.value,
        showtimes: showtimeInput.value.split(","),
        availableSeats: parseInt(seatsInput.value)
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
        alert("Error adding Movie");
    }
});
