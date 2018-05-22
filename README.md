# What to Watch
### About
This project uses an API from themoviedb.com in order to list movies & tv shows according to the following criteria:
* Latest;
* Popular (with set minimum and maximum dates);
* Top rated (of all time);
* On air (tv shows that are currently on air);
* Upcoming movies (W.I.P);

It also provides an option to Search for movies/tv shows by:
* Title;
* Actor/Actress name;
* Year (original year of release);
* Genre.
#### Personal learning project.
##### I do not hold any ownership of the images used in this project. This project is currently for non-commercial use.

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
* Create list for movies. (?);
* Correct the links. Currently some links are missing, add the appropriate links and connect them.

###### Known bugs: 0 (currently at the time of big update v1.0).