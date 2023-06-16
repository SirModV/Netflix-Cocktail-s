var searchEl = document.querySelector('#searchButton');
var newMovieResultEl = document.querySelector('#new-movie-result');
var apiKey = 'cb373342';
var cocktails = '';
console.log("Hola!");
function searchMoviesByTitles() {
  // console.log(cocktails)
  newMovieResultEl.innerHTML = ''
  var keywordInput = document.getElementById('searchInput').value.toLowerCase();

  // This will store the word in local storage
  localStorage.setItem('searchKeyword', keywordInput);


  var apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${keywordInput}`;
  //created Api URL for the keyword.
getCocktails()
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Response === "True") {
        var movies = data.Search;
        console.log("insisde searchMoviesByTitles");
        console.log(data)
        var movieResult = document.getElementById("movieResult");
        movieResult.innerHTML = "";
        //clears last result

        for (var i = 0; i < movies.length; i++) {
          // var cocktail = cocktails[getCocktails()];
          console.log(cocktails)
            renderData(movies[i],cocktails)
        
          
          // renderData(movies[i], cocktails)
        }
       
      } else {
        var movieResult = document.getElementById("movieResult");
        movieResult.textContent =
          "No movies found for the keyword: " + keywordInput;
      }
      console.log("hi!");
    });
}
function getSingleMovie(movieId) {
  console.log("getSingleMovie");
  var movieInformationUrl = "https://www.omdbapi.com/?apikey=" + apiKey + "&type=movie&i=" + movieId;
  fetch(movieInformationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (movieData) {
      console.log(movieData)
      // var movieDetails =
      //   "Movie Title: " +
      //   movieData.Title +
      //   ", Year: " +
      //   movieData.Year +
      //   ", Genre: " +
      //   movieData.Genre;
      // movieResult.innerHTML += movieDetails + "<br>";
      var moviePoster = getMoviePoster(movieId);
      var cocktail = getRandomCocktail()

      renderData(movieData, cocktail)
    });
}



function getCocktails() {
  var cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php?apikey=1'
  // var cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin'
  var final
  fetch(cocktailUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // var randomDrink = Math.floor(Math.random() * data.drinks.length)
      // var cocktailTitle = data.drinks[randomDrink]
      console.log(data.drinks)
      cocktails = data.drinks;
      console.log(cocktails)
    })
  // console.log(cocktails)

}

function getRandomCocktail() {
  console.log(cocktails)
  console.log(cocktails.length)
  return Math.floor(Math.random() * cocktails.length)
}

// getRandomCocktail();


function getMoviePoster(movieID) {
  var apiUrl = `http://img.omdbapi.com/?i=${movieID}&apikey=${apiKey}`;
  console.log("oh hey ", apiUrl)

  fetch(apiUrl)
    .then(function (response) {
      return response.blob(); //binary data
    })
    .then(function (data) {
      console.log("Poster data!", data);
      var fr = new FileReader(); //create new object File Reader 
      //turning binary data into a string
      fr.readAsDataURL(data); //string data gets passed in
      fr.onloadend = function () {
        var s = fr.result;
        console.log("Woo?", s);

        var newImg = document.createElement("img");
        newImg.setAttribute("src", s);
        document.getElementById('listOfMovies').appendChild(newImg);
        return s;
      }
    });
}

function renderData(movie, cocktail) {
  console.log("renderData")
  console.log(movie)
  console.log(cocktail)

  return newMovieResultEl.innerHTML = `<div class="column is-one-quarter">
  <header class="card-header">
    <p class="card-header-title is-centered">
      ${movie.Title} and ${cocktail.strDrink}
    </p>
  </header>
  <div class="columns">
    <!-- Movie Card Info -->
    <div id="movie" class="column card is-one-half">
      <div class="card is-one-half">
        <header class="card-header">
          <p class="card-header-title is-centered">${movie.Title}</p>
        </header>
        <div class="card-image">
          <figure class="image is4x3">
            <img
              src="${movie.Poster}"
              alt=""
            />
            <!-- Placeholder for movie poster image -->
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-4">${movie.Title}</p>
          
        </div>
      </div>
    </div>
    <!-- Cocktail Card Info -->
    <div id="cocktail" class="column card is-one-half">
      <div class="card is-one-half">
        <header class="card-header">
          <p class="card-header-title is-centered">${cocktail.strDrink}</p>
        </header>
        <div class="card-image">
          <figure class="image is4x3">
            <img
              src="${cocktail.image}"
              alt=""
            />
            <!-- Placeholder for movie poster image -->
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-4">${cocktail.ingredients}</p>
          <p>${cocktail.instructions}</p>
        </div>
      </div>
    </div>
  </div>
</div>`
}

//Window is used to listen for load event / used to store the search word. Taken from week 4 (Basic API)

window.addEventListener('load', function () {
  var storedKeyword = localStorage.getItem('searchKeyword');
  // if (storedKeyword) {
  //   document.getElementById('searchInput').value = storedKeyword;
  //   searchMoviesByTitles();
  // }
});

searchEl.addEventListener('click', searchMoviesByTitles);

