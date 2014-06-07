// ==UserScript==
// @name           ImdbScores4GoogleMovies
// @namespace      marclucchini
// @description    IMDB scores on Google Movies
// @include        http://www.google.com/movies*
// ==/UserScript==

// ==UserVariables==
var domain = 'fr'; // fr, it, com...
var goodMovie  = 7.6 // Minimum rating for a bold font display
// ==/UserVariables==

var Movie = function(node) {
	this.node = node;
	this.title = node.innerHTML;
	this.href = "";
	this.score = "x";
}

Function.prototype.bind = function(thisObject) {
	var method = this;
	var oldargs = [].slice.call(arguments, 1);
	return function () {
		var newargs = [].slice.call(arguments);
		return method.apply(thisObject, oldargs.concat(newargs));
	};
}

function main() {
	var movies = new Array();
	init(movies);
	fillAndDisplay(movies);
}

function init(movies) {
	var movieItemSet = document.evaluate('/html/body/div/div/div/div/div/div/div/div[1]/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var nbMovieItem = movieItemSet.snapshotLength
	for (var i = 0; i < nbMovieItem; i++)
		movies.push(new Movie(movieItemSet.snapshotItem(i)));
	GM_log("Found " + movies.length + " movies to treat");
}

function fillAndDisplay(movies) {
	var nbMovie = movies.length;
	for (var i = 0; i < nbMovie; i++) {
		var movie = movies[i];
		GM_log("Treating movie \"" + movie.title + "\"");
		GM_xmlhttpRequest({
			method: 'get',
			headers: {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'User-agent': 'Mozilla/4.0 (compatible)'},
			url: "http://www.imdb.com/search/title?view=simple&title=" + movie.title,
			onload: treat.bind({"movie":movie})
		})
	}
}

function treat(responseDetails) {
	if (responseDetails.status == 200) {
		var resp = responseDetails.responseText;
		var titles = resp.match('<td class="title"><a href="(\/title\/tt[0-9]{7})\/">(.*)</a>');
		if (titles) {
			this.movie.href = titles[1];
			var scores = resp.match('<b>([0-9]+\.[0-9]+)</b>/10');
			if (scores)
				this.movie.score = scores[1];
		}
		display(this.movie);
	}
	else {
		GM_log("HTTP Error. IMDB may refuse these many simultaneous requests.");
		return false;
	}
}

function display(movie) {
	var href = 'http://www.imdb.' + domain + movie.href;
	var style = 'text-decoration:none; color:black; font-size:13;';
	if (parseFloat(movie.score)>=goodMovie)
		style += ' font-weight:bold;';

	var scoreNode = document.createElement("a");
	scoreNode.setAttribute("href", href);
	scoreNode.setAttribute("style", style);
	movie.node.parentNode.appendChild(scoreNode, movie.node).innerHTML = "   [" + movie.score + "]";
}

main();
