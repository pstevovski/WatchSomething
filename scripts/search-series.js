//Get the FORM and the INPUTED VALUE in it.
const spinner = document.querySelector(".spinner");
spinner.style.display = "none";
const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
	var searchText = document.getElementById("searchText").value;
	//Reset the page number to page = 1.
	pageNum = 1;
	//Call function.
	searchSeries(searchText);
	//Show the spinner and set a timeout to it.
	spinner.style.display = "block";
	const container = document.querySelector(".showcase");
	container.style.display = "none"
	setTimeout(() => {
		container.style.display = "flex";
		spinner.style.display = "none";
	}, 1000);
	//Prevent the default action of the FORM
	e.preventDefault();
})
//Get the API data and output it on screen, using the searchText(inputed value in the form & submited on //enter), that lists the movies matching the input 
function searchSeries(searchText){
	axios.get("https://api.themoviedb.org/3/search/tv?query="+searchText+'&api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page='+pageNum)
		.then((response)=>{
			//Fetches the data - > results from the API.
			console.log(response);
			let series = response.data.results;
			let output = "";
			//Appends to the output the info for each fetched result.
			$.each(series, (index, series)=>{
				output += `
				<div class="card">
						<img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
						<h3>${series.name}</h3>
						<p>Rating: <strong>${series.vote_average}</strong></p>
						<p>First air date: <strong>${series.first_air_date}</strong></p>
						<a onclick="showSelected('${series.id}')" class="btn" href="#"> Show Details </a>
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
//showSelected function (store ID into session storage so it can be accessed by the shows-page and list
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
	var searchText = document.getElementById("searchText").value;
	axios.get("https://api.themoviedb.org/3/search/tv?query="+searchText+'&api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page='+pageNum)
		.then((response)=>{
			console.log(response);
			let series = response.data.results;
			let output = "";

			$.each(series, (index, series)=>{
				output += `
				<div class="card">
						<img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
						<h3>${series.name}</h3>
						<p>Rating: <strong>${series.vote_average}</strong></p>
						<p>First air date: <strong>${series.first_air_date}</strong></p>
						<a onclick="showSelected('${series.id}')" class="btn" href="#"> Show Details </a>
					</div>
				`;
			})
			//Creates a variable that targets the "movies" element in the HTML
			//that will be used to output the data results to.
			let seriesInfo = document.getElementById("movies");
			seriesInfo.innerHTML = output;
			//Show pages buttons
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
		})
		.catch ((err)=>{
			console.log(err);
		})
}