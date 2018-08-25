//API KEY.
const API_KEY = config.API_KEY;

//Spinner
const spinner = document.querySelector(".spinner");
const container = document.querySelector(".showcase");
spinner.style.display = "none";
container.style.display = "none"

//Pages
const pages = document.querySelector(".pages");
pages.style.display = "none";

//Run "getSeries" function on page load.
window.onload = function getSeries(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "flex";
		pages.style.display = "flex";
	}, 1000);

	//Get the API.
	axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key="+API_KEY+'&language=en-US&page=1')
		.then((response)=>{
			let series = response.data.results;
			let output = "";
			//Appends to the output the info for each fetched result.
			for(let i = 0; i < series.length; i++){
				let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
				if(favoriteSeries.indexOf(id) === -1){
					output += `
					<div class="card">
						<div class="overlay">
						<div class="addBtn"><span><i class="material-icons watch" onclick="addToList('${series[i].id}')">visibility</i></span>
						<span><i class="material-icons favorite" onclick="favorite('${series[i].id}')">favorite</i></span></div>
						<div class="movie">
							<h2>${series[i].name}</h2>
                                <p id="p_rating"><strong>Rating:</strong> <span>${series[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
								<p><strong>First air date:</strong> <span>${series[i].first_air_date} <i class="material-icons date">date_range</i> </span></p>
								<a onclick="showSelected('${series[i].id}')" href="#">Details</a>
						</div>
						</div>
						<div class="card_img">
							<img src="http://image.tmdb.org/t/p/w400/${series[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
						</div>
					</div>
					`;
				} else {
					output += `
					<div class="card">
					<div class="overlay">
					<div class="addBtn"><span><i class="material-icons watch" onclick="addToList('${series[i].id}')">visibility</i></span>
					<span><i class="material-icons favorite" onclick="favorite('${series[i].id}')">favorite</i></span></div>
					<div class="movie">
						<h2>${series[i].name}</h2>
							<p id="p_rating"><strong>Rating:</strong> <span>${series[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
							<p><strong>First air date:</strong> <span>${series[i].first_air_date} <i class="material-icons date">date_range</i> </span></p>
							<a onclick="showSelected('${series[i].id}')" href="#">Details</a>
					</div>
					</div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w400/${series[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
				</div>
				`;
				}
			}

			//Append the "output" to the movies element.
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;
			
			//Display pages buttons.
            let totalPages = response.data.total_pages;
			let pages = document.querySelector(".pages");
            if(totalPages < 2){
				pages.style.display = "none";
			} else if (pageNum === 1){
				prev.style.display = "none";
				next.style.display = "block";
			}
		})
		//If theres an error, it logs it in the console.
		.catch ((err)=>{
			console.log(err);
		})
}

//Take the user to detailed tv show info page.
function showSelected(id){
	sessionStorage.setItem("showId", id);
	window.open("../shows-page.html");
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
	axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key="+API_KEY+'&language=en-US&page='+pageNum)
		.then((response)=>{
			let series = response.data.results;
			let output = "";
			for(let i = 0; i < series.length; i++){
				let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
				if(favoriteSeries.indexOf(id) === -1){
					output += `
					<div class="card">
						<div class="overlay">
						<div class="addBtn"><span><i class="material-icons watch" onclick="addToList('${series[i].id}')">visibility</i></span>
						<span><i class="material-icons favorite" onclick="favorite('${series[i].id}')">favorite</i></span></div>
						<div class="movie">
							<h2>${series[i].name}</h2>
                                <p id="p_rating"><strong>Rating:</strong> <span>${series[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
								<p><strong>First air date:</strong> <span>${series[i].first_air_date} <i class="material-icons date">date_range</i> </span></p>
								<a onclick="showSelected('${series[i].id}')" href="#">Details</a>
						</div>
						</div>
						<div class="card_img">
							<img src="http://image.tmdb.org/t/p/w400/${series[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
						</div>
					</div>
					`;
				} else {
					output += `
					<div class="card">
					<div class="overlay">
					<div class="addBtn"><span><i class="material-icons watch" onclick="addToList('${series[i].id}')">visibility</i></span>
					<span><i class="material-icons favorite" onclick="favorite('${series[i].id}')">favorite</i></span></div>
					<div class="movie">
						<h2>${series[i].name}</h2>
							<p id="p_rating"><strong>Rating:</strong> <span>${series[i].vote_average} / 10  <i class="material-icons star">star_rate</i></span> </p>
							<p><strong>First air date:</strong> <span>${series[i].first_air_date} <i class="material-icons date">date_range</i> </span></p>
							<a onclick="showSelected('${series[i].id}')" href="#">Details</a>
					</div>
					</div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w400/${series[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
				</div>
				`;
				}
			}
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;

			//Show the pages buttons after movies are listed.
			let totalPages = response.data.total_pages;
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";

            if(pageNum >= 2){
				prev.style.display = "block";
			} else if ( pageNum === totalPages){
				next.style.display = "none";
			} else if ( pageNum === 1) {
				prev.style.display = "none";
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