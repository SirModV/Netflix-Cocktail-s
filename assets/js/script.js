var apiKey = 'cb373342';

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
        var movieId = data.imdbID; //grabs data from movie result
        getMoviePoster(movieId); //passed info into function
      } else {
        const movieResult = document.getElementById('movieResult');
        movieResult.textContent = 'Movie not found.';
      }
    });
  }

document.getElementById('searchButton').addEventListener('click', searchMovieByTitle);

function getMoviePoster(movieID) {
  var apiUrl = `http://img.omdbapi.com/?i=${movieID}&apikey=${apiKey}`;
  console.log("oh hey ", apiUrl)

  fetch(apiUrl)
  .then(function(response) {
    return response.blob(); //binary data
  })
  .then(function(data) {
    console.log("Poster data!", data);
    var fr = new FileReader(); //create new object File Reader 
    //turning binary data into a string
    fr.readAsDataURL(data); //string data gets passed in
    fr.onloadend = function() {
      var s = fr.result;
      console.log("Woo?", s);
      var newImg = document.createElement("img");
      newImg.setAttribute("src", s);
      document.getElementById('listOfMovies').appendChild(newImg);
    }
  });
}