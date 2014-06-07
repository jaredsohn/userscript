// ==UserScript==
// @name        TesurfSkipper
// @namespace   http://userscripts.org/users/158400
// @description Skip automatically Ads (TesurfSkipper)
// @include     http://www.tesurf.com/surf.php?
// @version     0.1
// @grant 		none
// ==/UserScript==

unsafeWindow.areYouReallySure=true;
var lien;
function checkpub() {
	if(document.getElementById('clicker')) {
	var tds = document.getElementById("clicker").getElementsByTagName("td");
	var correctAnswer = tds[1]..getElementsByTagName("a");
	correctAnswer.click();
	}
}
setInterval(checkpub,1500);