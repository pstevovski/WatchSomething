//Define variables.
const navbar = document.querySelector("nav");
const sticky = navbar.offsetTop;
//When window scroll reaches pageYOffset >=250, show the "sticky" navbar.
window.onscroll = function scrollFunction(){
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
//Click on DROPDOWN - MY LISTS on small screen to display/hide the list.
const smallLists = document.getElementById("smallScreenList");
smallLists.addEventListener("click", ()=>{
	const smallListsDropdown = document.getElementById("myListsDropdown");
	smallListsDropdown.classList.toggle("drop");
})
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