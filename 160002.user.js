// ==UserScript==
// @name       	True random episodes
// @namespace  	http://userscripts.org/scripts/show/155587
// @version    	1.1
// @match      	http://www.southparkstudios.se/
// @run-at		document-start
// @grant		none
// ==/UserScript==


if(document.location == "http://www.southparkstudios.se/"){

	var season = Math.floor(Math.random()*16)+1;
	var episode = Math.floor(Math.random()*16 )+1;

	
	if(season.toString().length == 1)
		season = "0" + season;
	if(episode.toString().length == 1)
		episode = "0" + episode;
	
	document.location = "http://www.southparkstudios.se/full-episodes/s"+ season + "e" + episode;
}
