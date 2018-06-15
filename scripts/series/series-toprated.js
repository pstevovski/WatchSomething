//API KEY.
const API_KEY = config.API_KEY;
//Spinner
const spinner = document.querySelector(".spinner");
spinner.style.display = "none";
const container = document.querySelector(".showcase");
container.style.display = "none"
//Run "getSeries" function on page load.
window.onload = function getSeries(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "flex";
	}, 1000);
	//Get the API.
	axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key="+API_KEY+'&language=en-US&page=1')
		.then ((response)=>{
			//Fetches the data - > results from the API.
			console.log(response);
			let series = response.data.results;
			let output = "";
			//Appends to the output the info for each fetched result.
			for(let i = 0; i < series.length; i++){
				output += `
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
			}
			//Appends the "output" to the movies element.
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;
			//Show pages after load
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
		})
		//If theres an error, it logs it in the console.
		.catch ((err)=>{
			console.log(err);
		});
}
//Takes the user to detailed tv shows info page.
function showSelected(id){
	sessionStorage.setItem("showId", id);
	location.replace("../shows-page.html");
	return false;
}
//Define page number.
let pageNum = 1;
//Targets the pages button with "prev" id, and goes backwards one page.
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
	pageNum--;
	window.scrollTo(0,0);
	search(pageNum);
})
//Targets the pages button with "next" id, and goes forwards one page.
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
	pageNum++;
	window.scrollTo(0,0);
	search(pageNum);
})
//Displays the tv shows after the user changed the page by clicking previous/next button.
function search(pageNum){
	axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key="+API_KEY+'&language=en-US&page='+pageNum)
		.then((response)=>{
			let series = response.data.results;
			let output = "";
			for(let i = 0; i < series.length; i++){
				output += `            
				<div class="card">
				<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${series[i].id}')"></i></span>
				<span><i class="ion-heart heart" onclick="favorite('${series[i].id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${series[i].poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
					</div>
					<div class="card_text">
						<h3>${series[i].name}</h3>
						<p>Rating: <strong>${series[i].vote_average}</strong></p>
						<p>First air date: <strong>${series[i].first_air_date}</strong></p>
						<a onclick="showSelected('${series[i].id}')" class="btn" href="#"> Show Details </a>
					</div>
           	 	</div>
				`;
			}
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;
			//Show the pages buttons after content is loaded
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
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