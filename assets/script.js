const apiKey = 'c090d3c0';

function getRandomMovie() {
  const genreSelect = document.getElementById('genre');
  const selectedGenre = genreSelect.value;

  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${selectedGenre}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True' && data.Search && data.Search.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.Search.length);
        const randomMovie = data.Search[randomIndex];
        const movieTitle = randomMovie.Title;

        const movieResult = document.getElementById('movieResult');
        movieResult.textContent = `Random movie: ${movieTitle}`;
      } else {
        const movieResult = document.getElementById('movieResult');
        movieResult.textContent = 'No movie found for the selected genre.';
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

