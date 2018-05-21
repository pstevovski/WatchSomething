//Scroll effect.
window.onscroll = function () {scrollFunction()}

const navbar = document.querySelector("nav");
const sticky = navbar.offsetTop;

function scrollFunction(){
    if(window.pageYOffset >= 250){
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}
//Burger Menu.
const burger = document.querySelector(".burger");
const slide = document.querySelector(".slide");
burger.addEventListener("click", ()=>{
	burger.classList.toggle("active");
	//Slide menu.
	slide.classList.toggle("slideIn");
});
//Click on DROPDOWN - MOVIES on small screen to display/hide the list.
const smallMovies = document.getElementById("smallScreenMovies");
smallMovies.addEventListener("click", ()=>{
	const moviesDropdown = document.getElementById("moviesDropdown");
	moviesDropdown.classList.toggle("drop");
});
//Click on DROPDOWN - SERIES on small screen to display/hide the list.
const smallSeries = document.getElementById("smallScreenSeries");
smallSeries.addEventListener("click", ()=>{
	const seriesDropdown = document.getElementById("seriesDropdown");
	seriesDropdown.classList.toggle("drop");
});
//Modal box and question mark.
let questionMark = document.getElementById("questionMark");
let modal = document.querySelector(".modal");
modal.style.display = "none";
questionMark.addEventListener("click", ()=>{
	modal.style.display = "block";
})
let close = document.getElementById("close");
close.addEventListener("click", ()=>{
	modal.style.display = "none";
})

//Change colors.
//test
function changeCSS(cssFile, cssLinkIndex){
    let oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    let newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink)
}
let white = document.getElementById("white");
let dark  = document.getElementById("dark");
white.addEventListener("click", ()=>{
    dark.style.display = "block";
    white.style.display = "none";
})
dark.addEventListener("click", ()=>{
    white.style.display = "block";
    dark.style.display = "none";
})