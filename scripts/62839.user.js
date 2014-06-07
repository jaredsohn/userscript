// ==UserScript==
// @name           Joe Monster Add Removal (AKA JoeMonster)
// @namespace      SyZer
// @description    Disable adds in JoeMonster
// @author         Lukas "SyZer" Gintowt (http://syzer.blogspot.com/)
// @version        1.1
// @include        http://www.joemonster.org/*
// @licence        GNU licence
// ==/UserScript==

var adds1 = document.getElementById("prawa_glowna");//TODO as table->foreach
var adds2 = document.getElementById("main_billboard");
var adds3 = document.getElementById("sponsorowane-glowna");
var main = document.getElementById("main_glowna");

var removeAdds = function() {
	if (adds1 && adds2 && adds3 && main) {
		main.style.width = "740px";
		adds1.style.display = "none";
		adds2.style.display = "none";
		adds3.style.display = "none";
		//main.style.marginRight = "0px";
	}
}

main.addEventListener("DOMSubtreeModified", removeAdds, true);
removeAdds();
//this is a simple script - made for educational! purpouses
//log&participate in JoeMonster.org - The Best Site in Universe
//WebMasters deserve your support.
