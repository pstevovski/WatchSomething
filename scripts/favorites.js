//API KEY
const API_KEY = config.API_KEY;

// OUTPUT FOR MOVIES.
let movieOutput = document.getElementById("movies");
// OUTPUT FOR TV SHOWS.
let  tvShowsOutput = document.getElementById("tvShows");

const removeAllMovies = document.getElementById("removeAllMovies");
const removeAllTvShows = document.getElementById("removeAllTvShows");
// DISPLAY WATCHLISTS ON PAGE LOAD.
window.onload = function displayWatchlist(){
    // MOVIES
    let toWatch = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    for(let i = 0; i < toWatch.length; i++){
        axios.get("https://api.themoviedb.org/3/movie/"+toWatch[i]+'?api_key='+API_KEY+'&language=en-US')
        .then((response)=>{
            let movie = response.data;
            movieOutput.innerHTML +=
             `<div class="card">
             <div class="overlay">
             <div class="addBtn"><span><i class="material-icons trash" onclick="movieSplice('${movie.id}')">delete_forever</i></span></div>
             <div class="movie">
                 <h2>${movie.title}</h2>
                 <p id="p_rating"><strong>Rating:</strong> <span>${movie.vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
                 <p><strong>First air date:</strong> <span>${movie.release_date} <i class="material-icons date">date_range</i> </span></p>
                 <a onclick="movieSelected('${movie.id}')" href="#">Details</a>
              </div>
             </div>
             <div class="card_img">
                 <img src="http://image.tmdb.org/t/p/w400/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
             </div>
         </div>`;
        })
        //Display "Clear List" button.
        removeAllMovies.style.display = "block";
    }
    if(toWatch.length == 0) {
        // SHOW A MESSAGE IF THERE ARE NO MOVIES IN THE LIST.
        movieOutput.innerHTML +=
        `<p class="infoText"> There are no favorite movies. Go watch some. <a href="#" onclick="openRecommendMoviesBox()"> Here are some recommendations !</a> </p>`;
    }
    // TV SHOWS
    let toWatchTvShows = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
    for(let i = 0; i < toWatchTvShows.length; i++){
        axios.get("https://api.themoviedb.org/3/tv/"+toWatchTvShows[i]+'?api_key='+API_KEY+'&language=en-US')
            .then((response)=>{
                let series = response.data;
                tvShowsOutput.innerHTML +=
                `<div class="card">
                <div class="overlay">
                <div class="addBtn"><span><i class="material-icons trash" onclick="seriesSplice('${series.id}')">delete_forever</i></span></div>
                <div class="movie">
                    <h2>${series.name}</h2>
                    <p id="p_rating"><strong>Rating:</strong> <span>${series.vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
                    <p><strong>First air date:</strong> <span>${series.first_air_date} <i class="material-icons date">date_range</i> </span></p>
                    <a onclick="showSelected('${series.id}')" href="#">Details</a>
                 </div>
                </div>
                <div class="card_img">
                    <img src="http://image.tmdb.org/t/p/w400/${series.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
            </div>`;
            })
            //Display "Clear List" button.
            removeAllTvShows.style.display = "block";
    }
    if(toWatchTvShows == 0){
        // SHOW A MESSAGE IF THERE ARE NO MOVIES IN THE LIST.
        tvShowsOutput.innerHTML +=
        `<p class="infoText"> There are no favorite tv shows. Go watch some. <a href="#" onclick="openRecommendTvShowsBox()"> Here are some recommendations !</a> </p>`;
    }
}
// Recommend movies
const recommendedBox = document.querySelector(".recommendedBox");
function openRecommendMoviesBox(){
    document.getElementById("recommendedTitle").innerHTML = `Recommended Movies: <span class="reload"><i class="material-icons refresh" onclick="reloadRecommendedMovies()">autorenew</i></span>`;
    recommendedBox.classList.add("recommendedBoxActive");
    recommendMovies();
}
function recommendMovies(){
    // Get random year on each call, between 1990 - current year.
    let minYear = 1990;
    let maxYear = (new Date()).getFullYear();
    minYear = Math.ceil(minYear);
    maxYear = Math.floor(maxYear);
    let recommendedYear = Math.floor(Math.random() * (maxYear-minYear + 1)) + minYear;

    // Get random page on each call.
    let minPage = 1;
    let maxPage = 5;
    minPage = Math.ceil(minPage);
    maxPage = Math.floor(maxPage);
    let recommendedPage = Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+recommendedPage+'&primary_release_year='+recommendedYear)
        .then((response)=>{
            console.log(response)
            let movie = response.data.results;
            movie.length = 4;
            let output = "";
            for(let i = 0; i < movie.length; i++) {
                output +=
                `<div class="recommended_card" onclick="movieSelected(${movie[i].id})">
                <div class="recommendedOverlay">
                    <div class="recommendedInfo">
                        <h2>${movie[i].title}</h2>
                        <p>Rating: ${movie[i].vote_average} / 10 </p>
                        <p>Release date: ${movie[i].release_date}</p>
                    </div>
                </div>
                <div class="recommended_cardImg">
                    <img src="http://image.tmdb.org/t/p/w154/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
                </div>`;
            }
            let recOutput = document.getElementById("recommendedOutput");
            recOutput.innerHTML = output;
        })
}
// Recommend tv shows.
function openRecommendTvShowsBox(){
    document.getElementById("recommendedTitle").innerHTML = `Recommended TV Shows: <span class="reload"><i class="material-icons refresh" onclick="reloadRecommendedTvShows()">autorenew</i></span>`;
    recommendedBox.classList.add("recommendedBoxActive");    
    recommendTvShows();
}
function recommendTvShows(){
    // Get random year on each call, between 2000 - current year.
    let minYear = 2000;
    let maxYear = (new Date()).getFullYear();
    minYear = Math.ceil(minYear);
    maxYear = Math.floor(maxYear);
    let recommendedYear = Math.floor(Math.random() * (maxYear-minYear + 1)) + minYear;

    // Get random page on each call.
    let minPage = 1;
    let maxPage = 5;
    minPage = Math.ceil(minPage);
    maxPage = Math.floor(maxPage);
    let recommendedPage = Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

    axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&first_air_date_year='+recommendedYear+'&page='+recommendedPage+'&include_null_first_air_dates=false')
        .then((response)=>{
            console.log(response)
            let series = response.data.results;
            series.length = 4;
            let output = "";
            for(let i = 0; i < series.length; i++) {
                output +=
                `<div class="recommended_card" onclick="movieSelected(${series[i].id})">
                <div class="recommendedOverlay">
                    <div class="recommendedInfo">
                        <h2>${series[i].name}</h2>
                        <p>Rating: ${series[i].vote_average} / 10 </p>
                        <p>Release date: ${series[i].first_air_date}</p>
                    </div>
                </div>
                <div class="recommended_cardImg">
                    <img src="http://image.tmdb.org/t/p/w154/${series[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
                </div>`;
            }
            let recOutput = document.getElementById("recommendedOutput");
            recOutput.innerHTML = output;
        })
        .catch((err)=>{
            console.log(err);
        })
}

// Close recommended box.
document.getElementById("closeRecommended").addEventListener("click", ()=>{
    recommendedBox.classList.remove("recommendedBoxActive");    
})
//Delete movie from the movie watchlist.
  function movieSplice(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteMovies")) ||  [];
    let index = storedId.indexOf(id);
    storedId.splice(index, 1);
    localStorage.setItem("favoriteMovies", JSON.stringify(storedId));

    //Notification that a movie was removed from watchlist.
    const removedWatchlist = document.getElementById("alreadyStored");
    removedWatchlist.innerHTML = "Removed from watchlist !";
    removedWatchlist.classList.add("alreadyStored");
    setTimeout(() => {
        added.classList.remove("alreadyStored");
        location.reload();
    }, 1500);
}

// Delete a tv show from the watchlist.
function seriesSplice(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
    let index = storedId.indexOf(id);
    storedId.splice(index, 1);
    localStorage.setItem("favoriteSeries", JSON.stringify(storedId));
    
    //Notification that a tv shows was removed from watchlist.
    const removedWatchlist = document.getElementById("alreadyStored");
    removedWatchlist.innerHTML = "Removed from watchlist !";
    removedWatchlist.classList.add("alreadyStored");
    setTimeout(() => {
        added.classList.remove("alreadyStored");
        location.reload();
    }, 1500);
}

//Takes you to detailed movie info page.
function movieSelected(id){
    sessionStorage.setItem("movieId",id);
    window.open("movie-page.html");
    return false;
}
// Takes you to detailed tv show info page.
function showSelected(id){
    sessionStorage.setItem("showId", id);
    window.open("shows-page.html");
    return false;
}

// SLIDER FOR RECOMMENED OUTPUT
let isDown = false;
let startX;
let scrollLeft;
const recommendedOutput = document.getElementById("recommendedOutput");
recommendedOutput.addEventListener("mousedown", (e)=>{
    isDown = true;
    startX = e.pageX - recommendedOutput.offsetLeft;
    scrollLeft = recommendedOutput.scrollLeft;
    e.preventDefault();
    console.log(startX);
})
recommendedOutput.addEventListener("mouseup", ()=>{
    isDown = false;
})
recommendedOutput.addEventListener("mouseenter", ()=>{
    recommendedOutput.classList.add("active");
})
recommendedOutput.addEventListener("mouseleave", (e)=>{
    recommendedOutput.classList.remove("active");
    isDown = false;
})
recommendedOutput.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - recommendedOutput.offsetLeft;
    const walk = x - startX;
    recommendedOutput.scrollLeft = scrollLeft - walk;
})

// Remove all movies.
removeAllMovies.addEventListener("click", ()=>{
    localStorage.removeItem("favoriteMovies");

    //Notification that all movies are removed from watchlist.
    const removedAll = document.getElementById("alreadyStored");
    removedAll.innerHTML = "Removed all movies!";
    removedAll.classList.add("alreadyStored");
    setTimeout(() => {
        added.classList.remove("alreadyStored");
        location.reload();
    }, 1500);
})
// Remove all tv shows.
removeAllTvShows.addEventListener("click", ()=>{
    localStorage.removeItem("favoriteSeries");
    
    //Notification that all tv shows are removed from watchlist.
    const removedAll = document.getElementById("alreadyStored");
    removedAll.innerHTML = "Removed all tv shows!";
    removedAll.classList.add("alreadyStored");
    setTimeout(() => {
        added.classList.remove("alreadyStored");
        location.reload();
    }, 1500);
})

// Escape key closes down the recommended movies / tv shows box.
document.body.addEventListener("keydown", (e)=>{
    if ( e.code === "Escape") {
        recommendedBox.classList.remove("recommendedBoxActive");
    }
})

// Reload recommended movies
function reloadRecommendedMovies(){
    recommendMovies();
}
// Reload recommended TV Shows
function reloadRecommendedTvShows(){
    recommendTvShows();
}