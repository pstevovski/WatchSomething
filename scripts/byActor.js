const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
    var actor = document.getElementById("actor").value;
    var byActor = document.getElementById("byActor");
    byActor.innerHTML = ": "+actor;
    discoverByActor(actor).then(moviesByActor);
    moviesByActor();
    discoverByActor(actor).then(genres);
    e.preventDefault();
})
function discoverByActor(actor){
    return axios.get("https://api.themoviedb.org/3/search/person?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&query="+actor+'&page=1&include_adult=false')
        .then((response)=>{
            let actorId = response.data.results[0].id;
            sessionStorage.setItem("theActorId", actorId);
        })
};
function moviesByActor(){
    let actorId = sessionStorage.getItem("theActorId");
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people="+actorId)
        .then((response)=>{
            console.log(response);
            let movies = response.data.results;
            let output = "";

            $.each(movies, (index, movie)=>{
                output +=`
                <div class="card">
						<img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
						<h3>${movie.title}</h3>
						<p>${movie.vote_average} <strong>IMDB Rating</strong></p>
						<p>Release date: <strong>${movie.release_date}</strong></p>
						<a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
					</div>
                `
            })
            let moviesInfo = document.getElementById("movies");
            moviesInfo.innerHTML = output;
            //Display pages buttons.
            let pages = document.querySelector(".pages");
            pages.style.display = "flex";
        })
}
//Get the movie ID, set it to storageSession and then move to movie-page.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    location.replace("../movie-page.html");
    return false;
}
//List movies by that actor again after page change.
function movieByActorPage(pageNum){
    let actorId = sessionStorage.getItem("theActorId");
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+pageNum+'&with_people='+actorId)
    .then((response)=>{
        console.log(response);
        let movies = response.data.results;
        let output = "";

        $.each(movies, (index, movie)=>{
            output +=`
            <div class="card">
                    <img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
                    <h3>${movie.title}</h3>
                    <p>${movie.vote_average} <strong>IMDB Rating</strong></p>
                    <p>Release date: <strong>${movie.release_date}</strong></p>
                    <a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
                </div>
            `
        })
        let moviesInfo = document.getElementById("movies");
        moviesInfo.innerHTML = output;
    })
}
//Select
const genre = document.getElementById("selected");
genre.addEventListener("change", ()=>{
    genres();
})
function genres(){
    let actorId = sessionStorage.getItem("theActorId");
    const select = document.getElementById("selected");
    select.addEventListener("change", (e)=>{
    //Set genre to session storage.
    sessionStorage.setItem("genre",e.target.options[e.target.selectedIndex].id);
    //API request.
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + e.target.options[e.target.selectedIndex].id+'&with_people='+actorId)
    .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = "";

        $.each(movies, (index, movie)=>{
            output +=`
            <div class="card">
                    <img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
                    <h3>${movie.title}</h3>
                    <p>${movie.vote_average} <strong>IMDB Rating</strong></p>
                    <p>Release date: <strong>${movie.release_date}</strong></p>
                    <a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
                </div>
            `
        })
        let moviesInfo = document.getElementById("movies");
        moviesInfo.innerHTML = output;
    })
 })
}
//Define page number
var pageNum = 1;
//Click on "PREVIOUS" to go back one page (decrement pageNum)
var prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
    pageNum--;
    window.scrollTo(0,0)
    movieByActorPage(pageNum);
    movieByActorWithGenrePage(pageNum);
})
//Click on "NEXT" to go forwards one page (increment pageNum)
var next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    movieByActorPage(pageNum);
    movieByActorWithGenrePage(pageNum);
})
//Add a function when you change the page with selected genre, to list movies with that actor
//with the set genre.
function movieByActorWithGenrePage(pageNum){
    let actorId = sessionStorage.getItem("theActorId");
    let genre = sessionStorage.getItem("genre");

    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+pageNum+'&with_genres='+genre+'&with_people='+actorId)
    .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = "";

        $.each(movies, (index, movie)=>{
            output +=`
            <div class="card">
                    <img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
                    <h3>${movie.title}</h3>
                    <p>${movie.vote_average} <strong>IMDB Rating</strong></p>
                    <p>Release date: <strong>${movie.release_date}</strong></p>
                    <a onclick="movieSelected('${movie.id}')" class="btn" href="#"> Movie Details </a>
                </div>
            `
        })
        let moviesInfo = document.getElementById("movies");
        moviesInfo.innerHTML = output;
    })
 }