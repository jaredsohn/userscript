// ==UserScript==
// @name           IMDB Customized 250
// @namespace      *
// @description    Makes it easier to see which movies from the 250 top you've seen or not (you'll need to have voted for these films and be logged in)
// @include        http://www.imdb.com/chart/top*
// ==/UserScript==

var yourMoviesUrl = "http://www.imdb.com/mymovies/list?votehistory"
var hostUrl       = "http://" + window.location.host

// Array to contain your movies
var yourMovies    = new Object()

GM_xmlhttpRequest({
   method: 'get',
   headers: {'Referer': 2.0, Version: 2.0, 'Accept': 'text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
   url: yourMoviesUrl,
   onload: function(responseDetails) {
      if (responseDetails.status == 200) {
	     var regex = /class="standard">&nbsp;<a href="(\/title\/tt\d{7}\/)">/gi
		 while ((m = regex.exec(responseDetails.responseText)) != null) {
		    yourMovies[hostUrl + m[1]] = 1
	     }
		 displaySeenMovies()
      }
   }
});

function displaySeenMovies() {
	var links = document.links;
	for (i = 0; i < links.length; i++)
	   if (/\/title\/tt\d{7}\/$/.test(links[i].href) && links[i].textContent != "")
	      if (yourMovies[links[i].href])
			links[i].innerHTML = "<small>" + links[i].innerHTML + "</small>"
		  else
		    links[i].innerHTML = "<b>" + links[i].innerHTML + "</b>"
}
