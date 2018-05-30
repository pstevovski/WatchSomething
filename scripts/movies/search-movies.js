//API KEY.
var API_KEY = config.API_KEY;

//Gets the form and uses its value (on submit) to showcase the movies matching the inputed value. After
//the user presses enter, a spinner animation shows up, lasts 1 second, then lists the movies that match
//the inputed value.
const spinner = document.querySelector(".spinner");
spinner.style.display = "none";
const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
	var searchText = document.getElementById("searchText").value;
	pageNum = 1;
	searchMovies(searchText);
	const spinner = document.querySelector(".spinner");
	spinner.style.display = "block";
	const container = document.querySelector(".showcase");
	container.style.display = "none";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "flex";
	}, 1000);
	e.preventDefault();
})
//Get the API data and output it on screen, using the searchText(inputed value in the form & submited on //enter), that lists the movies matching the input.
function searchMovies(searchText){
	axios.get("https://api.themoviedb.org/3/search/movie?query="+searchText+'&api_key='+API_KEY+'&language=en-US&page='+pageNum+'&include_adult=false')
		.then( (response) =>{
			//Fetches the data - > results from the API.
			console.log(response);
			let movies = response.data.results;
			let output = "";
			//Appends to the output the info for each fetched result.
			$.each(movies, (index, movie)=>{
				output += `
				<div class="card">
					<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${movie.id}')"></i></span>
					<span><i class="ion-heart heart" onclick="favorite('${movie.id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
					</div>
					<div class="card_text">
						<h3>${movie.title}</h3>
						<p>Rating: <strong>${movie.vote_average}</strong></p>
						<p>Release date: <strong>${movie.release_date}</strong></p>
						<a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
					</div>
				</div>
				`;
			});
			//Creates a variable that targets the "movies" element in the HTML
			//that will be used to output the data results to.
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
		})
		//If theres an error, it logs it in the console.
		.catch ((err)=>{
			console.log(err);
		})
		//Displays the pages buttons (default display:none), after movies are shown.
		let pages = document.querySelector(".pages");
		pages.style.display = "flex";
}
//When the user clicks on "Movie Details", it sets the ID of that particular movie into the Session storage,//and changes the current page to the "movie-page.html", listing the info for the movie that matches the id
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	location.replace("../movie-page.html");
	return false;
}
//Creates a variable for the page number to make it dynamic.
var pageNum = 1;
//Targets the pages button with "prev" id, and goes backwards one page.
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
	//Decrements(?) the page number by 1.
	pageNum--;
	//Scrolls to top of the window after the button is clicked.
	window.scrollTo(0,0);
	search(pageNum);
})
//Targets the pages button with "next" id, and goes forwards one page.
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
	//Increments the page number by 1.
	pageNum++;
	//Scrolls to top of the window after the button is clicked.
	window.scrollTo(0,0);
	search(pageNum);
})
//Showcases the movies after the user changed the page by clicking previous/next button.
function search(pageNum){
		var searchText = document.getElementById("searchText").value;
		axios.get("https://api.themoviedb.org/3/search/movie?query="+searchText+'&api_key='+API_KEY+'&language=en-US&page='+pageNum+'&include_adult=false')
		.then( (response) =>{
			console.log(response);
			let movies = response.data.results;
			let output = "";

			$.each(movies, (index, movie)=>{
				output += `
				<div class="card">
					<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${movie.id}')"></i></span>
					<span><i class="ion-heart heart" onclick="favorite('${movie.id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
					</div>
					<div class="card_text">
						<h3>${movie.title}</h3>
						<p>Rating: <strong>${movie.vote_average}</strong></p>
						<p>Release date: <strong>${movie.release_date}</strong></p>
						<a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
					</div>
				</div>
				`;
			});

			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
		})
		.catch( (err) =>{
			console.log(err);
		})
}
//Add movie to watch list.
function addToList(id){
    let storedId = JSON.parse(localStorage.getItem("movies")) || [];
    storedId.push(id);
    localStorage.setItem("movies", JSON.stringify(storedId));
    console.log(storedId);
}
//Add movie to favorite movies.
function favorite(id){
    let favorite = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    favorite.push(id);
    localStorage.setItem("favoriteMovies", JSON.stringify(favorite));
    console.log(favorite);
}