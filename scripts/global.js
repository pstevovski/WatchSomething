// Define variables.
const navbar = document.querySelector("nav");
const submenu = document.querySelector(".submenu");
const sticky = navbar.offsetTop;
const scrollToTop = document.getElementById("scrollToTop");
// When window scroll reaches pageYOffset >=30, show the "sticky" navbar.
window.onscroll = function scrollFunction(){
	// When window scroll reaches pageYOffset that is higher than 350, show the scrollToTop button.
	if(window.pageYOffset >= 250){
		scrollToTop.classList.add("scrollButtonActive");
	} else {
		scrollToTop.classList.remove("scrollButtonActive");
	}
	
    if(window.pageYOffset >= 30){
		navbar.style.top = "0px"
		navbar.style.boxShadow = "0px 3px 5px rgba(0,0,0,0.1)";
    } else {
		navbar.style.boxShadow = "none";
	}
}

// Burger Menu.
const burger = document.querySelector(".burger");
const slide = document.querySelector(".slide");
let sideMenu = false;
const body = document.querySelector("body");
burger.addEventListener("click", ()=>{
	burger.classList.toggle("active");
	
	// Slide menu.
	slide.classList.toggle("slideIn");
	sideMenu = !sideMenu; // Change the flag variable from "false" to "true" or "true" to "false", to be used in the if statement for hiding/showing the scroll button.

	// Fixate body
	body.classList.toggle("bodyHidden");

	// Hide scroll to top button.
	if(sideMenu) {
		scrollToTop.classList.remove("scrollButtonActive");
	}
});
// Click on DROPDOWN - MOVIES on small screen to display/hide the list.
const smallMovies = document.getElementById("smallScreenMovies");
smallMovies.addEventListener("click", ()=>{
	const moviesDropdown = document.getElementById("moviesDropdown");
	moviesDropdown.classList.toggle("drop");
});
// Click on DROPDOWN - SERIES on small screen to display/hide the list.
const smallSeries = document.getElementById("smallScreenSeries");
smallSeries.addEventListener("click", ()=>{
	const seriesDropdown = document.getElementById("seriesDropdown");
	seriesDropdown.classList.toggle("drop");
});
// Click on DROPDOWN - MY LISTS on small screen to display/hide the list.
const smallLists = document.getElementById("smallScreenList");
smallLists.addEventListener("click", ()=>{
	const smallListsDropdown = document.getElementById("myListsDropdown");
	smallListsDropdown.classList.toggle("drop");
})
// SMOOTH SCROLLING
scrollToTop.addEventListener("click", ()=>{
	window.scroll({
		top: 0,
		left: 0,
		behavior: "smooth"
	});
})
// Modal box and question mark.
let questionMark = document.getElementById("questionMark");
let modal = document.querySelector(".modal");
if(questionMark){
	questionMark.addEventListener("click", ()=>{
		modal.classList.add("modalActive");
	})	
}
const modalGotIt = document.getElementById("modalGotIt");
if(modalGotIt){
	modalGotIt.addEventListener("click", ()=>{
		modal.classList.remove("modalActive");
	})
}
// Close modal with escape key.
document.body.addEventListener("keydown", (e)=>{
	if( e.code === "Escape") {
		modal.classList.remove("modalActive");
	}
})

// Random movie / Random TV Show
const randomMovie = document.querySelector("#randomMovie");
const randomContainer = document.querySelector(".randomContainer");
// If randomMovie element exsists..
if(randomMovie){
	randomMovie.addEventListener("click", ()=>{
	// Run random movie function.
	getRandomMovie();
	})
}
const randomMovieSmall = document.querySelector("#randomMovieSmall");
if(randomMovieSmall){
	randomMovieSmall.addEventListener("click", ()=>{
		// Toggle (off) the burger class and the slide menu class for small screens.
		burger.classList.toggle("active");
		slide.classList.toggle("slideIn");
		body.classList.toggle("bodyHidden");
		// Run the function
		getRandomMovie();
	})
}
function getRandomMovie(){
	// Display the random container.
	randomContainer.style.display = "block";

	// Get a random page for the API search.
	let minPage = 1;
    let maxPage = 20;
    minPage = Math.ceil(minPage);
    maxPage = Math.floor(maxPage);
	let randomPage = Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

	// Get a random page for the response result.
	let minResult = 1;
	let maxResult = 20;
	minResult = Math.ceil(minResult);
	maxResult = Math.floor(maxResult);
	let randomResult = Math.floor(Math.random() * (maxResult - minResult +1)) + minResult;
	
	// Make an api call for a random movie.
	axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+'&language=en-US&page='+randomPage)
		.then( (response) =>{
			const movie = response.data.results[randomResult];
			const output = 
			`<div class="smallCard">
			<h2>${movie.title}</h2>
			<div class="smallMovie">
					<div class="smallCard_img">
						<img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
					<div class="smallMovie_info">
						<p id="p_rating"><strong>Rating:</strong> <span>${movie.vote_average} / 10</span> </p>
						<p><strong>Release date:</strong> <span>${movie.release_date}</span></p>
						<a onclick="movieSelected('${movie.id}')" href="#">Details</a>
						<a class="reloadRandom" href="#" onclick="reloadRandomMovie()"><i class="material-icons">autorenew</i></a>
						<div class="closeSmallCard"><i class="material-icons">close</i></div>
					</div>
			</div>
			</div>`;
			randomContainer.innerHTML = output;
			const closeSmallCard = document.querySelector(".closeSmallCard");
			closeSmallCard.addEventListener("click", ()=> { randomContainer.style.display = "none"});
		})
}
// Details page for the random movie / tv show.
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	window.open("../movie-page.html");
	return false;
}
// Get another random movie.
function reloadRandomMovie(){
	getRandomMovie();
}
// Random movie / Random TV Show
const randomTvShow = document.querySelector("#randomTvShow");

// If randomTvShow element exsist..
if(randomTvShow) {
	randomTvShow.addEventListener("click", ()=>{
	// Run random tv show function.
	getRandomTvShow();
	})
}
// For small screens.
const randomTvShowSmall = document.querySelector("#randomTvShowSmall")
if(randomTvShowSmall){
	randomTvShowSmall.addEventListener("click", ()=>{
		// Toggle (off) the burger class and the slide menu class for small screens.
		burger.classList.toggle("active");
		slide.classList.toggle("slideIn");
		body.classList.toggle("bodyHidden");
		// Run the function.
		getRandomTvShow();
	})
}
function getRandomTvShow(){
	// Display the random container.
	randomContainer.style.display = "block";

	// Get a random page for the API search.
	let minPage = 1;
    let maxPage = 20;
    minPage = Math.ceil(minPage);
    maxPage = Math.floor(maxPage);
	let randomPage = Math.floor(Math.random() * (maxPage - minPage + 1)) + minPage;

	// Get a random page for the response result.
	let minResult = 1;
	let maxResult = 20;
	minResult = Math.ceil(minResult);
	maxResult = Math.floor(maxResult);
	let randomResult = Math.floor(Math.random() * (maxResult - minResult +1)) + minResult;
	axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key="+API_KEY+'&language=en-US&page='+randomPage)
		.then((response)=>{
			console.log(response);
			const show = response.data.results[randomResult];
			const output = 
			`<div class="smallCard">
			<h2>${show.name}</h2>
			<div class="smallMovie">
					<div class="smallCard_img">
						<img src="http://image.tmdb.org/t/p/w185/${show.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
					<div class="smallMovie_info">
						<p id="p_rating"><strong>Rating:</strong> <span>${show.vote_average} / 10</span> </p>
						<p><strong>Release date:</strong> <span>${show.first_air_date}</span></p>
						<a onclick="showSelected('${show.id}')" href="#">Details</a>
						<a class="reloadRandom" href="#" onclick="reloadRandomTvShow()"><i class="material-icons">autorenew</i></a>
						<div class="closeSmallCard"><i class="material-icons">close</i></div>
					</div>
			</div>
			</div>`;
			randomContainer.innerHTML = output;
			const closeSmallCard = document.querySelector(".closeSmallCard");
			closeSmallCard.addEventListener("click", ()=> { randomContainer.style.display = "none"});
		})
}

// Go to detailed info page for the tv show.
function showSelected(id) {
	sessionStorage.setItem("showId", id);
	window.open("../shows-page.html");
	return false;
}

// Get another random tv show.
function reloadRandomTvShow(){
	getRandomTvShow();
}
