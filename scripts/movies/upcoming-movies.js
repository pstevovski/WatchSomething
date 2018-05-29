//Getting today's date.
let today = new Date().toJSON().slice(0,10);
let day = 1;
//Setting the maximum(end) date. This is not dynamic. Looking for solution.
let endDate = new Date(2019, 4, 17 + 1).toJSON().slice(0,10);
console.log(endDate);

window.onload = function upcoming(){
	axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page=1&primary_release_date.gte="+today+'&primary_release_date.lte='+endDate+'&with_original_language=en')
        .then ((response)=>{
			console.log(response);
            let upcoming = response.data.results;
			let output = ""
            $.each(upcoming, (index,movie)=>{
				output += `
				<div class="card">
					<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${movie.id}')"></i></span>
					<span><i class="ion-heart heart" onclick="favorite('${movie.id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
					<div class="card_text">
						<h3>${movie.title}</h3>
						<p>Rating: <strong>${movie.vote_average}</strong></p>
						<p>Release date: <strong>${movie.release_date}</strong></p>
						<a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
					</div>
				</div>
			`;
            })
            //Creates a variable that targets the "movies" element in the HTML
			//that will be used to output the data results to.
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
			//Show the pages buttons after movies are listed.
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
        })
}
//When the user clicks on "Movie Details", it sets the ID of that particular movie into the Session storage,//and changes the current page to the "movie-page.html", listing the info for the movie that matches the id
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	//Stores the ID onto the location, and opens the page's location listed below.
	location.replace("../movie-page.html");
	return false;
}
//Creates a variable for the page number to make it dynamic.
var pageNum = 1;
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
	//Scrolls to top of the window after the butotn is clicked.
	window.scrollTo(0,0);
	search(pageNum);
})
//Showcases the movies after the user changed the page by clicking previous/next button.
function search(pageNum){
		axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page="+pageNum+'&primary_release_date.gte='+today+'&primary_release_date.lte='+endDate)
		.then( (response) =>{
			console.log(response)
			let upcoming = response.data.results;
			let output = "";

			$.each(upcoming, (index,movie)=>{
				output += `
				<div class="card">
					<div class="addBtn"><span><i class="ion-android-add-circle" onclick="addToList('${movie.id}')"></i></span>
					<span><i class="ion-heart heart" onclick="favorite('${movie.id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
					<div class="card_text">
						<h3>${movie.title}</h3>
						<p>Rating: <strong>${movie.vote_average}</strong></p>
						<p>Release date: <strong>${movie.release_date}</strong></p>
						<a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
					</div>
				</div>
				`;
			})
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
		})
		.catch( (err) =>{
			console.log(err);
		})
}
//Add movie to watch list.
function addToList(id){
    let storedId = JSON.parse(localStorage.getItem("movies")) || [];
    storedId.push(id);
    localStorage.setItem("movies", JSON.stringify(storedId));
    console.log(storedId);
}
//Add movie to favorite movies.
function favorite(id){
    let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
    favorite.push(id);
    localStorage.setItem("favorite", JSON.stringify(favorite));
    console.log(favorite);
}