// ==UserScript==
// @name        iBurst Link Information
// @namespace   http://nerve.org.za/
// @description Fixes rendering of signal strength indicator on Kyocera iBurst modem Link Information page
// @grant		none
// @include     http://192.168.250.*/link-information.html
// @version     1.2
// ==/UserScript==
(function() {

var allimgs;

allimgs = document.getElementsByTagName('IMG');
for (var i = 0; i < allimgs.length; i++) {
	if(allimgs[i].src.indexOf("yellow.gif") > -1) {
		allimgs[i].height = 12;
	}
}

})();
