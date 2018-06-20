//API KEY.
const API_KEY = config.API_KEY;
//Spinner
const spinner = document.querySelector(".spinner");
spinner.style.display = "none";
const container = document.querySelector(".showcase");
container.style.display = "none"
//Pages
const pages = document.querySelector(".pages");
pages.style.display = "none";
//When window is loaded, it runs the function getMovies(), which lists the current popular movies by grabing the API from themoviedb.com.
window.onload = function getMovies(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "flex";
		pages.style.display = "flex";
	}, 1000);
	//Get the API.
	axios.get("https://api.themoviedb.org/3/movie/popular?api_key="+API_KEY+'&language=en-US&page=1')
		.then ((response)=>{
			console.log(response);
			let movie = response.data.results;
			let output = "";
			//Appends to the output the info for each fetched result.
			for(let i = 0; i < movie.length; i++){
				output += `
				<div class="card">
					<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${movie[i].id}')"></i></span>
					<span><i class="ion-heart heart" onclick="favorite('${movie[i].id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
					<div class="card_text">
						<h3>${movie[i].title}</h3>
						<p>Rating: <strong>${movie[i].vote_average}</strong></p>
						<p>Release date: <strong>${movie[i].release_date}</strong></p>
						<a onclick="movieSelected('${movie[i].id}')" class="btn" href="#"> Movie Details </a>
					</div>
				</div>
				`;
			}
			//Creates a variable that targets the "movies" element in the HTML
			//that will be used to output the data results to.
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
		})
		//If theres an error, it logs it in the console.
		.catch ((err)=>{
			console.log(err);
		})
}
//When the user clicks on "Movie Details", it sets the ID of that particular movie into the Session storage,//and changes the current page to the "movie-page.html", listing the info for the movie that matches the id.
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	location.replace("../movie-page.html");
	return false;
}
//Creates a variable for the page number to make it dynamic.
let pageNum = 1;
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
//Displays the movies after the user changed the page by clicking previous/next button.
function search(pageNum){
	axios.get("https://api.themoviedb.org/3/movie/popular?api_key="+API_KEY+'&language=en-US&page='+pageNum)
		.then((response)=>{
			console.log(response);
			let movie = response.data.results;
			let output = "";

			for(let i = 0; i < movie.length; i++){
				output += `
				<div class="card">
					<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${movie[i].id}')"></i></span>
					<span><i class="ion-heart heart" onclick="favorite('${movie[i].id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
					<div class="card_text">
						<h3>${movie[i].title}</h3>
						<p>Rating: <strong>${movie[i].vote_average}</strong></p>
						<p>Release date: <strong>${movie[i].release_date}</strong></p>
						<a onclick="movieSelected('${movie[i].id}')" class="btn" href="#"> Movie Details </a>
					</div>
				</div>
				`;
			}
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
			//Show the pages buttons after movies are listed.
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
		})
		.catch ((err)=>{
			console.log(err);
		})
}
//Add movie to watch list.
function addToList(id){
	const storedId = JSON.parse(localStorage.getItem("movies")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("movies", JSON.stringify(storedId));

		//Notification that it will be added to Watchlist.
        const added = document.getElementById("added");
        added.innerHTML = "Added to watchlist !"
        added.classList.add("added");
        setTimeout(() => {
            added.classList.remove("added");
        }, 1500);
	} else {
		//Notification that it has already been added to the watchlist.
        const alreadyStored = document.getElementById("alreadyStored");
        alreadyStored.innerHTML = "Already in watchlist !"
        alreadyStored.classList.add("alreadyStored");
        setTimeout(() => {
            alreadyStored.classList.remove("alreadyStored");
        }, 1500);
	}
}
//Add movie to favorite movies.
function favorite(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("favoriteMovies", JSON.stringify(storedId));
		//Notification that it will be added to Watchlist.
        const added = document.getElementById("added");
        added.innerHTML = "Added to Favorites !";
        added.classList.add("added");
        setTimeout(() => {
            added.classList.remove("added");
        }, 1500);
	} else {
		//Notification that it has already been added to the watchlist.
		const alreadyStored = document.getElementById("alreadyStored");
        alreadyStored.innerHTML = "Already in favorites !";
        alreadyStored.classList.add("alreadyStored");
        setTimeout(() => {
            alreadyStored.classList.remove("alreadyStored");
        }, 1500);
	}
}