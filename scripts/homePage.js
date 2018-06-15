//API KEY variable.
const API_KEY = config.API_KEY;
//Define buttons.
const adventure = document.getElementById("adventure");
const movies = document.getElementById("movies");
const series = document.getElementById("series");
adventure.addEventListener("click", ()=>{
    adventure.classList.add("active");
    movies.classList.add("slideIn");
    series.classList.add("slideIn");
})
//Define left/right arrows that will move the output left/right correspondingly.
const right = document.getElementById("right");
const left = document.getElementById("left");
left.style.display = "none";
const featuredMovies = document.getElementById("featuredMovies");
//Define the starting value of the left/right button.
let moveLeft = 0;
let movedLeft = 0;
let movedRight = 0;
let end = -2600;
let start = 0;
//Slide featured movies to the left(unveil new movie to the right).
right.addEventListener("click", ()=>{
    moveLeft += -200;
    movedLeft = -200;
    featuredMovies.style.transform = "translate("+moveLeft+"px)";
    if(moveLeft === end){
        right.classList.add("removePopup");
    }
    if(moveLeft === movedLeft){
        left.style.display = "block";
        left.classList.add("popup");
        left.classList.remove("removePopup");
    }
})
//Slide featured movies to the right(hide movies on the right).
left.addEventListener("click", ()=>{
    moveRight = 200;
    moveLeft += moveRight;
    featuredMovies.style.transform = "translate("+moveLeft+"px)";
    console.log(moveLeft)
    if(moveLeft === start){
        left.classList.add("removePopup")
        left.classList.remove("popup");
    }
    //If you go back (left arrow) 200px, then show right arrow again.
    let endMinusRight = end + moveRight; 
    if(moveLeft === endMinusRight){
        right.style.display = "block";
        right.classList.add("popup");
        right.classList.remove("removePopup")
    }
    //If you reach the end of the length (2600 is the set length), remove the right arrow.
    if(moveLeft === end){
        right.classList.add("removePopup");
    }
})
//Media query.
let maxWidth = window.matchMedia("(max-width: 400px)")
myFunction(maxWidth) // Call listener function at run time
maxWidth.addListener(myFunction) // Attach listener function on state changes
function myFunction(maxWidth){
    //Define the starting values for left/right button for small screen(400px).
    let moveLeftSmall = 0;
    let movedLeftSmall = 0;
    let movedRightSmall = 0;
    let endSmall = -3600;
    let startSmall = 0;
    if(maxWidth.matches){
    //Slide featured movies to the left(unveil new movie to the right).
    right.addEventListener("click", ()=>{
        moveLeftSmall += -400;
        movedLeftSmall = -400;
        featuredMovies.style.transform = "translate("+moveLeftSmall+"px)";
        console.log(moveLeftSmall)
        if(moveLeftSmall === endSmall){
            right.classList.add("removePopup");
        }
        if(moveLeftSmall === movedLeftSmall){
            left.style.display = "block";
            left.classList.add("popup");
            left.classList.remove("removePopup");
        }
    })
    left.addEventListener("click", ()=>{
        moveRightSmall= 400;
        moveLeftSmall+= moveRightSmall;
        featuredMovies.style.transform = "translate("+moveLeftSmall+"px)";
        console.log(moveLeftSmall)
        if(moveLeftSmall === startSmall){
            left.classList.add("removePopup")
            left.classList.remove("popup");
        }
        //If you go back (left arrow) 200px, then show right arrow again.
        let endMinusRight = end + moveRight; 
        if(moveLeftSmall === endMinusRight){
            right.style.display = "block";
            right.classList.add("popup");
            right.classList.remove("removePopup")
        }
        //If you reach the end of the length (2600 is the set length), remove the right arrow.
        if(moveLeftSmall === end){
            right.classList.add("removePopup");
        }
    })
    }
}
//Todays date.
let today = new Date().toJSON().slice(0,10);
window.onload = function featuredMovies(){
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2017-12-01&primary_release_date.lte='+today+'&vote_average.gte=6.5&vote_average.lte=10&with_original_language=en')
        .then((response)=>{
            const featured = response.data.results;;
            let output = "";
            for(let i = 0; i < featured.length; i++){
                output += `
                <div class="card">
                    <img src="http://image.tmdb.org/t/p/w200/${featured[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    <div class="link">
                        <a onclick="movieSelected('${featured[i].id}')" href="#"> Details</a>
                    </div>
                </div>
                `;
                let featuredOutput = document.getElementById("featuredMovies");
                featuredOutput.innerHTML = output;
            }
            //Random quote on page load.
            document.getElementById("quote").innerHTML = randomQuote[Math.round(Math.random()*16)];
            quote.style.display = "block";
            quote.classList.remove("quoteFade");  
        })
}
//Takes you to detailed info page.
function movieSelected(id){
    sessionStorage.setItem("movieId", id);
    location.replace("movie-page.html");
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
quote.style.display = "none";
//Change quote(with fade in/out animation) at the set interval.
setInterval(() => {
    quote.classList.remove("quoteFade");
        setTimeout(() => {
        document.getElementById("quote").innerHTML = randomQuote[Math.round(Math.random()*16)];
        quote.classList.add("quoteFade");
        }, 2500); 
    }, 8000);