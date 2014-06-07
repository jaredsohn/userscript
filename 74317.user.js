// ==UserScript==
// @name           Dora.FM
// @namespace      
// @include        http://dora.fm*
// ==/UserScript==

tick();


function tick() {

var artist = document.getElementById("current-song-artist").innerHTML;
var song = document.getElementById("current-song-song").innerHTML;
if (artist != "Waiting for Pandora API..."){
top.document.title =  song + " by " + artist;
}else{
top.document.title = "loading...";
}
setTimeout(tick, 5000);
}

