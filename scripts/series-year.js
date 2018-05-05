const form = document.getElementById("form");
form.addEventListener("submit", (e)=>{
    var year = document.getElementById("year").value;
    var byYear = document.getElementById("byYear");
    byYear.innerHTML = ": "+year;
    discoverShows(year);
    e.preventDefault();
})
function discoverShows(year){
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&first_air_date_year="+year+'&page=1&include_null_first_air_dates=false')
        .then((response)=>{
            let shows = response.data.results;
            let output = "";
            console.log(response)

            $.each(shows, (index, show)=>{
                output +=`
                <div class="card">
					<img src="http://image.tmdb.org/t/p/w300/${show.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
					<h3>${show.name}</h3>
                    <p>Rating: <strong>${show.vote_average}</strong></p>
                    <p>Release date: <strong>${show.first_air_date}</strong></p>
					<a onclick="showsSelected('${show.id}')" class="btn" href="#"> Show Details </a>
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
//Showcase tv shows corresponding to the page number.
function discoverShowsPage(pageNum){
    var year = document.getElementById("year").value;
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&first_air_date_year="+year+'&page='+pageNum+'&include_null_first_air_dates=false')
        .then((response)=>{
            let shows = response.data.results;
            let output = "";
            console.log(response)

            $.each(shows, (index, show)=>{
                output +=`
                <div class="card">
					<img src="http://image.tmdb.org/t/p/w300/${show.poster_path}"  onerror="this.onerror=null;this.src='../images/image2.png';">
					<h3>${show.name}</h3>
                    <p>Rating: <strong>${show.vote_average}</strong></p>
                    <p>Release date: <strong>${show.first_air_date}</strong></p>
					<a onclick="showsSelected('${show.id}')" class="btn" href="#"> Show Details </a>
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