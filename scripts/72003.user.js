// ==UserScript==
// @name           fbzw scavenge script
// @description    facebook zedwars scavenge script for lazy clicker
// @include        http://www.zedwars.com/fb/scavenging.php*
// ==/UserScript==

var  contents = document.getElementById("content");
var link;
if(contents){
	if(contents.textContent.match('You scavenge.*')){
		link = contents.getElementsByTagName("a")[0].href;
		setTimeout(scavenge,250);//use a delay
		//location.href = link;//or no delay
	}
}
function scavenge(){
	location.href = link;
}
