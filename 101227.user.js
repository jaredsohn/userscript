// ==UserScript==
// @name           fix hatzer.at
// @namespace      hatzer.at
// @description    fix hatzer.at bugs
// @include        http://www.hatzer.at/forum/index.php*
// ==/UserScript==
function toggleDisp() {
	var bboben = document.getElementById("bannerbereich_oben_728x90");
	if(bboben.style.display != "none") {
		oldDisp = bboben.style.display;
		bboben.style.display="none";
	} else {
		bboben.style.display=oldDisp;
	}
}
var sim = document.getElementById("search");
sim.addEventListener("click", toggleDisp, true);