window.onload = function genres(){
    const select = document.getElementById("selected");
    select.addEventListener("change", (e)=>{
        let genreName = document.getElementById("genreName");
        genreName.innerHTML = ": " + e.target.options[e.target.selectedIndex].value;
        sessionStorage.setItem("genre",e.target.options[e.target.selectedIndex].id)

        //API request.
        axios.get("https://api.themoviedb.org/3/discover/tv?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres="+e.target.options[e.target.selectedIndex].id+'&include_null_first_air_dates=false')
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
    genres(pageNum);
})
//Click on "NEXT" to go forwards one page (increment pageNum).
var next = document.getElementById("next");
next.addEventListener("click", ()=>{
    pageNum++;
    window.scrollTo(0,0);
    genres(pageNum);
})

function genres(pageNum){
    let genre = sessionStorage.getItem("genre");

    //API request.
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key=fa155f635119344d33fcb84fb807649b&language=en-US&sort_by=popularity.desc&page="+pageNum+'&timezone=America%2FNew_York&with_genres='+genre+'&include_null_first_air_dates=false')
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