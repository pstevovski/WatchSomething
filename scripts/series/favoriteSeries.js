//API KEY.
var API_KEY = config.API_KEY;
function favoriteSeries(){
    let favorite = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
    for (let i = 0; i < favorite.length; i++){
        axios.get("https://api.themoviedb.org/3/tv/"+favorite[i]+'?api_key='+API_KEY+'&language=en-US')
            .then((response)=>{
                let series = response.data;
                document.getElementById("movies").innerHTML +=  `<div class="card">
                <div class="addBtn"><span><i class="ion-trash-a" onclick="seriesSplice('${series.id}')"></i></span></div>
                    <div class="card_img">
                        <img src="http://image.tmdb.org/t/p/w300/${series.poster_path}" onerror="this.onerror=null;this.src='../images/image2.png';">
                    </div>
                    <div class="card_text">
                        <h3>${series.name}</h3>
                        <p>Rating: <strong>${series.vote_average}</strong></p>
                        <p>Release date: <strong>${series.first_air_date}</strong></p>
                        <a onclick="showSelected('${series.id}')" class="btn" href="#"> Movie Details </a>
                    </div>
                </div>`;
    })}
}
//Delete selected tv show from the list (array).
function seriesSplice(id){
    let storedId = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
    let index = storedId.indexOf(id);
    storedId.splice(index, 1);
    localStorage.setItem("favoriteSeries", JSON.stringify(storedId));
    location.reload();
}
//Open detailed info page about the tv show.
function showSelected(id){
    sessionStorage.setItem("showId", id);
    location.replace("../shows-page.html");
    return false;
}