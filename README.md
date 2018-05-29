# What to Watch
### About
This project uses an API from themoviedb.com in order to list movies & tv shows according to the following criteria:
* Latest;
* Popular (with set minimum and maximum dates);
* Top rated (of all time);
* On air (tv shows that are currently on air);
* Upcoming movies.

It also provides an option to SEARCH for movies/tv shows by:
* Title;
* Actor/Actress name;
* Year (original year of release);
* Genre.
#### Personal learning project.
##### I do not hold any ownership of the images used in this project. This project is for non-commercial use.

#### Update v2.0 (2018-05-29)
Lists are here !! Personal watchlist and favorites list(for movies and tv shows).
###### DONE:
* Re-designed the home page.
* Created list for movies/tv shows to watch, and favorites list for movies/tv shows.
* Added an option to add to watchlist or favorites list for every search option( top rated, upcoming,latest, popular, by year, by actor, by genre, by title for movies/tv shows).
* Corrected the links to match properly with each other.
#### Big Update v1.0 (2018-05-22)
A lot of changes and improvements have been made, from functionality to design. Here's a list of what's been changed/imporved so far.
###### DONE:
* Added option to search by genres in movies by year.
* Added option to serach by genres in tv shows by year.
* Added page change option for "recommended" to shows/movies-page.
* Added animation to Genre select to all pages where genre option is available.
* Added modal box, question mark, info in modal box.
* Added reset button for the genres, that resets the selected genre while the inputed actor/year remains the same, and re-loads from page 1.
* Added option to reset the selected genres on name(by actor)/year(by year) change in the input.
* Added cast info for movies/tv shows & fixed bug where not all genres were shown properly.
* Added upcoming movies, with today(each day) date as minimum release date, and a static set max date(2019-01-01). (* Working on making the end date dynamic.)
* Added animations to movie / tv show cards @ the search pages.
* Re-designed home page, movie / tv show info page, and all pages for searching options.
* Added modal box to Learn More @  Home page, containing some basic info how to use the website.

###### Bugs Fixed:
* year-movies.js : function discoverMoviesPageLoad(pageNum){} -> does not list movies from 2nd page(returns 0 results) untill genre is selected, then it works normally. -> FIXED.
* series-year.js - page & genre load bugs; -> FIXED.

###### Not completed:
* Add option to select season/episode and show the plot about it for TV Shows.(?)
* Make the end date of upcoming movies dynamic.
* Create an "about" page - how to use the website.
* Re-design the cards for the recommended movie/tv show (on detailed info page).

###### Known bugs: 0 (currently at the time of update v2.0).