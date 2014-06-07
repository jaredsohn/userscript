// ==UserScript==
// @name			BetaSeries Torrentz.com Links
// @namespace		betaseries
// @description		The serie's title becomes a link to the torrentz.com search engine
// @include         http://www.betaseries.com/compte/episodes*
// @match			http://www.betaseries.com/compte/episodes*
// @version			1.1.0
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	$(document).ready(function(){
		if ( $('tr.head a').length > 0 ) {
			$('tr.head a').each(function(){
				$(this).css('color', '#ff0000');
				$(this).attr('href', 'http://www.torrentz.com/search?q=' + $(this).text());
				$(this).attr('target', '_blank');
			});
		} else {
			window.setTimeout(main, 100);
		}
	});
}

addJQuery(main);