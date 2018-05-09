//Genres function.
window.onload = function genres(){
    const select = document.getElementById("selected");
    select.addEventListener("change",(e)=>{
        let genreName = document.getElementById("genreName");
        genreName.innerHTML = ": " + e.target.options[e.target.selectedIndex].value;
        //Send the ID of the selected element into sessionStorage.
        sessionStorage.setItem("genre", e.target.options[e.target.selectedIndex].id)
        //API request.
        axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="+e.target.options[e.target.selectedIndex].id)
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
    })
}
//Movie selected function.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    location.replace("../movie-page.html");
    return false;
}
//Define page number
var pageNum = 1;
//Click on "PREVIOUS" to go back one page (decrement pageNum)
var prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
    pageNum--;
    window.scrollTo(0,0)
    genresPage(pageNum);
})
//Click on "NEXT" to go forwards one page (increment pageNum)
var next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    genresPage(pageNum);
})
//Genres page.
function genresPage(pageNum){
        //Get the selected element ID from the sessionStorage.
        let genre = sessionStorage.getItem("genre");
        console.log(genre)

        axios.get("https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+pageNum+'&with_genres='+genre)
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
