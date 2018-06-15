//API KEY.
const API_KEY = config.API_KEY;
//Run "Genres" function on page load.
window.onload = function genres(){
    const select = document.getElementById("selected");
    select.addEventListener("change", (e)=>{
        //Reset the page number to #1.
        pageNum = 1;
        let genreName = document.getElementById("genreName");
        genreName.innerHTML = ": " + e.target.options[e.target.selectedIndex].value;
        sessionStorage.setItem("genre",e.target.options[e.target.selectedIndex].id)

        //API request.
        axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres='+e.target.options[e.target.selectedIndex].id+'&include_null_first_air_dates=false')
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
                        <a onclick="showSelected('${series[i].id}')" class="btn" href="#"> Show Details </a>
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
//Take the user to detailed tv show info page.
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
    genres(pageNum);
})
//Click on "NEXT" to go forwards one page (increment pageNum).
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    genres(pageNum);
})
//Display series with selected genre corresponding the page change.
function genres(pageNum){
    let genre = sessionStorage.getItem("genre");

    //API request.
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&page='+pageNum+'&timezone=America%2FNew_York&with_genres='+genre+'&include_null_first_air_dates=false')
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
                    <a onclick="showSelected('${series[i].id}')" class="btn" href="#"> Show Details </a>
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
//Add tv show to watch list.
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