// ==UserScript==
// @name           Film 1 (NL) EPG IMDB ratings
// @namespace      macmanus
// @include        http://*.film1.nl/tv/epg.php
// @description    Shows the IMDB ratings (if only 1 match by movie title) on the dutch Film 1 tv guide and links to the IMDB page. Partially based on the excellent "Inline IMDB ratings" by Julien Couvreur: http://userscripts.org/scripts/show/11360 (works for http://*.film1.nl/tv/epg.php)
// ==/UserScript==

GM_addStyle("#leaderboard, #flash_leftpromo, #flash_leftpromo2 {display: none !important}");

function setLinks() {
	GM_log("Start working...");
	for (var i=0;i < document.links.length;i++) {
		if (document.links[i].className == 'title') {
			var movielink = document.links[i];
			var moviename = movielink.innerHTML;
			
			var movieurl = "http://imdb.com/find?s=tt&q=" + moviename;
			GM_log("Link found for " + moviename + " ("+movieurl+")");
			
			insertImdbNode(movielink, movieurl);
		}
	}
}

function insertImdbNode(movielink, movieurl) {
		getMovieInfo(movieurl, 
				function (content) {
							var movieInfo = extractMovieInfo(content);
							if (movieInfo != null) {
								if (movieInfo.rating != null) {
							    var imdbNode = unsafeWindow.document.createElement('span');
							
									var ratinglink=unsafeWindow.document.createElement('a');
									ratinglink.setAttribute('href',movieurl);
									var ratingtext=unsafeWindow.document.createElement('i');
									var rating=unsafeWindow.document.createTextNode('Rating: ' + movieInfo.rating);
									ratingtext.appendChild(rating);
									ratinglink.appendChild(ratingtext);
									movielink.parentNode.appendChild(ratinglink);
								} else {
									GM_log("Using url " + movieInfo.alternateurl + " to get the rating from the most popular result (movie: " + movielink.innerHTML + ")");
									insertImdbNode(movielink, movieInfo.alternateurl);
								}
							}
					}
			);
}	

function getMovieInfo(movieurl, callback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: movieurl,
    onload: function(details) {
      callback(details.responseText);
    }
  });
}

function extractMovieInfo(content) {
  // <b>User Rating:</b> 
  // <b>2.1/10</b> 
  var match = content.match(/<b>(\d.\d)\/10<\/b>/);
  if (match != null && match.length > 0) {
  	return { rating: match[1] };
  } else {
  	var pattern = /<b>Popular Titles<\/b> \(Displaying 1 Result\).*?<a href=".*?"/;
		var splpat = /<a href="/;
		result = content.match(pattern);
		if (result != null) {
			result = result[0].split(splpat)[1];
			result = result.substring(0, result.length - 1);
			return { alternateurl: "http://imdb.com" + result };
		}
  	return { rating: 'Ambiguous' };
  }
}

unsafeWindow.addEventListener('load', setLinks, false);