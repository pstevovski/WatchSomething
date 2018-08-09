//API KEY.
const API_KEY = config.API_KEY;
//Getting todays date.
let today = new Date().toJSON().slice(0,10);
let day = 1;
//Setting the maximum(end) date. This is not dynamic. Looking for solution.
let endDate = new Date(2019, 4, 17 + 1).toJSON().slice(0,10);

//On page load, run "upcoming()".
window.onload = function upcoming(){
	// Remove the stored date.
	sessionStorage.removeItem("date");

	// Todays date for the sorting movies by release dates.
	const todaysDate = document.getElementById("todaysDate");
	todaysDate.id ="primary_release_date.gte="+today+'&primary_release_date.lte='+endDate
	todaysDate.value = " This month ";
	sessionStorage.setItem("date", todaysDate.id);

	axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page=1&primary_release_date.gte='+today+'&primary_release_date.lte='+endDate+'&with_original_language=en')
        .then ((response)=>{
            let movie = response.data.results;
			let output = ""
			console.log(response)
           	for(let i = 0; i < movie.length; i++){
				let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
				if(favoriteMovies.indexOf(id) === -1){
					output += `
					<div class="card">
						<div class="overlay">
						<div class="addBtn"><span><i class="material-icons queue" onclick="addToList('${movie[i].id}')">add_to_queue</i></span>
						<span><i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
						<div class="movie">
							<h2>${movie[i].title}</h2>
								<p><strong>Rating:</strong> ${movie[i].vote_average}</p>
								<p><strong>First air date:</strong> ${movie[i].release_date}</p>
								<a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
						</div>
						</div>
						<div class="card_img">
							<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
						</div>
					</div>
					`;
				} else {
					output += `
                <div class="card">
                    <div class="overlay">
					<div class="addBtn"><span><i class="material-icons queue" onclick="addToList('${movie[i].id}')">add_to_queue</i></span>
					<span><i id="heart" class="material-icons favoriteMarked" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
					<div class="movie">
						<h2>${movie[i].title}</h2>
                            <p><strong>Rating:</strong> ${movie[i].vote_average}</p>
                            <p><strong>First air date:</strong> ${movie[i].release_date}</p>
                            <a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
                     </div>
                    </div>
                    <div class="card_img">
						<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
				</div>
				`;
				}
            }
            //Append the output to "movies" element.
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
			//Display pages buttons.
            let totalPages = response.data.total_pages;
			let pages = document.querySelector(".pages");
			pages.style.display = "flex";
            if(totalPages < 2){
				pages.style.display = "none";
			} else if (pageNum === 1){
				prev.style.display = "none";
				next.style.display = "block";
			}
        })
}
//Take the user to detailed info page.
function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	location.replace("../movie-page.html");
	return false;
}
//Creates a variable for the page number to make it dynamic.
let pageNum = 1;
//Targets the pages button with "prev" id, and goes backwards one page.
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
	pageNum--;
	window.scrollTo(0,0);
	upcomingPage(pageNum);
	upcomingWithDate(pageNum);
})
//Targets the pages button with "next" id, and goes forwards one page.
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
	pageNum++;
	window.scrollTo(0,0);
	upcomingPage(pageNum);
	upcomingWithDate(pageNum);
})
//Display the movies after the user changed the page by clicking previous/next button.
function upcomingPage(pageNum){
		axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page='+pageNum+'&primary_release_date.gte='+today+'&primary_release_date.lte='+endDate)
		.then( (response) =>{
			console.log(response)
			let movie = response.data.results;
			let output = "";
			console.log(response)
			for(let i = 0; i < movie.length; i++){
				let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
				if(favoriteMovies.indexOf(id) === -1){
					output += `
					<div class="card">
						<div class="overlay">
						<div class="addBtn"><span><i class="material-icons queue" onclick="addToList('${movie[i].id}')">add_to_queue</i></span>
						<span><i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
						<div class="movie">
							<h2>${movie[i].title}</h2>
								<p><strong>Rating:</strong> ${movie[i].vote_average}</p>
								<p><strong>First air date:</strong> ${movie[i].release_date}</p>
								<a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
						</div>
						</div>
						<div class="card_img">
							<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
						</div>
					</div>
					`;
				} else {
					output += `
                <div class="card">
                    <div class="overlay">
					<div class="addBtn"><span><i class="material-icons queue" onclick="addToList('${movie[i].id}')">add_to_queue</i></span>
					<span><i id="heart" class="material-icons favoriteMarked" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
					<div class="movie">
						<h2>${movie[i].title}</h2>
                            <p><strong>Rating:</strong> ${movie[i].vote_average}</p>
                            <p><strong>First air date:</strong> ${movie[i].release_date}</p>
                            <a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
                     </div>
                    </div>
                    <div class="card_img">
						<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
				</div>
				`;
				}
			}
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
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
		.catch( (err) =>{
			console.log(err);
		})
}
//Add movie to watch list.
function addToList(id){
    let storedId = JSON.parse(localStorage.getItem("movies")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("movies", JSON.stringify(storedId));
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
//Add movie to favorite movies.
function favorite(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
	if(storedId.indexOf(id) === -1){
		storedId.push(id);
		localStorage.setItem("favoriteMovies", JSON.stringify(storedId));
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

//Add option to sort upcoming movies by release dates.
let dates = document.getElementById("dates");
dates.addEventListener("change", (e)=>{
	//Add the date next to "Upcoming".
	let theDate = document.getElementById("upcomingDate");
	theDate.innerHTML = " : " + e.target.options[e.target.selectedIndex].value;
	pageNum = 1;
	sessionStorage.setItem("date", e.target.options[e.target.selectedIndex].id);
	//Show reset button.
	reset.style.display = "block";
	upcomingWithDate();
})
//Display upcoming movies with the set date.
function upcomingWithDate(){
	let date = sessionStorage.getItem("date");
	axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page=1&with_original_language=en&'+date)
	.then((response)=>{
		console.log(response);
		let movie = response.data.results;
			let output = "";
			for(let i = 0; i < movie.length; i++){
				let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
				if(favoriteMovies.indexOf(id) === -1){
					output += `
					<div class="card">
						<div class="overlay">
						<div class="addBtn"><span><i class="material-icons queue" onclick="addToList('${movie[i].id}')">add_to_queue</i></span>
						<span><i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
						<div class="movie">
							<h2>${movie[i].title}</h2>
								<p><strong>Rating:</strong> ${movie[i].vote_average}</p>
								<p><strong>First air date:</strong> ${movie[i].release_date}</p>
								<a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
						</div>
						</div>
						<div class="card_img">
							<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
						</div>
					</div>
					`;
				} else {
					output += `
                <div class="card">
                    <div class="overlay">
					<div class="addBtn"><span><i class="material-icons queue" onclick="addToList('${movie[i].id}')">add_to_queue</i></span>
					<span><i id="heart" class="material-icons favoriteMarked" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
					<div class="movie">
						<h2>${movie[i].title}</h2>
                            <p><strong>Rating:</strong> ${movie[i].vote_average}</p>
                            <p><strong>First air date:</strong> ${movie[i].release_date}</p>
                            <a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
                     </div>
                    </div>
                    <div class="card_img">
						<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
				</div>
				`;
				}
				}
				let movieInfo = document.getElementById("movies");
				movieInfo.innerHTML = output;
				//Display pages buttons.
				let totalPages = response.data.total_pages;
				let pages = document.querySelector(".pages");
				pages.style.display = "flex";
				if(totalPages < 2){
					pages.style.display = "none";
				} else if (pageNum === 1){
					prev.style.display = "none";
					next.style.display = "block";
				}
	})
}
//Display upcoming movies with the set date when the user changes the page.
function upcomingWithDate(pageNum){
	let date = sessionStorage.getItem("date");
	axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page='+pageNum+'&with_original_language=en&'+date)
	.then((response)=>{
		console.log(response);
			let movie = response.data.results;
			let output = "";
			for(let i = 0; i < movie.length; i++){
				let id = response.data.results[i].id;
				id = JSON.stringify(id);
				let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
				if(favoriteMovies.indexOf(id) === -1){
					output += `
					<div class="card">
						<div class="overlay">
						<div class="addBtn"><span><i class="material-icons queue" onclick="addToList('${movie[i].id}')">add_to_queue</i></span>
						<span><i class="material-icons favorite" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
						<div class="movie">
							<h2>${movie[i].title}</h2>
								<p><strong>Rating:</strong> ${movie[i].vote_average}</p>
								<p><strong>First air date:</strong> ${movie[i].release_date}</p>
								<a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
						</div>
						</div>
						<div class="card_img">
							<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
						</div>
					</div>
					`;
				} else {
					output += `
                <div class="card">
                    <div class="overlay">
					<div class="addBtn"><span><i class="material-icons queue" onclick="addToList('${movie[i].id}')">add_to_queue</i></span>
					<span><i id="heart" class="material-icons favoriteMarked" onclick="favorite('${movie[i].id}')">favorite</i></span></div>
					<div class="movie">
						<h2>${movie[i].title}</h2>
                            <p><strong>Rating:</strong> ${movie[i].vote_average}</p>
                            <p><strong>First air date:</strong> ${movie[i].release_date}</p>
                            <a onclick="movieSelected('${movie[i].id}')" href="#">Details</a>
                     </div>
                    </div>
                    <div class="card_img">
						<img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
					</div>
				</div>
				`;
				}
				}
			let movieInfo = document.getElementById("movies");
			movieInfo.innerHTML = output;
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
}
//Define the reset button. Reloads the page and clears the session storage from set dates.
let reset = document.getElementById("resetUpcoming");
reset.addEventListener("click",()=>{
	dates.selectedIndex = 0;
	sessionStorage.setItem("date", "");
	location.reload();
})
