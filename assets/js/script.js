const apiKey = 'c090d3c0';

function searchMovieByTitle() {
  const titleInput = document.getElementById('searchInput');
  const movieTitle = titleInput.value;

  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&t=${movieTitle}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        const movieResult = document.getElementById('movieResult');
        movieResult.textContent = `Movie Title: ${data.Title}, Year: ${data.Year}, Genre: ${data.Genre}`;
      } else {
        const movieResult = document.getElementById('movieResult');
        movieResult.textContent = 'Movie not found.';
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}