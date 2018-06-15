//API KEY.
const API_KEY = config.API_KEY;
//Define the "selected" element and set it to display none.
let selected = document.getElementById("selected");
selected.style.display = "none";
//Get the form and its inputed value.
const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
    //Display the rating dropdown.
    rating.style.display = "block";
    //Reset the page number to #1.
    pageNum = 1;
    //Reset the rating.
    sessionStorage.setItem("ratingChange", " ");
    rating.selectedIndex = 0;
    let year = document.getElementById("year").value;
    sessionStorage.setItem("year", year);
    //Add the number next to the title.
    let byYear = document.getElementById("byYear");
    byYear.innerHTML = ": "+year;
    //Reset the selected genre.
    selected.style.display = "block";
    selected.selectedIndex = 0;
    sessionStorage.setItem("genre", "");
    //Hide the reset button.
    reset.style.display = "none";
    //Set the page number to 1(default).
    pageNum = 1;
    //Call function.
    discoverMovies(year);
    genres();
    //Prevents default action.
    e.preventDefault();
})
//Display movies from the set year (the argument "year" is given from the form submit).
function discoverMovies(year){
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&page=1&primary_release_year='+year)
        .then((response)=>{
            let movie = response.data.results;
            let output = "";
            for(let i = 0; i < movie.length; i++){
                output +=`
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
            let moviesInfo = document.getElementById("movies");
            moviesInfo.innerHTML = output;
            //Displays the pages buttons (default display:none), after movies are shown.
		    let pages = document.querySelector(".pages");
		    pages.style.display = "flex";
        })
        .catch((err)=>{
            console.log(err);
        })
}
//Add movie to watch list.
function addToList(id){
    let storedId = JSON.parse(localStorage.getItem("movies")) || [];
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
//Take the user to detailed info page.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    location.replace("../movie-page.html");
    return false;
}
//Define pageNum.
let pageNum = 1;
//Click on "PREVIOUS" button to decrement page number.
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
    pageNum--;
    window.scrollTo(0,0);
    discoverMoviesPageLoad(pageNum);
    withRating(pageNum);
})
//Click on "NEXT" button to increment page number.
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    discoverMoviesPageLoad(pageNum);
    withRating(pageNum);
})
//Display movies by year corresponding to the correct page number. 
function discoverMoviesPageLoad(pageNum){
    let year = sessionStorage.getItem("year");
    //Get the genre from the session storage. If theres a genre seleced and stored, it will
    //load the next page with the corresponding genre. If not, it will load the next page
    //as default (only sorted by the year release date).
    let genre = sessionStorage.getItem("genre");
    if (!genre || !genre.length){
        genre = '';
    }
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key='+API_KEY+'&language=en-US&sort_by=popularity.desc&page='+pageNum+'&primary_release_year='+year+'&with_genres='+genre)
    .then((response)=>{
        let movie = response.data.results;
        let output = "";
        for(let i = 0; i < movie.length; i++){
            output +=`
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
        let moviesInfo = document.getElementById("movies");
        moviesInfo.innerHTML = output;
        //Displays the pages buttons (default display:none), after movies are shown.
        let pages = document.querySelector(".pages");
        pages.style.display = "flex";
    })
    .catch((err)=>{
        console.log(err);
    })
}
//Display movies by set year with selected genre.
function genres(){
    let year = sessionStorage.getItem("year");
    const select = document.getElementById("selected");
    select.addEventListener("change", (e)=>{
    let ratingChange = sessionStorage.getItem("ratingChange");
    if (!ratingChange || !ratingChange.length){
        ratingChange = '';
    }
    //Reset the page number to 1.
    pageNum = 1;
    reset.style.display = "block";
    //Set genre to session storage.
    sessionStorage.setItem("genre",e.target.options[e.target.selectedIndex].id);
    //API request.
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + e.target.options[e.target.selectedIndex].id+'&primary_release_year='+year+'&'+ratingChange)
    .then((response) => {
        let movie = response.data.results;
        let output = "";
        for(let i = 0; i < movie.length; i++){
            output +=`
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
        let moviesInfo = document.getElementById("movies");
        moviesInfo.innerHTML = output;
    })
 })
}
//Define the "reset" button. Reloads "discoverMovies(year)" and clears sessionStorage from rating and genre. 
let reset = document.getElementById("reset");
reset.style.display = "none";
reset.addEventListener("click", ()=>{
    sessionStorage.setItem("genre", "");
    let year = document.getElementById("year").value;
    let selected = document.getElementById("selected");
    selected.selectedIndex = 0;
    rating.selectedIndex = 0;
    sessionStorage.setItem("ratingChange", "");
    discoverMovies(year);
    reset.style.display = "none";
})
//When page loads, clear the genre and rating from session storage.
window.onload = function resetGenre(){
    sessionStorage.setItem("genre", "");
    sessionStorage.setItem("ratingChange", "");
}
//Define the rating element and on change, run the "withRating()" function.
let rating = document.getElementById("rating");
rating.addEventListener("change", (e)=>{
    pageNum = 1;
    let ratingChange = e.target.options[e.target.selectedIndex].id;
    sessionStorage.setItem("ratingChange", ratingChange);
    withRating();
});
//Sort movies by rating with included genre & year.
function withRating(){
    let genre = sessionStorage.getItem("genre");
    let year = sessionStorage.getItem("year");
    let ratingChange = sessionStorage.getItem("ratingChange");
    if (!genre || !genre.length){
        genre = '';
    }
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&page=1&primary_release_year='+year+'&with_genres='+genre+'&'+ratingChange+'&with_original_language=en')
        .then((response)=>{
            let movies = response.data.results;
            let output = "";

            for(let i = 0; i < movies.length; i++){
                output += `<div class="card">
                <div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${movies[i].id}')"></i></span>
                <span><i class="ion-heart heart" onclick="favorite('${movies[i].id}')"></i></span></div>
                <div class="card_img">
                    <img src="http://image.tmdb.org/t/p/w300/${movies[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
                <div class="card_text">
                    <h3>${movies[i].title}</h3>
                    <p>Rating: <strong>${movies[i].vote_average}</strong></p>
                    <p>Release date: <strong>${movies[i].release_date}</strong></p>
                    <a onclick="movieSelected('${movies[i].id}')" class="btn" href="#"> Movie Details </a>
                </div>
            </div>`;
            }
            let moviesInfo = document.getElementById("movies");
            moviesInfo.innerHTML = output;
        })
}
//Sort movies by rating with included genre & year corresponding to the page number(after page number changes).
function withRating(pageNum){
    let genre = sessionStorage.getItem("genre");
    let year = sessionStorage.getItem("year");
    let ratingChange = sessionStorage.getItem("ratingChange");
    if (!genre || !genre.length){
        genre = '';
    }
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&page='+pageNum+'&primary_release_year='+year+'&with_genres='+genre+'&'+ratingChange+'&with_original_language=en')
        .then((response)=>{
            let movies = response.data.results;
            let output = "";
            for(let i = 0; i < movies.length; i++){
                output += `<div class="card">
                <div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${movies[i].id}')"></i></span>
                <span><i class="ion-heart heart" onclick="favorite('${movies[i].id}')"></i></span></div>
                <div class="card_img">
                    <img src="http://image.tmdb.org/t/p/w300/${movies[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
                <div class="card_text">
                    <h3>${movies[i].title}</h3>
                    <p>Rating: <strong>${movies[i].vote_average}</strong></p>
                    <p>Release date: <strong>${movies[i].release_date}</strong></p>
                    <a onclick="movieSelected('${movies[i].id}')" class="btn" href="#"> Movie Details </a>
                </div>
            </div>`;
            }
            let moviesInfo = document.getElementById("movies");
            moviesInfo.innerHTML = output;
        })
}