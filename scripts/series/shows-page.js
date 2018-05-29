//Spinner.
const spinner = document.querySelector(".spinner");
spinner.style.display = "none";
const container = document.querySelector(".container");
container.style.display = "none";
//Gets the tv show ID stored in the Session storage and uses it to display information about
//the tv show that has that ID.
function getShowInfo(){
	spinner.style.display = "block";
	setTimeout(() => {
		spinner.style.display = "none";
		container.style.display = "block";
	}, 1000);
	const showId = sessionStorage.getItem("showId");
	//Defines requests to the API as variable, so they can be used as part of Promise.all, to target
	//mulitple requests at once.
	const seriesPromise = axios.get("https://api.themoviedb.org/3/tv/"+showId+'?api_key=fa155f635119344d33fcb84fb807649b&language=en-US');
	const imdbPromise = axios.get("https://api.themoviedb.org/3/tv/"+showId+'/external_ids?api_key=fa155f635119344d33fcb84fb807649b&language=en-US');
	const seriesCast = axios.get("https://api.themoviedb.org/3/tv/"+showId+'/credits?api_key=fa155f635119344d33fcb84fb807649b&language=en-US')
	//Uses the Promise.all to target multiple requests to the API, uses the defined variables as
	//link holders.
	Promise.all([seriesPromise, imdbPromise, seriesCast])
		.then( ([seriesResponse, imdbResponse]) =>{
			const series = seriesResponse.data;
			const imdb_id = imdbResponse.data.imdb_id;
			const genres = seriesResponse.data.genres;
			//Grab the popularity parameter from the data and rounds it to a whole number%.
			popularity = seriesResponse.data.popularity;
			popularity = Math.floor(popularity);
			console.log(seriesResponse)
			let output = `
			<div class="moviePage">
					<div class="poster"><img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"></div>
					<div class="info">
						<h2>${series.name}</h2>
						<ul>
							<li><strong>Genres:</strong> `;
							for(let i = 0; i < genres.length; i++){
								if ( i != genres.length -1){
									output += `${genres[i].name}, `;
								} else {
									output += `${genres[i].name}.`;
								}
							}
							output += `</li>
							<li><strong>Episode runtime:</strong> ${series.episode_run_time[0]}min. </li>
							<li><strong>Frist air date:</strong> ${series.first_air_date}.</li>
							<li><strong>Networks:</strong> ${series.networks[0].name}.</li>
							<li><strong>Popularity:</strong> ${popularity} %.</li>
							<li><strong>Number of episodes:</strong> ${series.number_of_episodes}.</li>
							<li><strong>Number of seasons:</strong> ${series.number_of_seasons}.</li>
							<li><strong>Status:</strong> ${series.status}.</li>
							<li><strong>Type: </strong>${series.type}.</li>
						</ul>

						<div class="buttons">
							<a href="https://www.imdb.com/title/${imdb_id}"target="_blank"> IMDB Link </a>
							<a href="#" onclick="openTrailer()"> Trailer </a>
							<a href="https://www.titlovi.com/titlovi/?prijevod=${series.name}" target="_blank"> Subtitle </a>
							<a href="https://www.thepiratebay.org/search/${series.name}" target="_blank"> Pirate bay </a>
							<a href="javascript:history.back()"> Go back </a>
						</div>
					</div>
				</div>
				<div class="plot">
					<h3>Plot: </h3>
					<p>${series.overview}</p>
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
		//Another API call, if there's cast info about the tv show.
		Promise.all([seriesPromise, imdbPromise, seriesCast])
		.then( ([seriesResponse, imdbResponse, seriesCastResponse]) =>{
			const series = seriesResponse.data;
			const imdb_id = imdbResponse.data.imdb_id;
			const cast = seriesCastResponse.data.cast;
			const genres = seriesResponse.data.genres;
			cast.length = 5;
			//Grab the popularity parameter from the data and rounds it to a whole number%.
			popularity = seriesResponse.data.popularity;
			popularity = Math.floor(popularity);
			console.log(seriesResponse)
			let i = 0;
			let output = `
			<div class="moviePage">
					<div class="poster"><img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"></div>
					<div class="info">
						<h2>${series.name}</h2>
						<ul>
							<li><strong>Cast:</strong>`;
							for( i; i < cast.length; i++){
								if ( i != cast.length - 1){
									output += `${cast[i].name},`
								} else {
									output += `${cast[i].name}.`
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
							<li><strong>Episode runtime:</strong> ${series.episode_run_time[0]}min. </li>
							<li><strong>Frist air date:</strong> ${series.first_air_date}.</li>
							<li><strong>Networks:</strong> ${series.networks[0].name}.</li>
							<li><strong>Popularity:</strong> ${popularity} %.</li>
							<li><strong>Number of episodes:</strong> ${series.number_of_episodes}.</li>
							<li><strong>Number of seasons:</strong> ${series.number_of_seasons}.</li>
							<li><strong>Status:</strong> ${series.status}.</li>
							<li><strong>Type: </strong>${series.type}.</li>
						</ul>

						<div class="buttons">
							<a href="https://www.imdb.com/title/${imdb_id}"target="_blank"> IMDB Link </a>
							<a href="#" onclick="openTrailer()"> Trailer </a>
							<a href="https://www.titlovi.com/titlovi/?prijevod=${series.name}" target="_blank"> Subtitle </a>
							<a href="https://www.thepiratebay.org/search/${series.name}" target="_blank"> Pirate bay </a>
							<a href="javascript:history.back()"> Go back </a>
						</div>
					</div>
				</div>
				<div class="plot">
					<h3>Plot: </h3>
					<p>${series.overview}</p>
				</div>
				`;
			//Creates a variable that targets the "movie" element in the HTML
			//that will be used to output the data results to.
			let info = document.getElementById("movie");
			info.innerHTML = output;
		})
		//Gets the trailer link from youtube. Video is hidden until users click on TRAILER
		//button.
		axios.get("https://api.themoviedb.org/3/tv/"+showId+'/videos?api_key=fa155f635119344d33fcb84fb807649b&language=en-US')
			.then ((response)=>{
				//Targets the first item in the results Array, that hold the "key" parameter.
				let trailer = response.data.results[0].key;
				let output = `
					<div class="video">
					<iframe width="620" height="400" src="https://www.youtube.com/embed/${response.data.results[0].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					<span id="close">X</span>
					</div>
				`;
				//Creates a variable that targets the "trailer" element in the HTML
				//that will be used to output the trailer to.
				let video = document.getElementById("trailer");
				video.innerHTML = output;
			})
			//If there is an error, it logs the error in the console.
			.catch ((err)=>{
				console.log(err);
			})		
		//Show similar tv shows to the one that is currently open.
		axios.get("https://api.themoviedb.org/3/tv/"+showId+'/similar?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page=1')
			.then ((response)=>{
				let series = response.data.results;
				//Makes the series parameter dynamic, and sets the length of it to 5 (5 similar movies will
				//be shown.)
				series.length = Math.min(series.length, 5);
				console.log(series);
				let output = "";

				$.each(series, (index,series)=>{
					output += `
					<div class="recommended_card">
						<img src="http://image.tmdb.org/t/p/w200/${series.poster_path}">
						<h4>${series.name}</h4>
						<p>Rating: <strong>${series.vote_average} IMDB</strong></p>
						<p>Release date: <strong>${series.first_air_date}</strong></p>
						<a onclick="showSelected('${series.id}')" class="buttons" href="#"> Show Details </a>
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
//When the user clicks on "Show Details" link in the similar movies, it gets the ID from the similar 
//tv shows, below the information about the current movie, and sets it in the session storage, so it can be //accsesed, and showcased.
function showSelected(id){
	sessionStorage.setItem("showId", id);
	location.replace("shows-page.html");
	return false;
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
	//Get the X (close) button to work, and to remove the trailer from screen
	let close = document.getElementById("close");
	close.addEventListener("click", ()=>{
		video.style.display = "none";
		overlay.style.display = "none";
		body.style.position = "relative";
	})
}
//Page number.
let pageNum = 1;
//Previous page for recommended.
let prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
	pageNum--;
	recommendedPage(pageNum);
})
//Next page for recommended.
let next = document.getElementById("next");
next.addEventListener("click", ()=>{
	pageNum++;
	recommendedPage(pageNum);
})
//Recommended page change.
function recommendedPage(pageNum){
	const showId = sessionStorage.getItem("showId");

	axios.get("https://api.themoviedb.org/3/tv/"+showId+'/similar?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&page='+pageNum)
			.then ((response)=>{
				let series = response.data.results;
				//Makes the series parameter dynamic, and sets the length of it to 5 (5 similar movies will
				//be shown.)
				series.length = Math.min(series.length, 5);
				console.log(series);
				let output = "";

				$.each(series, (index,series)=>{
					output += `
					<div class="recommended_card">
						<img src="http://image.tmdb.org/t/p/w200/${series.poster_path}">
						<h4>${series.name}</h4>
						<p>Rating: <strong>${series.vote_average} IMDB</strong></p>
						<p>Release date: <strong>${series.first_air_date}</strong></p>
						<a onclick="showSelected('${series.id}')" class="buttons" href="#"> Show Details </a>
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