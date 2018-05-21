let selected = document.getElementById("selected");
selected.style.display = "none";
//Get the form and its inputed value.
const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
    let year = document.getElementById("year").value;
    //Add the number next to the title.
    let byYear = document.getElementById("byYear");
    byYear.innerHTML = ": "+year;
    //Genres
    selected.style.display = "block";
    sessionStorage.setItem("year", year);
    selected.selectedIndex = 0;
    sessionStorage.setItem("genre", "");
    //Hide the reset button.
    reset.style.display = "none";
    //Page number (default).
    pageNum = 1;
    //Call function.
    discoverMovies(year);
    genres();
    //Prevents default action.
    e.preventDefault();
})

function discoverMovies(year){
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&page=1&primary_release_year="+year)
        .then((response)=>{
            console.log(response)
            let yearly = response.data.results;
            let output = "";
            $.each(yearly, (index, movie)=>{
                output +=`
				<div class="card">
				        <div class="addBtn"><span><i class="ion-plus-circled" onclick="addToList('${movie.id}')"></i></span></div>
					<div class="card_img">
						<img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
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
            let moviesInfo = document.getElementById("movies");
            moviesInfo.innerHTML = output;
            //Displays the pages buttons (default display:none), after movies are shown.
		    let pages = document.querySelector(".pages");
		    pages.style.display = "flex";
        })
        .catch((err)=>{
            console.log(err);
        })
}
//Koga ke stisnam na '+', treba da go zeme Id-to na filmot/serijata, da go stavi vo localStorage. Koga ke otidam na stranata "My Lists", treba da mozam da napravam/uredam/izbrisasm lista(i). Koga ke ja otvoram lista "x", treba da gi zemam Id od localStorage sto odgovaraat na taa lista, i da gi prikazam.
//Add to list
function addToList(id){
    let movieList = [];
    movieList.push(id);
    console.log(movieList)
}
//Set the movie Id into session storage.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    location.replace("../movie-page.html");
    return false;
}
//Define pageNum.
let pageNum = 1;
//Click on "PREVIOUS" button to decrement page number.
const prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
    pageNum--;
    window.scrollTo(0,0);
    discoverMoviesPageLoad(pageNum);
})
//Click on "NEXT" button to increment page number.
const next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    discoverMoviesPageLoad(pageNum);
})
//Showcase movies by year corresponding to the correct page number. 
function discoverMoviesPageLoad(pageNum){
    let year = sessionStorage.getItem("year");
    //Get the genre from the session storage. If theres a genre seleced and stored, it will
    //load the next page with the corresponding genre. If not, it will load the next page
    //as default (only sorted by the year release date).
    let genre = sessionStorage.getItem("genre");
    if (!genre || !genre.length){
        genre = '';
    }
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&page='+pageNum+'&primary_release_year='+year+'&with_genres='+genre)
    .then((response)=>{
        console.log(response)
        let yearly = response.data.results;
        let output = "";

        $.each(yearly, (index, movie)=>{
            output +=`
            <div class="card">
                <div class="addBtn"><span><i class="ion-plus-circled"></i></span></div>
                <div class="card_img">
                    <img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
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
        let moviesInfo = document.getElementById("movies");
        moviesInfo.innerHTML = output;
        //Displays the pages buttons (default display:none), after movies are shown.
        let pages = document.querySelector(".pages");
        pages.style.display = "flex";
    })
    .catch((err)=>{
        console.log(err);
    })
}
function genres(){
    let year = sessionStorage.getItem("year");
    const select = document.getElementById("selected");
    select.addEventListener("change", (e)=>{
    reset.style.display = "block";
    //Set genre to session storage.
    sessionStorage.setItem("genre",e.target.options[e.target.selectedIndex].id);
    //API request.
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + e.target.options[e.target.selectedIndex].id+'&primary_release_year='+year)
    .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = "";

        $.each(movies, (index, movie)=>{
            output +=`
            <div class="card">
                <div class="addBtn"><span><i class="ion-plus-circled"></i></span></div>
                <div class="card_img">
                    <img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
                </div>
                <div class="card_text">
                    <h3>${movie.title}</h3>
                    <p>Rating: <strong>${movie.vote_average}</strong></p>
                    <p>Release date: <strong>${movie.release_date}</strong></p>
                    <a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
                </div>
            </div>
            `
        })
        let moviesInfo = document.getElementById("movies");
        moviesInfo.innerHTML = output;
    })
 })
}
let reset = document.getElementById("reset");
reset.style.display = "none";
reset.addEventListener("click", ()=>{
    sessionStorage.setItem("genre", "");
    let year = document.getElementById("year").value;
    let selected = document.getElementById("selected");
    selected.selectedIndex = 0;
    discoverMovies(year);
    reset.style.display = "none";
})

window.onload = function resetGenre(){
    sessionStorage.setItem("genre", "");
}
