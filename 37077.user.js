// ==UserScript==
// @name           IMDb TV credits links to episodes
// @namespace      http://userscripts.org/users/67626
// @description    Links the phrase "X episodes" in TV series credits to the corresponding episode lists.
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/?*
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/reference*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/fullcredits*
// @exclude        http://pro.imdb.com/*
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/37077.meta.js
// @version        2014.01.18
// ==/UserScript==

(function() {
function linkEpisode(TD) {
	for (var i = 0; i < TD.length; i++) {
		var C = TD[i].innerHTML;
		var E = C.match(/\d episodes?/);
		if (E) {
			E = E.toString().split(" ")[1];
			TD[i].innerHTML = C.replace(E, E.link(TD[i].parentNode.getElementsByTagName("a")[0].pathname + "filmoseries#" + window.location.pathname.split("/")[2]));
		}
	}
}
if (window.location.pathname.match(/(?:reference|combined)$/) && document.title.charCodeAt(document.title.indexOf("\"", 2) + 2) == 40) {	//old design & TV series
	linkEpisode(document.getElementsByTagName("td"));
}
else if (document.title.match("TV Series")) {
	linkEpisode(Array.prototype.slice.call(document.getElementsByClassName("character")).concat(Array.prototype.slice.call(document.getElementsByClassName("credit"))));
}
})();