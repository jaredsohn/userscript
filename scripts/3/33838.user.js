// ==UserScript==
// @name           YouTube Wide High-Quality
// @namespace      dbzao
// @description    Increase player size when clicking the High-Quality option in YouTube.
// @include        *youtube.com/watch*
// ==/UserScript==
//
// Based on Big Youtube Video by Sam Kellett
// http://userscripts.org/scripts/show/29946

(function() {
	
	var high = document.getElementById("watch-high-quality-link");
	var low = document.getElementById("watch-low-quality-link");
	
	high.addEventListener("click", function(e) {
		var movie = document.getElementById("movie_player");
		document.getElementById("watch-other-vids").style.marginTop = "710px";
		movie.height = 697;
		movie.width = 875;
		window.scrollTo(0,120);
		
	}, true);
	
	low.addEventListener("click", function(e) {
		var movie = document.getElementById("movie_player");
		document.getElementById("watch-other-vids").style.marginTop = "0";
		movie.height = 385;
		movie.width = 480;
		window.scrollTo(0,0);
	}, true);
	
	

})();