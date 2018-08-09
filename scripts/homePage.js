//API KEY variable.
const API_KEY = config.API_KEY;
//Todays date.
let today = new Date().toJSON().slice(0,10);
//Setting the maximum(end) date. This is not dynamic. Looking for solution.
let endDate = new Date(2019, 4, 17 + 1).toJSON().slice(0,10);
window.onload = function featuredMovies(){
    // Random page number generator for top rated movies and tv shows.
    let min = 1;
    let max = 30;
    min = Math.ceil(min);
    max = Math.floor(max);
    let topRated = Math.floor(Math.random() * (max-min +1)) + min;

    // Random page number generator for popular movies and tv shows.
    let minPopular = 1;
    let maxPopular = 15;
    minPopular = Math.ceil(minPopular);
    maxPopular = Math.floor(maxPopular);
    let popular = Math.floor(Math.random() * (maxPopular - minPopular +1)) + minPopular;

    // TOP RATED MOVIES.
    axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+API_KEY+'&language=en-US&page='+topRated)
        .then ((response)=>{
            let featured = response.data.results;
            let output = ""
            console.log(response)
           	for(let i = 0; i < featured.length; i++){
				output += `
				<div class="card">
                    <div class="overlay">
                        <div class="movie">
                            <h2>${featured[i].title}</h2>
                            <p><strong>Rating:</strong> ${featured[i].vote_average}</p>
                            <p><strong>Release date:</strong> ${featured[i].release_date}</p>
                            <a onclick="movieSelected('${featured[i].id}')" href="#">Details</a>
                        </div>
                    </div>
                <img src="http://image.tmdb.org/t/p/w400/${featured[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
            `;
            }
            //Append the output to "movies" element.
			let topRatedMovies= document.getElementById("topRated");
            topRatedMovies.innerHTML = output;
        })

    // POPULAR MOVIES.
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+popular+'&primary_release_date.gte=2017-12-01&primary_release_date.lte='+today+'&vote_average.gte=6&vote_average.lte=10&with_original_language=en')
        .then((response)=>{
            const featured = response.data.results;
            console.log(featured)
            //featured.length = 7;
            let output = "";
            for(let i = 0; i < featured.length; i++){
                output += `
                <div class="card">
                    <div class="overlay">
                        <div class="movie">
                            <h2>${featured[i].title}</h2>
                            <p><strong>Rating:</strong> ${featured[i].vote_average}</p>
                            <p><strong>Release date:</strong> ${featured[i].release_date}</p>
                            <a onclick="movieSelected('${featured[i].id}')" href="#">Details</a>
                        </div>
                    </div>
                    <img src="http://image.tmdb.org/t/p/w400/${featured[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
                `;
                let featuredOutput = document.getElementById("movies");
                featuredOutput.innerHTML = output;
            }
        });

        // TOP RATED TV SHOWS.
        axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key="+API_KEY+'&language=en-US&page='+topRated)
		.then ((response)=>{
			//Fetches the data - > results from the API.
			console.log(response);
			let shows = response.data.results;
			let output = "";
			//Appends to the output the info for each fetched result.
			for(let i = 0; i < shows.length; i++){
				output += `
				<div class="card">
                        <div class="overlay">
                            <div class="movie">
                                <h2>${shows[i].original_name}</h2>
                                <p><strong>Rating:</strong> ${shows[i].vote_average}</p>
                                <p><strong>Release date:</strong> ${shows[i].first_air_date}</p>
                                <a onclick="showSelected('${shows[i].id}')" href="#">Details</a>
                            </div>
                        </div>
                        <img src="http://image.tmdb.org/t/p/w400/${shows[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    </div>`;
			}
			//Appends the "output" to the movies element.
			let topRatedShows = document.getElementById("topRatedShows");
			topRatedShows.innerHTML = output;
        })
        
        // POPULAR TV SHOWS.
        axios.get("https://api.themoviedb.org/3/tv/popular?api_key="+API_KEY+'&language=en-US&page='+popular)
            .then((response)=>{
                const shows = response.data.results;
                shows.length = 20;
                console.log(shows)
                let output = "";
                for(let i = 0; i < shows.length; i++){
                    output +=`
                    <div class="card">
                        <div class="overlay">
                            <div class="movie">
                                <h2>${shows[i].original_name}</h2>
                                <p><strong>Rating:</strong> ${shows[i].vote_average}</p>
                                <p><strong>Release date:</strong> ${shows[i].first_air_date}</p>
                                <a onclick="showSelected('${shows[i].id}')"  href="#">Details</a>
                            </div>
                        </div>
                        <img src="http://image.tmdb.org/t/p/w400/${shows[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    </div>`;
                    }
                    const popularShows = document.getElementById("tvShows");
                    popularShows.innerHTML = output;
                })
        //Random quote on page load.
         document.getElementById("quote").innerHTML = randomQuote[Math.round(Math.random()*16)];
        quote.style.display = "block";
        quote.classList.remove("quoteFade");  
}
// TOP RATED MOVIES SLIDER
const topRated = document.getElementById("topRated");
topRated.addEventListener("mousedown", (e)=>{
    isDown = true;
    startX = e.pageX - topRated.offsetLeft;
    scrollLeft = topRated.scrollLeft;
    e.preventDefault();
    console.log(startX);
})
topRated.addEventListener("mouseup", ()=>{
    isDown = false;
})
topRated.addEventListener("mouseleave", (e)=>{
    topRated.classList.remove("active");
    isDown = false;
})
topRated.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - topRated.offsetLeft;
    const walk = x - startX;
    topRated.scrollLeft = scrollLeft - walk;
})
// TOP RATED TV SHOWS SLIDER
const topRatedShows = document.getElementById("topRatedShows");
topRatedShows.addEventListener("mousedown", (e)=>{
    isDown = true;
    startX = e.pageX - topRatedShows.offsetLeft;
    scrollLeft = topRatedShows.scrollLeft;
    e.preventDefault();
    console.log(startX);
})
topRatedShows.addEventListener("mouseup", ()=>{
    isDown = false;
})
topRatedShows.addEventListener("mouseleave", (e)=>{
    topRatedShows.classList.remove("active");
    isDown = false;
})
topRatedShows.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - topRatedShows.offsetLeft;
    const walk = x - startX;
    topRatedShows.scrollLeft = scrollLeft - walk;
})
// Popular movies slider
const popularMoviesSlider = document.getElementById("movies");
let isDown = false;
let startX;
let scrollLeft;

popularMoviesSlider.addEventListener("mousedown", (e)=>{
    isDown = true;
    startX = e.pageX - popularMoviesSlider.offsetLeft;
    scrollLeft = popularMoviesSlider.scrollLeft;
    e.preventDefault();
    console.log(startX);
})
popularMoviesSlider.addEventListener("mouseup", ()=>{
    isDown = false;
})
popularMoviesSlider.addEventListener("mouseleave", (e)=>{
    popularMoviesSlider.classList.remove("active");
    isDown = false;
})
popularMoviesSlider.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - popularMoviesSlider.offsetLeft;
    const walk = x - startX;
    popularMoviesSlider.scrollLeft = scrollLeft - walk;
})

//Slider for tv shows.
const popularTvShowsSlider = document.getElementById("tvShows");
popularTvShowsSlider.addEventListener("mousedown", (e)=>{
    popularTvShowsSlider.classList.add("active");
    isDown = true;
    startX = e.pageX - popularTvShowsSlider.offsetLeft;
    scrollLeft = popularTvShowsSlider.scrollLeft;
    e.preventDefault();
    console.log(startX);
})
popularTvShowsSlider.addEventListener("mouseup", ()=>{
    popularTvShowsSlider.classList.remove("active");
    isDown = false;
})
popularTvShowsSlider.addEventListener("mouseleave", (e)=>{
    popularTvShowsSlider.classList.remove("active");
    isDown = false;
})
popularTvShowsSlider.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - popularTvShowsSlider.offsetLeft;
    const walk = x - startX;
    popularTvShowsSlider.scrollLeft = scrollLeft - walk;
})
//Takes you to detailed info page.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    location.replace("movie-page.html");
    return false;
}//Takes you to detailed tv shows info page.
function showSelected(id){
    sessionStorage.setItem("showId", id);
    location.replace("shows-page.html");
    return false;
}
//Array for random quotes.
let randomQuote = new Array();
randomQuote[0] = " 'I'm going on an adventure!' - Bilbo Baggins, The Hobbit";
randomQuote[1] = " 'I'm going to make him an offer he can't refuse.' - Vito Corleone, The Godfather";
randomQuote[2] = " 'You talkin' to me?' - Travis Bickle, Taxi Driver";
randomQuote[3] = " 'Bond. James Bond.' - James Bond";
randomQuote[4] = " 'I'll be back.' - Terminator, The Terminator";
randomQuote[5] = " 'My mama always said, 'Life is (was) like a box of chocolates. You never know what you're gonna get.' - Forrest Gump, Forrest Gump";
randomQuote[6] = " 'I see dead people.' - Cole Sear, The Sixth Sense";
randomQuote[7] = " 'Keep your friends close, but your enemies closer.' - Michael Corleone, The Godfather part II";
randomQuote[8] = " 'Say 'hello' to my little friend!' -Tony Montana, Scarface";
randomQuote[9] = " 'Hasta la vista, baby.' - The Terminator, Terminator 2: Judgement Day";
randomQuote[10] = " 'Bye Felicia !' - Ice Cube, Friday";
randomQuote[11] = " 'My precious.' - Gollum, The Lord of the rings: The Two Towers";
randomQuote[12] = " 'Houston, we have a problem.' - Jim Lovell, Apollo 13";
randomQuote[13] = " 'Yippie-Ki-Yay, Motherfucker!' - John McClane, Die Hard";
randomQuote[14] = " 'May the Force be with you' - Obi-Wan Kenobi, Star Wars";
randomQuote[15] = " 'A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.' - Gandalf, The Lord of the Rings: Fellowship of the";
let quote = document.getElementById("quote");
//quote.style.display = "none";
//Change quote(with fade in/out animation) at the set interval.
setInterval(() => {
    quote.classList.remove("quoteFade");
        setTimeout(() => {
        document.getElementById("quote").innerHTML = randomQuote[Math.round(Math.random()*16)];
        quote.classList.add("quoteFade");
        }, 2500); 
    }, 5000);