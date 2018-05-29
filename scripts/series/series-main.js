//SCRIPT FILE FOR ON AIR SERIES (series-latest.html).

//Spinner
const spinner = document.querySelector(".spinner");
spinner.style.display = "none";
const container = document.querySelector(".showcase");
container.style.display = "none"
//When window is loaded, it runs the function getSeries(), which lists the on air tv shows by
//grabing the API from themoviedb.com.
window.onload = function getSeries(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "flex";
	}, 1000);
	//Get the API.
	axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page=1")
		.then((response)=>{
			//Fetches the data - > results from the API.
			console.log(response)
			let series = response.data.results;
			let output = "";
			//Appends to the output the info for each fetched result.
			$.each(series, (index, series) =>{
				output += `
				<div class="card">
					<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${series.id}')"></i></span>
					<span><i class="ion-heart heart" onclick="favorite('${series.id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
					</div>
					<div class="card_text">
						<h3>${series.name}</h3>
						<p>Rating: <strong>${series.vote_average}</strong></p>
						<p>First air date: <strong>${series.first_air_date}</strong></p>
						<a onclick="showSelected('${series.id}')" class="btn" href="#"> Show Details </a>
					</div>
           		</div>
				`;
			})
			//Creates a variable that targets the "movies" element in the HTML
			//that will be used to output the data results to.
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;
			//Show pages buttons.
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
		})
		//If theres an error, it logs it in the console.
		.catch ((err)=>{
			console.log(err);
		})
}
//showSelected function (stores ID into session storage so it can be accessed by the shows-page and list
//info about the show).
function showSelected(id){
	sessionStorage.setItem("showId", id);
	location.replace("../shows-page.html");
	return false;
}
//Creates a variable for the page number to make it dynamic.
var pageNum = 1;
//Targets the pages button with "prev" id, and goes backwards one page.
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
	//Decrements the page number by 1.
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
//Showcases the tv shows after the user changed the page by clicking previous/next button.
function search(pageNum){
	axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page="+pageNum)
		.then((response)=>{
			console.log(response)
			let series = response.data.results;
			let output = "";

			$.each(series, (index, series) =>{
				output += `
				<div class="card">
					<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${series.id}')"></i></span>
					<span><i class="ion-heart heart" onclick="favorite('${series.id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
					</div>
					<div class="card_text">
						<h3>${series.name}</h3>
						<p>Rating: <strong>${series.vote_average}</strong></p>
						<p>First air date: <strong>${series.first_air_date}</strong></p>
						<a onclick="showSelected('${series.id}')" class="btn" href="#"> Show Details </a>
					</div>
            	</div>
				`;
			})
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
		})
		.catch ((err)=>{
			console.log(err);
		})
}
//Add series to "series to watch" list.
function addToList(id){
	let toWatch = JSON.parse(localStorage.getItem("series")) || [];
	toWatch.push(id);
	localStorage.setItem("series", JSON.stringify(toWatch));
	console.log(toWatch);
}
//Add favorite series to "favorite series" list.
function favorite(id){
	let favorite = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
	favorite.push(id);
	localStorage.setItem("favoriteSeries", JSON.stringify(favorite));
	console.log(favorite);
}