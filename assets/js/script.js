var apiKey = 'c090d3c0';
function searchMoviesByTitles() {
  var keywordInput = document.getElementById('searchInput').value.toLowerCase();
  

   var apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${keywordInput}`;
   //created Api URL for the keyword.

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.Response === 'True') {
        var movies = data.Search;

        var movieResult = document.getElementById('movieResult');
        movieResult.innerHTML = ''; 
        //clears last result

        movies.forEach(function(movie) {
          var movieInformationUrl = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&i=${movie.imdbID}`;
          //created another for loop, for the "movie.imdbID"

          fetch(movieInformationUrl)
            .then(function(response) {
              return response.json();
            })
            .then(function(movieData) {
              var movieDetails = "Movie Title: " + movieData.Title + ", Year: " + movieData.Year + ", Genre: " + movieData.Genre;
              movieResult.innerHTML += movieDetails + "<br>";
            });
        });
      } else {
        var movieResult = document.getElementById('movieResult');
        movieResult.textContent = 'No movies found for the keyword: ' + keywordInput;
      }
    });
}

document.getElementById('searchButton').addEventListener('click', searchMoviesByTitles);
