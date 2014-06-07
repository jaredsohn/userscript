// ==UserScript==
// @name           Cleaner Google Homepage
// @namespace      http://userstyles.org
// @description    remove ads bellow/text on the right and center it
// @include        http://www.google.com
// @include        http://*.google.*
// @include        http://google.*
// ==/UserScript==


// by blez
(function () {
	var adbox0 = document.getElementById('fctr');  // center down ads
	var adbox1 = document.getElementById('sbl');   // right of searchbar stuff
	
	// add if you want.
	//var adbox2 = document.getElementById('ghead'); // add some space
	//adbox2.appendChild (document.createElement("br"));
	//adbox2.appendChild (document.createElement("br"));

	if (adbox0) adbox0.parentNode.removeChild(adbox0);
	if (adbox1) if (adbox1.childNodes[0]) adbox1.removeChild(adbox1.childNodes[0]); 
}());
