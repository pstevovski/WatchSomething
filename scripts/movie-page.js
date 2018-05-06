//Spinner.
const spinner = document.querySelector(".spinner");
spinner.style.display = "none";
const container = document.querySelector(".container");
container.style.display = "none";
//Gets the movie ID stored in the Session storage and uses it to display information about
//the movie that has that ID.
function getMovie(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "block";
	}, 1000);
	
	let movieId = sessionStorage.getItem("movieId");

	axios.get("https://api.themoviedb.org/3/movie/"+movieId+'?api_key=fa155f635119344d33fcb84fb807649b&language=en-US')
		.then( (response) =>{
			console.log(response);
			let movie = response.data;
			//Grab the popularity parameter from the data and rounds it to a whole number%.
			popularity = response.data.popularity;
			popularity = Math.floor(popularity)
			//Revenue - dynamically make it format itself into a standard looking currency.
			let revenue = response.data.revenue;
			revenue = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(revenue);
			let output = `
				<div class="moviePage">
					<div class="poster"><img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}"></div>
					<div class="info">
						<h2>${movie.title}</h2>
						<ul>
							<li><strong>Genres:</strong> ${movie.genres[0].name}</li>
							<li><strong>Tagline:</strong> ${movie.tagline} </li>
							<li><strong>Release Date:</strong> ${movie.release_date}</li>
							<li><strong>Runtime:</strong> ${movie.runtime} (min)</li>
							<li><strong>Popularity:</strong> ${popularity} %</li>
							<li><strong>Revenue:</strong> ${revenue}</li>
							<li><strong>Status:</strong> ${movie.status}</li>
							<li><strong>Production companies:</strong> ${movie.production_companies[0].name}</li>
						</ul>

						<div class="buttons">
							<a href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank"> IMDB Link </a>
							<a href="#" onclick="openTrailer()"> Trailer </a>
							<a href="https://www.titlovi.com/titlovi/?prijevod=${movie.title}" target="_blank"> Subtitle </a>
							<a href="https://www.thepiratebay.org/search/${movie.title}" target="_blank"> Pirate bay </a>
							<a href="javascript:history.back()"> Go back </a>
						</div>
					</div>
				</div>
				<div class="plot">
					<h3>Plot: </h3>
					<p>${movie.overview}</p>
				</div>
			`;
			//Creates a variable that targets the "movie" element in the HTML
			//that will be used to output the data results to.
			let info = document.getElementById("movie");
			info.innerHTML = output;
		})
		//If there is an error, it logs the error in the console.
		.catch ((err)=>{
			console.log(err);
		});
		//Gets the trailer link from youtube. Video is hidden until users click on TRAILER
		//button.
		axios.get("https://api.themoviedb.org/3/movie/"+movieId+'/videos?api_key=fa155f635119344d33fcb84fb807649b&language=en-US')
			.then((response)=>{
				console.log(response);
				//Targets the first item in the results Array, that hold the "key" parameter.
				let trailer = response.data.results[0].key;
				let output = `
					<div class="video">
					<iframe width="620" height="400" src="https://www.youtube.com/embed/${response.data.results[0].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					<span id="close"><i class="ion-close-circled"></i></span>
					</div>`;
				//Creates a variable that targets the "trailer" element in the HTML
				//that will be used to output the trailer to.
				let video = document.getElementById("trailer");
				video.innerHTML = output;
			})
			//If there is an error, it logs the error in the console.
			.catch ((err)=>{
				console.log(err);
			});
		//Gets similar movies from the API, to the current one that is open.
		axios.get("https://api.themoviedb.org/3/movie/"+movieId+'/similar?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page=1')
			.then ((response)=>{
				console.log(response);
				//Makes the movie parameter dynamic, and sets the length of it to 5 (5 similar movies will
				//be shown.)
				let movie = response.data.results;
				movie.length = Math.min(movie.length, 5);
				let output = "";
				$.each(movie, (index, movie)=> {
					output += `
					<div class="recommended_card">
						<img src="http://image.tmdb.org/t/p/w200/${movie.poster_path}">
						<h4>${movie.title}</h4>
						<p>Rating: <strong>${movie.vote_average} IMDB</strong></p>
						<p>Release date: <strong>${movie.release_date}</strong></p>
						<a onclick="movieSelected('${movie.id}')" class="buttons" href="#"> Movie Details </a>
					</div>
					`;
				})
				//Creates a variable that targets the "recommended" element in the HTML
				//that will be used to output the data results to.
				let recommended = document.getElementById("recommended");
				recommended.innerHTML = output;
			})
			//If there is an error, it logs it in the console.
			.catch ((err)=>{
				console.log(err);
			})
}
//On click on "TRAILER" button, it sets the trailer(video) to be displayed as flex(default:none), dims the
//background by tackling the overlay which sets it to block(default:none), and fixes the body position so //it stays at one place.
function openTrailer(){
	let video = document.getElementById("trailer");
	let overlay = document.getElementById("overlay");
	let body = document.body;
	video.style.display = "flex";
	overlay.style.display = "block";
	body.style.position = "fixed";
	//Get the close button on the video and when clicked turn trailer display into display none.
	const close = document.getElementById("close");
	close.addEventListener("click", ()=>{
	let body = document.body;
	let video = document.getElementById("trailer");
		video.style.display = "none";
		overlay.style.display = "none";
		body.style.position = "relative";
	})
}
//When the user clicks on "Movie Details" link in the similar movies, it gets the ID from the similar //movies, below the information about the current movie, and sets it in the session storage, so it can be //accsesed, and showcased.
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	location.replace("movie-page.html");
	return false;
}
//Burger menu.
const burger = document.querySelector(".burger");
const slide = document.querySelector(".slide");
burger.addEventListener("click", ()=>{
	burger.classList.toggle("active");
	//Slide menu.
	slide.classList.toggle("slideIn");
});
//Click on DROPDOWN - MOVIES on small screen to display/hide the list.
const smallMovies = document.getElementById("smallScreenMovies");
smallMovies.addEventListener("click", ()=>{
	const moviesDropdown = document.getElementById("moviesDropdown");
	moviesDropdown.classList.toggle("drop");
});
//Click on DROPDOWN - SERIES on small screen to display/hide the list.
const smallSeries = document.getElementById("smallScreenSeries");
smallSeries.addEventListener("click", ()=>{
	const seriesDropdown = document.getElementById("seriesDropdown");
	seriesDropdown.classList.toggle("drop");
});