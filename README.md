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
* Add genres  movies by year.  -Done.
* Add page change option to shows/movies-page. - Done.
* Add genres to tv shows by year. - Done.
* Add animation to GENRE select. (yearMovies done / byActor done); - Done.
* Add modal box, question mark, info in modal box. - Done.
* Add reset button for the genres - Done.
* Add code to reset the genres and the selected tag on name/year change in the input. -Done.
* Add option to change color (dark/white). - Done.
* Add cast info for movies/tv shows. - Done.
* Add upcoming movies, with today(each day) date as minimum release date, and a static set max date(2019-01-01). -Done.
* Re-design home page. - Done.
* Add modal box to Learn More @  Home page. - Done.

###### Bugs Fixed:
* year-movies.js : function discoverMoviesPageLoad(pageNum){} -> does not list movies from 2nd page(returns 0 results) untill genre is selected, then it works normally. -> FIXED.
* series-year.js - page & genre load bugs; -> FIXED.

###### Not completed:
* Add option to select season/episode and show the plot about it for TV Shows.(?)
* Create list for movies. (?);
* Correct the links. Currently some links are missing, add the appropriate links and connect them.