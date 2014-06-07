// ==UserScript==
// @name 	       famousobjectsfromclassicmovies.com cheater
// @include        http://famousobjectsfromclassicmovies.com/play*
// ==/UserScript==

function hint() {
	window.setTimeout(function(){
		if (typeof(window.g) != "undefined") {
			$("#movie_action_links_wrapper").css({
				"textAlign":"center",
				"fontSize":"18px",
				"color":"red"
			}).html(window.g.movie.name);
		}
		$("#next_box").live("click", function() {
			hint();
		});
	}, 2000);
}

if (window.addEventListener) {
	window.addEventListener('load', hint, false);
} else {
	window.attachEvent('onload', hint);
}
