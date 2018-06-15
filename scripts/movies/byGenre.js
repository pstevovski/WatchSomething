//API KEY.
const API_KEY = config.API_KEY;
//Run Genres function on page load.
window.onload = function genres(){
    const select = document.getElementById("selected");
    select.addEventListener("change",(e)=>{
        //Show the rating dropdown menu.
        rating.style.display = "block";
        //Reset the page number to 1 after user changes genre.
        pageNum = 1;
        //Set rating at default state.
        rating.selectedIndex = 0;
        sessionStorage.setItem("ratingChange", " ");
        let genreName = document.getElementById("genreName");
        genreName.innerHTML = ": " + e.target.options[e.target.selectedIndex].value;
        //Send the ID of the selected element into sessionStorage.
        sessionStorage.setItem("genre", e.target.options[e.target.selectedIndex].id)
        //API request.
        axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres='+e.target.options[e.target.selectedIndex].id)
            .then((response)=>{
                let movies = response.data.results;
                let output = "";
                for(let i = 0; i < movies.length; i++){
                    output +=`
                    <div class="card">
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
                    </div>
                    `
                }
                let moviesInfo = document.getElementById("movies");
                moviesInfo.innerHTML = output;
                //Display pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
            })
    })
}
//Movie selected function. Takes you to detailed info page.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    location.replace("../movie-page.html");
    return false;
}
//Define page number
let pageNum = 1;
//Click on "PREVIOUS" to go back one page (decrement pageNum)
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
    pageNum--;
    window.scrollTo(0,0)
    genresPage(pageNum);
})
//Click on "NEXT" to go forwards one page (increment pageNum)
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    genresPage(pageNum);
    genreWithRating(pageNum);
})
//Display movies with set genre on page change.
function genresPage(pageNum){
        //Get the selected element ID from the sessionStorage.
        let genre = sessionStorage.getItem("genre");
        axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+pageNum+'&with_genres='+genre)
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
//Runs "genreWithRating" function.
let rating = document.getElementById("rating");
rating.addEventListener("change", (e)=>{
    pageNum = 1;
    let ratingChange = e.target.options[e.target.selectedIndex].id;
    sessionStorage.setItem("ratingChange", ratingChange);
    genreWithRating();
})
//Displays movies with chosen genre and set rating.
function genreWithRating(){
    let genre = sessionStorage.getItem("genre");
    let ratingChange = sessionStorage.getItem("ratingChange");
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres='+genre+'&'+ratingChange+'&with_original_language=en')
        .then((response)=>{
            let movies = response.data.results;
            let output = "";
            for(let i = 0; i < movies.length; i++){
                output +=`
                <div class="card">
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
                </div>
                `;
            }
            let moviesInfo = document.getElementById("movies");
                moviesInfo.innerHTML = output;
                //Display pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
        })
}
//Display the corresponding movies with the set genre and rating on page change.
function genreWithRating(pageNum){
    let genre = sessionStorage.getItem("genre");
    let ratingChange = sessionStorage.getItem("ratingChange");
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+pageNum+'&with_genres='+genre+'&'+ratingChange+'&with_original_language=en')
        .then((response)=>{
            let movies = response.data.results;
            let output = "";
            for(let i = 0; i < movies.length; i++){
                output +=`
                <div class="card">
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
                </div>
                `;
            }
            let moviesInfo = document.getElementById("movies");
                moviesInfo.innerHTML = output;
                //Display pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
        })
}