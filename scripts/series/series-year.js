//API KEY.
const API_KEY = config.API_KEY;
let selected = document.getElementById("selected");
selected.style.display = "none";
//Define the reset button and hide it.
let reset = document.getElementById("reset");
reset.style.display = "none";
//Get the input from the form on submit and run function.
const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
    //Set page number to #1.
    pageNum = 1;
    let year = document.getElementById("year").value;
    let byYear = document.getElementById("byYear");
    byYear.innerHTML = ": "+year;
    selected.style.display = "block";
    //Reset session storage for year and genre.
    sessionStorage.setItem("year", year);
    sessionStorage.setItem("genre", " ");
    selected.selectedIndex = 0;
    //Hide the reset button.
    reset.style.display = "none";
    discoverShows(year);
    genres();
    e.preventDefault();
})
//Get the "year" from the form submit and display movies with the set year.
function discoverShows(year){
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&first_air_date_year='+year+'&page=1&include_null_first_air_dates=false')
        .then((response)=>{
            let series = response.data.results;
            let output = "";
            for(let i = 0; i < series.length; i++){
                output +=`
                <div class="card">
                    <div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${series[i].id}')"></i></span>
                    <span><i class="ion-heart heart" onclick="favorite('${series[i].id}')"></i></span></div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w300/${series[i].poster_path}"  onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    </div>
                    <div class="card_text">
                        <h3>${series[i].name}</h3>
                        <p>Rating: <strong>${series[i].vote_average}</strong></p>
                        <p>First air date: <strong>${series[i].first_air_date}</strong></p>
                        <a onclick="showsSelected('${series[i].id}')" class="btn" href="#"> Show Details </a>
                    </div>
                </div>
                `;
                let showsInfo = document.getElementById("movies");
                showsInfo.innerHTML = output;
                //Display the pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
            }
        })
        .catch ((err)=>{
            console.log(err);
        })
}
//Takes the user to detailed tv show info page.
function showsSelected(id){
    sessionStorage.setItem("showId", id);
    location.replace("../shows-page.html");
    return false;
}
//Define the page number.
let pageNum = 1;
//Click on "PREVIOUS" to go backwards one page (decrement pageNum).
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
    pageNum--;
    window.scrollTo(0,0);
    discoverShowsPage(pageNum);
})
//Click on "NEXT" to go forwards one page (increment pageNum).
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    discoverShowsPage(pageNum);
})
//Showcase tv shows corresponding to the page number.
function discoverShowsPage(pageNum){
    let year = sessionStorage.getItem("year");
    let genre = sessionStorage.getItem("genre");
    if(!genre || !genre.length){
        genre = '';
    }
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&first_air_date_year='+year+'&page='+pageNum+'&include_null_first_air_dates=false&with_genres='+genre)
        .then((response)=>{
            let shows = response.data.results;
            let output = "";
            for(let i = 0; i < series.length; i++){
                output +=`
                <div class="card">
                    <div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${series[i].id}')"></i></span>
                    <span><i class="ion-heart heart" onclick="favorite('${series[i].id}')"></i></span></div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w300/${series[i].poster_path}"  onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    </div>
                    <div class="card_text">
                        <h3>${series[i].name}</h3>
                        <p>Rating: <strong>${series[i].vote_average}</strong></p>
                        <p>First air date: <strong>${series[i].first_air_date}</strong></p>
                        <a onclick="showsSelected('${series[i].id}')" class="btn" href="#"> Show Details </a>
                    </div>
                </div>
                `;
                let showsInfo = document.getElementById("movies");
                showsInfo.innerHTML = output;
                //Display the pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
            }
        })
        .catch ((err)=>{
            console.log(err);
        })
}
//Display tv shows in set year with set genres.
function genres(){
    //Set page number to #1.
    pageNum = 1;
    let year = sessionStorage.getItem("year");
    const select = document.getElementById("selected");
    select.addEventListener("change", (e)=>{

        sessionStorage.setItem("genre",e.target.options[e.target.selectedIndex].id);
        reset.style.display = "block";
        axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&first_air_date_year='+year+'&with_genres=' + e.target.options[e.target.selectedIndex].id+'&page=1&include_null_first_air_dates=false&')
        .then((response)=>{
            let shows = response.data.results;
            let output = "";
            for(let i = 0; i < series.length; i++){
                output +=`
                <div class="card">
                    <div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${[i].id}')"></i></span>
                    <span><i class="ion-heart heart" onclick="favorite('${series[i].id}')"></i></span></div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w300/${series[i].poster_path}"  onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    </div>
                    <div class="card_text">
                        <h3>${series[i].name}</h3>
                        <p>Rating: <strong>${series[i].vote_average}</strong></p>
                        <p>First air date: <strong>${series[i].first_air_date}</strong></p>
                        <a onclick="showsSelected('${series[i].id}')" class="btn" href="#"> Show Details </a>
                    </div>
                </div>
                `;
                let showsInfo = document.getElementById("movies");
                showsInfo.innerHTML = output;
                //Display the pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
            }
        })
        .catch ((err)=>{
            console.log(err);
        })
    })
}
//Reset the session storage for genre, hide the reset button and run "discoverShows(year)" function again.
reset.addEventListener("click", ()=>{
    sessionStorage.setItem("genre", "");
    let year = document.getElementById("year").value;
    let selected = document.getElementById("selected");
    selected.selectedIndex = 0;
    discoverShows(year);
    reset.style.display = "none";
})
//On page load, reset the session storage genre.
window.onload = function resetGenre(){
    sessionStorage.setItem("genre", "");
}
//Add series to watch list.
function addToList(id){
    let storedId = JSON.parse(localStorage.getItem("series")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("series", JSON.stringify(storedId));
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
//Add tv show to favorite tv shows.
function favorite(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("favoriteSeries", JSON.stringify(storedId));

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