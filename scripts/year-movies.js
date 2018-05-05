//Get the form and its inputed value.
const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
    var year = document.getElementById("year").value;
    //Add the number next to the title.
    var byYear = document.getElementById("byYear");
    byYear.innerHTML = ": "+year;
    //Page number (default).
    pageNum = 1;
    //Call function.
    discoverMovies(year);
    //Prevents default action.
    e.preventDefault();
})

function discoverMovies(year){
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&page=1&primary_release_year="+year)
        .then((response)=>{
            console.log(response)
            let yearly = response.data.results;
            let output = "";

            $.each(yearly, (index, movies)=>{
                output +=`
                <div class="card">
					<img src="http://image.tmdb.org/t/p/w300/${movies.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
					<h3>${movies.title}</h3>
                    <p>Rating: <strong>${movies.vote_average}</strong></p>
                    <p>Release date: <strong>${movies.release_date}</strong></p>
					<a onclick="movieSelected('${movies.id}')" class="btn" href="#"> Movie Details </a>
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
//Set the movie Id into session storage.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    location.replace("../movie-page.html");
    return false;
}
//Define pageNum.
var pageNum = 1;
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
//Showcase movies corresponding the correct page number.
function discoverMoviesPageLoad(pageNum){
    var year = document.getElementById("year").value;
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&page='+pageNum+'&primary_release_year='+year)
    .then((response)=>{
        console.log(response)
        let yearly = response.data.results;
        let output = "";

        $.each(yearly, (index, movies)=>{
            output +=`
            <div class="card">
                <img src="http://image.tmdb.org/t/p/w300/${movies.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
                <h3>${movies.title}</h3>
                <p>Rating: <strong>${movies.vote_average}</strong></p>
                <p>Release date: <strong>${movies.release_date}</strong></p>
                <a onclick="movieSelected('${movies.id}')" class="btn" href="#"> Movie Details </a>
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