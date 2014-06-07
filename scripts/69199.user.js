// ==UserScript==
// @name	Pardus New Alliance Messages
// @namespace	Pardus New Alliance Messages
// @description adds a new button to unread AMs
// @include	*.pardus.at/messages_alliance.php*
// @version	0.9
// ==/UserScript==

//Parameter
var univers = document.URL.substr(document.URL.indexOf("//")+2,3);


getNewAMs();


function getNewAMs() {
var newImg = "http://static.pardus.at/img/stdhq/new.jpg";
var lastAM = getLastAM();
var a;
var ah;
var d;
var f = true;

a = document.getElementsByTagName("A")

for(i=0;i<a.length;i++) {
	ah = a[i].href;
	if(ah==lastAM) return;
	if(ah.indexOf("repam") > -1) {
		if(f) {
			setLastAM(ah);
			f = false;
		}
		a[i].parentNode.parentNode.parentNode.rows[0].cells[1].innerHTML = "<img src=\"" + newImg + "\"/> " + a[i].parentNode.parentNode.parentNode.rows[0].cells[1].innerHTML;		
	}
}
}

function setLastAM(lam) {
	GM_setValue(univers+"userjs_lastAM", lam);
}

function getLastAM() {
return GM_getValue(univers+"userjs_lastAM");
}
