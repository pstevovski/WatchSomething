let selected = document.getElementById("selected");
selected.style.display = "none";

let reset = document.getElementById("reset");
reset.style.display = "none";

const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
    let year = document.getElementById("year").value;
    let byYear = document.getElementById("byYear");
    byYear.innerHTML = ": "+year;
    selected.style.display = "block";
    sessionStorage.setItem("year", year);
    sessionStorage.setItem("genre", " ");
    selected.selectedIndex = 0;
    //Hide the reset button.
    reset.style.display = "none";
    discoverShows(year);
    genres();
    e.preventDefault();
})
function discoverShows(year){
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&first_air_date_year="+year+'&page=1&include_null_first_air_dates=false')
        .then((response)=>{
            let shows = response.data.results;
            let output = "";
            console.log(response)

            $.each(shows, (index, series)=>{
                output +=`
                <div class="card">
                    <div class="addBtn"><span><i class="ion-plus-circled"></i></span></div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
                    </div>
                    <div class="card_text">
                        <h3>${series.name}</h3>
                        <p>Rating: <strong>${series.vote_average}</strong></p>
                        <p>First air date: <strong>${series.first_air_date}</strong></p>
                        <a onclick="showSelected('${series.id}')" class="btn" href="#"> Show Details </a>
                    </div>
                </div>
                `;
                let showsInfo = document.getElementById("movies");
                showsInfo.innerHTML = output;
                //Display the pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
            })
        })
        .catch ((err)=>{
            console.log(err);
        })
}
//Store the show ID into session storage, and open shows-page.
function showsSelected(id){
    sessionStorage.setItem("showId", id);
    location.replace("../shows-page.html");
    return false;
}
//Define the page number.
var pageNum = 1;
//Click on "PREVIOUS" to go backwards one page (decrement pageNum).
var prev = document.getElementById("prev");
prev.addEventListener("click", ()=>{
    pageNum--;
    window.scrollTo(0,0);
    discoverShowsPage(pageNum);
})
//Click on "NEXT" to go forwards one page (increment pageNum).
var next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    discoverShowsPage(pageNum);
})
//Showcase tv shows corresponding to the page number. *BUG*
function discoverShowsPage(pageNum){
    let year = sessionStorage.getItem("year");
    let genre = sessionStorage.getItem("genre");
    if(!genre || !genre.length){
        genre = '';
    }
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&first_air_date_year="+year+'&page='+pageNum+'&include_null_first_air_dates=false&with_genres='+genre)
        .then((response)=>{
            let shows = response.data.results;
            let output = "";
            console.log(response)

            $.each(shows, (index, series)=>{
                output +=`
                <div class="card">
                    <div class="addBtn"><span><i class="ion-plus-circled"></i></span></div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
                    </div>
                    <div class="card_text">
                        <h3>${series.name}</h3>
                        <p>Rating: <strong>${series.vote_average}</strong></p>
                        <p>First air date: <strong>${series.first_air_date}</strong></p>
                        <a onclick="showSelected('${series.id}')" class="btn" href="#"> Show Details </a>
                    </div>
                </div>
                `;
                let showsInfo = document.getElementById("movies");
                showsInfo.innerHTML = output;
                //Display the pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
            })
        })
        .catch ((err)=>{
            console.log(err);
        })
}
//Genres function.
function genres(){
    let year = sessionStorage.getItem("year");
    const select = document.getElementById("selected");
    select.addEventListener("change", (e)=>{
        sessionStorage.setItem("genre",e.target.options[e.target.selectedIndex].id);
        reset.style.display = "block";
        axios.get("https://api.themoviedb.org/3/discover/tv?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&first_air_date_year="+year+'&with_genres=' + e.target.options[e.target.selectedIndex].id+'&page=1&include_null_first_air_dates=false')
        .then((response)=>{
            let shows = response.data.results;
            let output = "";
            console.log(response)

            $.each(shows, (index, series)=>{
                output +=`
                <div class="card">
                    <div class="addBtn"><span><i class="ion-plus-circled"></i></span></div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w300/${series.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
                    </div>
                    <div class="card_text">
                        <h3>${series.name}</h3>
                        <p>Rating: <strong>${series.vote_average}</strong></p>
                        <p>First air date: <strong>${series.first_air_date}</strong></p>
                        <a onclick="showSelected('${series.id}')" class="btn" href="#"> Show Details </a>
                    </div>
                </div>
                `;
                let showsInfo = document.getElementById("movies");
                showsInfo.innerHTML = output;
                //Display the pages buttons.
                let pages = document.querySelector(".pages");
                pages.style.display = "flex";
            })
        })
        .catch ((err)=>{
            console.log(err);
        })
    })
}

reset.addEventListener("click", ()=>{
    sessionStorage.setItem("genre", "");
    let year = document.getElementById("year").value;
    let selected = document.getElementById("selected");
    selected.selectedIndex = 0;
    discoverShows(year);
    reset.style.display = "none";
})

window.onload = function resetGenre(){
    sessionStorage.setItem("genre", "");
}