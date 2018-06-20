//API KEY variable.
const API_KEY = config.API_KEY;
//Todays date.
let today = new Date().toJSON().slice(0,10);
window.onload = function featuredMovies(){
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2017-12-01&primary_release_date.lte='+today+'&vote_average.gte=6.5&vote_average.lte=10&with_original_language=en')
        .then((response)=>{
            const featured = response.data.results;
            //featured.length = 7;
            let output = "";
            for(let i = 0; i < featured.length; i++){
                output += `
                <div class="card">
                    <img  onclick="movieSelected('${featured[i].id}')" src="http://image.tmdb.org/t/p/w200/${featured[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
                `;
                let featuredOutput = document.getElementById("movies");
                featuredOutput.innerHTML = output;
            }
        });
        //On page load, output Tv Shows.
        axios.get("https://api.themoviedb.org/3/tv/popular?api_key="+API_KEY+'&language=en-US&page=1')
            .then((response)=>{
                const shows = response.data.results;
                let output = "";
                for(let i = 0; i < shows.length; i++){
                    output +=`
                    <div class="card" onclick="showSelected('${shows[i].id}')">
                        <img src="http://image.tmdb.org/t/p/w200/${shows[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
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

//Movies drag slider.
const slider = document.getElementById("movies");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e)=>{
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    e.preventDefault();
    console.log(startX);
})
slider.addEventListener("mouseup", ()=>{
    isDown = false;
})
slider.addEventListener("mouseleave", (e)=>{
    slider.classList.remove("active");
    isDown = false;
})
slider.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
})

//Drag slider for tv shows.
const sliderForTvShows = document.getElementById("tvShows");
sliderForTvShows.addEventListener("mousedown", (e)=>{
    sliderForTvShows.classList.add("active");
    isDown = true;
    startX = e.pageX - sliderForTvShows.offsetLeft;
    scrollLeft = sliderForTvShows.scrollLeft;
    e.preventDefault();
    console.log(startX);
})
sliderForTvShows.addEventListener("mouseup", ()=>{
    sliderForTvShows.classList.remove("active");
    isDown = false;
})
sliderForTvShows.addEventListener("mouseleave", (e)=>{
    sliderForTvShows.classList.remove("active");
    isDown = false;
})
sliderForTvShows.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderForTvShows.offsetLeft;
    const walk = x - startX;
    sliderForTvShows.scrollLeft = scrollLeft - walk;
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
    }, 8000);