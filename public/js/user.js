const token = localStorage.getItem("token");

async function loadAvailableMovies() {
    const res = await fetch("/api/movies", {
        headers: { Authorization: `Bearer ${token}` }
    });

    const movies = await res.json();
    const list = document.getElementById("movieList");
    list.innerHTML = "";

    movies.forEach(m => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${m.title}</strong> - ${m.genre}<br>
            <button onclick="book('${m._id}')">Book Now</button>
        `;
        list.appendChild(li);
    });
}

function book(movieId) {
    window.location.href = `/booking.html?movieId=${movieId}`;
}

window.onload = loadAvailableMovies;
