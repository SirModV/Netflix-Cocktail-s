var apiKey = 'c090d3c0';
function searchMoviesByTitles() {
  var keywordInput = document.getElementById('searchInput').value.toLowerCase();
  
var apiKey = 'cb373342';

function searchMovieByTitle() {
  var titleInput = document.getElementById('searchInput');
  var movieTitle = titleInput.value;

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

document.getElementById('searchButton').addEventListener('click', searchMovieByTitle);

function getMoviePoster(movieID) {
  var apiUrl = `http://img.omdbapi.com/?i=${movieID}&apikey=${apiKey}`;
  console.log("oh hey ", apiUrl)

function getRandomCocktail() {
  var cocktailUrl = 'http://www.thecocktaildb.com/api/json/v1/1/random.php?apikey=1'

  fetch(cocktailUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var randomDrink = Math.floor(Math.random()*data.drinks.length)
      var cocktailTitle = data.drinks[randomDrink]
      console.log(cocktailTitle)
    })
    
}
getRandomCocktail();

document.getElementById('searchButton').addEventListener('click', searchMoviesByTitles);

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