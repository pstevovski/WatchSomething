//API KEY.
const API_KEY = config.API_KEY;
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

	const movieInfo = axios.get("https://api.themoviedb.org/3/movie/"+movieId+'?api_key='+API_KEY+'&language=en-US');
	const movieCast = axios.get("https://api.themoviedb.org/3/movie/"+movieId+'/credits?api_key='+API_KEY)
	Promise.all([movieInfo, movieCast])
		.then( ([movieInfoResponse, movieCastResponse]) =>{
			console.log(movieInfoResponse, movieCastResponse);
			const movie = movieInfoResponse.data;
			const cast = movieCastResponse.data.cast;
			const genres = movieInfoResponse.data.genres;
			cast.length = 5;
			let i = 0;
			//Grab the popularity parameter from the data and rounds it to a whole number%.
			popularity = movieInfoResponse.data.popularity;
			popularity = Math.floor(popularity)
			//Revenue - dynamically make it format itself into a standard looking currency.
			let revenue = movieInfoResponse.data.revenue;
			revenue = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(revenue);
			let output = `
		<div class="moviePage">
			<div class="poster"><img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}"></div>
			<div class="info">
				<h2>${movie.title}</h2>
				<ul>
					<li><strong>Cast:</strong> `;
					for (let i = 0; i < cast.length; i++) {
						if (i != cast.length - 1) {
							output += `${cast[i].name}, `;
						} else {
							output += `${cast[i].name}.`;
						}
					}
					output += `</li>
					<li><strong>Genres:</strong> `;
					for(let i = 0; i < genres.length; i++){
						if ( i != genres.length -1){
							output += `${genres[i].name}, `;
						} else {
							output += `${genres[i].name}.`;
						}
					}
					output += `</li>
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
					<a id="addToWatchList" onclick="addToList('${movie.id}')"> Add to watchlist </a>
					<a href="javascript:history.back()"> Go back </a>
				</div>
			</div>
		</div>
		<div class="plot">
			<h3>Plot: </h3>
			<p>${movie.overview}</p>
		</div>`;

		//Targets the "movie" element and appends the output to it.
		const info = document.getElementById("movie");
		info.innerHTML = output;
		})
		//If there is an error, show this.
		.catch ((err)=>{
			let output = "";
			output += `<h1 id="errorTitle">SORRY !</h1>
			<p id="errorText">We could not provide informations about this movie at this particular moment. Be sure to come back again. Thank you for your understanding. </p>
			<div class="buttons errorBack">
				<a href="javascript:history.back()"> Go back </a>
			</div>`;
			let info = document.getElementById("movie");
			info.innerHTML = output;
			let rec_title = document.getElementById("rec_title");
			rec_title.style.display = 'none';
			let page = document.querySelector(".page");
			page.style.display = "none";
			const recommended = document.getElementById("recommended");
			recommended.style.display = "none";
		});

		//Gets the trailer link from youtube.
		axios.get("https://api.themoviedb.org/3/movie/"+movieId+'/videos?api_key='+API_KEY+'&language=en-US')
			.then((response)=>{
				let trailer = response.data.results[0].key;
				let output = `
					<div class="video">
					<iframe width="620" height="400" src="https://www.youtube.com/embed/${response.data.results[0].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					<div id="close">Close </div>
					</div>`;

			//Target the trailer element in which the video will be shown.
			let video = document.getElementById("trailer");
			video.innerHTML = output;
			})

			.catch ((err)=>{
				let rec_title = document.getElementById("rec_title");
				rec_title.style.display = 'none';
				let page = document.querySelector(".page");
				page.style.display = "none";
			});

		//Gets similar movies to the current one.
		axios.get("https://api.themoviedb.org/3/movie/"+movieId+'/similar?api_key='+API_KEY+'&language=en-US&page=1')
			.then ((response)=>{
				const movie = response.data.results;
				//Set the movie length (output) to 5.
				movie.length = Math.min(movie.length, 5);
				let output = "";
				for(let i = 0; i < movie.length; i++){
					output += `
					<div class="recommended_card">
						<img src="http://image.tmdb.org/t/p/w200/${movie[i].poster_path}">
						<h4>${movie[i].title}</h4>
						<p>IMDB Rating: <strong>${movie[i].vote_average}</strong></p>
						<a onclick="movieSelected('${movie[i].id}')" class="buttons" href="#"> Movie Details </a>
					</div>
					`;
				}
				//Target "recommended" and output the similar movies into it.
				let recommended = document.getElementById("recommended");
				recommended.innerHTML = output;
			})
			//If there is an error, it logs it in the console.
			.catch ((err)=>{
				console.log(err);
			})
}

//Open trailer for the current movie.
function openTrailer(){
	const video = document.getElementById("trailer");
	const overlay = document.getElementById("overlay");
	const body = document.body;
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
//Page number.
let pageNum = 1;
//Previous page for recommended.
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
	pageNum--;
	recommendedPage(pageNum);
})
//Next page for recommended.
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
	pageNum++;
	recommendedPage(pageNum);
})
//Recommended page change.
function recommendedPage(pageNum){
	let movieId = sessionStorage.getItem("movieId");
	axios.get("https://api.themoviedb.org/3/movie/"+movieId+'/similar?api_key='+API_KEY+'&language=en-US&page='+pageNum)
	.then ((response)=>{
				let movie = response.data.results;
				movie.length = Math.min(movie.length, 5);
				let output = "";
				for(let i = 0; i < movie.length; i++) {
					output += `
					<div class="recommended_card">
						<img src="http://image.tmdb.org/t/p/w200/${movie[i].poster_path}">
						<h4>${movie[i].title}</h4>
						<p>IMDB Rating : <strong>${movie[i].vote_average}</strong></p>
						<a onclick="movieSelected('${movie[i].id}')" class="buttons" href="#"> Movie Details </a>
					</div>
					`;
				}
				let recommended = document.getElementById("recommended");
				recommended.innerHTML = output;
			})
	//If there is an error, it logs it in the console.
	.catch ((err)=>{
		console.log(err);
	})
}

//Add to watchlist.
function addToList(id){
	let storedId = JSON.parse(localStorage.getItem("movies")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("movies", JSON.stringify(storedId));

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