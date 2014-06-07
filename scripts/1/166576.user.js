// ==UserScript==
// @name           IMDB Ratings in Lovefilm
// @namespace      rk-dresselhaus.de
// @description    Adds ratings from IMDB to films in Lovefilm
// @include        http://www.lovefilm.*/film/*
// @include        http://www.lovefilm.*/tv/*
//
// Based on http://userscripts.org/scripts/show/41720
// ==/UserScript==

function findImdbID(url) {
  var m = url.match(/^http:\/\/(.*\.)?imdb\..*\/title\/(tt\d*)/i);
  if (m) return m[2];
  return null;
}

document.addEventListener("DOMContentLoaded", function () {
	/* get movie details - todo: maybe use meta tags? */
	H1 = document.getElementsByTagName("H1")[0]
	currentTitle = H1.getElementsByTagName("span")[0].firstChild.data;
	elem=H1
	while ((elem = elem.nextSibling)) {
		 if (elem.nodeName == "SPAN") {
				currentYear = elem.firstChild.data
				break;
		  }
	}
	//alert(currentTitle + " " + currentYear);
	var imdb = document.createElement("div")
	H1.parentNode.insertBefore(imdb, H1.parentNode.getElementsByTagName("ul")[0])
	
	/* goto imdb button */
	var imdb_button = document.createElement("a")
	imdb_button.className = "add-to-watchlist short-text"
	imdb_button.appendChild(document.createTextNode("View profile on IMDb"))
	imdb_button.target = "_blank"
	imdb_button.addEventListener("click", function (event) { event.stopPropagation();return true }, true);
	var btn = document.createElement("li")
	btn.appendChild(imdb_button)
	var uls = H1.parentNode.getElementsByTagName("ul");
	(uls.length > 1 ? uls[1] : uls[0]).appendChild(btn)
	
	/* imdb rating display */
	imdb.appendChild(document.createTextNode("IMDb Rating: "))
	var imdb_rating_span = document.createElement("span")
	var imdb_rating = document.createTextNode("--")
	imdb_rating_span.style.fontWeight = "bolder"
	imdb_rating_span.appendChild(imdb_rating)
	imdb.appendChild(imdb_rating_span)
	
	/* do the magic */
	get_imdb_url(currentTitle, currentYear, function(imdb_url) {
		var imdb_id = findImdbID(imdb_url);
		imdb_button.href = imdb_url
		get_imdb_info(imdb_id, function (data) {
			imdb_rating.data = data.imdbRating;
		});
	});
}, false);

function get_imdb_url (title, year, callback) {
	google_url = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + encodeURIComponent(title) + "+" + "(" + year + ")" + '+site:imdb.com';
	//alert(google_url)
	GM_xmlhttpRequest({
	  method: "GET",
	  url: google_url,
	  onload: function(details) {
			var res;
			res = eval('(' + details.responseText + ')');
			movie_url = res.responseData.results[0].unescapedUrl;
			callback(movie_url)
	  }
	});
}

function get_imdb_info (movieID, callback) {
	var api_url = "http://www.omdbapi.com/?i=" + movieID
	GM_xmlhttpRequest({
	  method: "GET",
	  url: api_url,
	  onload: function(details) {
			var res;
			res = eval('(' + details.responseText + ')');
			callback(res)
	  }
	});	
}
