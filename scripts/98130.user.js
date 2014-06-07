// ==UserScript==
// @name           Fuel Radio - Now playing in title
// @namespace      http://userscripts.org/users/snoringfrog
// @description    Shows the currently playing song/artist in the title for Fuel Radio
// @include        http://www.fuelradio.fm/index.php
// ==/UserScript==

setTimeout('var quotes=\'"\'; var artist = document.getElementById("artist").getElementsByTagName("a")[0].innerHTML; var songTitle = document.getElementById("title").innerHTML; songTitle=songTitle.split(/"/); document.title = quotes + songTitle[1] + quotes + " - " + artist', 5000);

setInterval('var quotes=\'"\'; var artist = document.getElementById("artist").getElementsByTagName("a")[0].innerHTML; var songTitle = document.getElementById("title").innerHTML; songTitle=songTitle.split(/"/); document.title = quotes + songTitle[1] + quotes + " - " + artist', 20000);
