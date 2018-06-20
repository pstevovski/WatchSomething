//API KEY
const API_KEY = config.API_KEY;

function moviesToWatch(){
    let toWatch = JSON.parse(localStorage.getItem("movies")) || [];
     for(let i = 0; i < toWatch.length; i++){
        axios.get("https://api.themoviedb.org/3/movie/"+toWatch[i]+'?api_key='+API_KEY+'&language=en-US')
        .then((response)=>{
            console.log(response)
            let movies = response.data;
            document.getElementById("movies").innerHTML +=  `<div class="card">
                <div class="addBtn"><span><i class="ion-trash-a" onclick="movieSplice('${movies.id}')"></i></span></div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w300/${movies.poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    </div>
                    <div class="card_text">
                        <h3>${movies.title}</h3>
                        <p>Rating: <strong>${movies.vote_average}</strong></p>
                        <p>Release date: <strong>${movies.release_date}</strong></p>
                        <a onclick="movieSelected('${movies.id}')" class="btn" href="#"> Movie Details </a>
                    </div>
                </div>`;
        })
        //Display "Clear List" button.
        removeAll.style.display = "block";
    }
  }
//Delete movie from the list (array).
  function movieSplice(id){
    let storedId = JSON.parse(localStorage.getItem("movies")) || [];
    let index = storedId.indexOf(id);
    storedId.splice(index, 1);
    localStorage.setItem("movies", JSON.stringify(storedId));
    location.reload();
    console.log(storedId);
}

//Takes you to detailed movie info page.
function movieSelected(id){
    sessionStorage.setItem("movieId",id);
    location.replace("../movie-page.html")
    return false;
}
//Remove all movies from watchlist.
const removeAll = document.getElementById("removeAll");
removeAll.addEventListener("click", ()=>{
    localStorage.removeItem("movies");
    const smallSpinner = document.getElementById("smallSpinner");
    smallSpinner.style.display = "block";
    setTimeout(() => {
        location.reload();
        removeAll.style.display = "none";
    }, 1000);
})