// API KEY.
const API_KEY = config.API_KEY;
//Hide the select  genres.
let selectedGenres = document.getElementById("selectedGenres");
selectedGenres.style.display = "none";

//Get the value from the form on submit and then run the functions.
const form = document.getElementById("form");

// Object.freeze makes the object read-only, defending it from "hacky" activities. 
const genresObject = Object.freeze({
    "ACTION": 10759,
    "ADVENTURE": 10759,
    "ANIMATION": 16,
    "COMEDY": 35,
    "CRIME": 80,
    "DOCUMENTARY":99,
    "DRAMA": 18,
    "FAMILY": 10751,
    "KIDS": 10762,
    "MYSTERY":9648,
    "NEWS": 10763,
    "REALITY": 10764,
    "SCIFI": 10765,
    "FANTASY": 10765,
    "SOAP": 10766,
    "TALK":10767,
    "WAR": 10768,
    "POLITICS": 10768,
    "WESTERN": 37,
})
form.addEventListener("submit", (e)=>{
    let input = document.getElementById("inputField").value;
    let searchedFor = document.getElementById("searchedFor");

    // IF THE INPUT VALUE MATCHES A GENRE FROM THE SET GENRES:
    if(genresObject[input.trim().toUpperCase(input)]){
        pageNum = 1;
        const id = genresObject[input.trim().toUpperCase(input)];
        searchedFor.innerHTML = "Genre: " + "<span>" +input+ "</span>";
        genres(id);
    } else if (isNaN(input)){
        // IF THE INPUT VALUE IS A STRING:
        pageNum = 1;
        searchedFor.innerHTML = "Title: " +"<span>" +input+ "</span>"
        showByTitle(input);
    } else {
        // IF THE INPUT VALUE IS A NUMBER:
        pageNum = 1;
        searchedFor.innerHTML = "Year: " +"<span>" +input+ "</span>"
        showsByYear(input);
    }

    e.preventDefault();
})

function genres(id){
    selectedGenres.style.display = "none";

    // Hide the genre select drop down menu.
    selectedGenres.style.display = "none";
    pageNum = 1;
    sessionStorage.setItem("tvShowGenre", id);

    //API request.
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres='+id+'&include_null_first_air_dates=false')
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
            let shows = document.getElementById("movies");
            shows.innerHTML = output;

            //Display the pages buttons.
            let pages = document.querySelector(".pages");
            let totalPages = response.data.total_pages;

            if(totalPages < 2){
                pages.style.display = "none"
            } else {
                pages.style.display = "flex";
            }
        })
}
function showByTitle(input){
    selectedGenres.style.display = "none";
    sessionStorage.setItem("tvShowsTitle", input);
    pageNum = 1;

    axios.get("https://api.themoviedb.org/3/search/tv?query="+input+'&api_key='+API_KEY+'&language=en-US&page='+pageNum)
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
            let shows = document.getElementById("movies");
            shows.innerHTML = output;

            //Display the pages buttons.
            let pages = document.querySelector(".pages");
            let totalPages = response.data.total_pages;

            if(totalPages < 2){
                pages.style.display = "none"
            } else {
                pages.style.display = "flex";
            }
        })
}
function showsByYear(year){
    pageNum = 1;
    selectedGenres.style.display = "block";
    sessionStorage.setItem("tvShowYear", year);
    sessionStorage.removeItem("tvShowByYearGenre");
    selectedGenres.selectedIndex = 0;
    pageNum = 1;

    axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&first_air_date_year='+year+'&page=1&include_null_first_air_dates=false')
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
            let shows = document.getElementById("movies");
            shows.innerHTML = output;

            //Display the pages buttons.
            let pages = document.querySelector(".pages");
            let totalPages = response.data.total_pages;

            if(totalPages < 2){
                pages.style.display = "none"
            } else {
                pages.style.display = "flex";
            }

            // TV SHOW BY YEAR WITH GENRES:
            selectedGenres.addEventListener("change", (e)=>{
                pageNum = 1;
                const selectedGenre = e.target.options[e.target.selectedIndex].id;
                sessionStorage.setItem("tvShowByYearGenre", selectedGenre);
                
                axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&first_air_date_year='+year+'&page=1&include_null_first_air_dates=false&with_genres='+selectedGenre)
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
                    let shows = document.getElementById("movies");
                    shows.innerHTML = output;

                    //Display the pages buttons.
                    let pages = document.querySelector(".pages");
                    let totalPages = response.data.total_pages;

                    if(totalPages < 2){
                        pages.style.display = "none"
                    } else {
                        pages.style.display = "flex";
                    }
            })
        })
    })
}

let pageNum = 1;
// PREVIOUS PAGE
document.getElementById("prev").addEventListener("click", ()=>{
    let input = document.getElementById("inputField").value;
    pageNum--;
    window.scrollTo(0,0)
    
    // IF SEARCHED FOR A GENRE:
    if(genresObject[input.trim().toUpperCase(input)]){
        showsByGenrePage(pageNum);
    } 
    // IF SEARCHED BY TITLE:
    else if (isNaN(input)){
        showsByTitlePage(pageNum);
    } 
    // IF SEARCHED FOR A YEAR:
    else {
        showsByYearPage(pageNum);
    }
})
// NEXT PAGE
document.getElementById("next").addEventListener("click", ()=>{
    let input = document.getElementById("inputField").value;
    pageNum++;
    window.scrollTo(0,0);

    // IF SEARCHED FOR A GENRE:
    if(genresObject[input.trim().toUpperCase(input)]){
        showsByGenrePage(pageNum);
    } 
    // IF SEARCHED BY TITLE:
    else if (isNaN(input)){
        showsByTitlePage(pageNum);
    } 
    // IF SEARCHED FOR A YEAR:
    else {
        showsByYearPage(pageNum);
    }
})

function showsByGenrePage(pageNum){
    let id = sessionStorage.getItem("tvShowGenre");

    //API request.
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&page='+pageNum+'&timezone=America%2FNew_York&with_genres='+id+'&include_null_first_air_dates=false')
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
            let shows = document.getElementById("movies");
            shows.innerHTML = output;

            //Display the pages buttons.
            let pages = document.querySelector(".pages");
            let totalPages = response.data.total_pages;

            if(pageNum === totalPages){
                pages.style.display = "none"
            } else {
                pages.style.display = "flex";
            }
        })
}
function showsByTitlePage(pageNum){
    let title = sessionStorage.getItem("tvShowsTitle");

    axios.get("https://api.themoviedb.org/3/search/tv?query="+title+'&api_key='+API_KEY+'&language=en-US&page='+pageNum)
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
            let shows = document.getElementById("movies");
            shows.innerHTML = output;

            //Display the pages buttons.
            let pages = document.querySelector(".pages");
            let totalPages = response.data.total_pages;

            if(pageNum === totalPages){
                pages.style.display = "none"
            } else {
                pages.style.display = "flex";
            }
        })
}
function showsByYearPage(pageNum){
    let year = sessionStorage.getItem("tvShowYear");
    let genre = sessionStorage.getItem("tvShowByYearGenre")
    if(!genre || !genre.length){
        genre = "";
    }

    axios.get("https://api.themoviedb.org/3/discover/tv?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&first_air_date_year='+year+'&page='+pageNum+'&include_null_first_air_dates=false&with_genres='+genre)
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
            let shows = document.getElementById("movies");
            shows.innerHTML = output;

            //Display the pages buttons.
            let pages = document.querySelector(".pages");
            let totalPages = response.data.total_pages;

            if(pageNum === totalPages){
                pages.style.display = "none"
            } else {
                pages.style.display = "flex";
            }
        })
}

//Takes the user to detailed tv show info page.
function showSelected(id){
    sessionStorage.setItem("showId", id);
    window.open("../shows-page.html");
    return false;
}

//Add series to watch list.
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

// Clear genres.
window.onload = function clearSessionStorage(){
    sessionStorage.removeItem("tvShowByYearGenre");
}