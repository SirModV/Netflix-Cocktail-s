var apiKey = 'c090d3c0';

function searchMovieByTitle() {
  var titleInput = document.getElementById('searchInput');
  var movieTitle = titleInput.value;

  //Pulled the API URL from the Omdbapi website.
  var apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&t=${movieTitle}`;

  fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      if (data.Response === 'True') {
        const movieResult = document.getElementById('movieResult');
        movieResult.innerHTML = "Movie Title: " + data.Title + ", Year: " + data.Year + ", Genre: " + data.Genre;
      } else {
        const movieResult = document.getElementById('movieResult');
        movieResult.textContent = 'Movie not found.';
      }
    })
  }

document.getElementById('searchButton').addEventListener('click', searchMovieByTitle);
