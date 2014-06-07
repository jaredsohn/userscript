// ==UserScript==
// @name        Hide Cory
// @namespace   photropik
// @description Hide Cory Doctorow Posts
// @include     http://boingboing.net/
// @version     1
// @grant       none
// ==/UserScript==


function moron(){

// get all the links 
var els = document.getElementsByTagName("a");

// for each link search for...
for (var i = 0, l = els.length; i < l; i++) {
    var el = els[i];
	// fuck off
    if (el.href === 'http://boingboing.net/author/cory_doctorow_1') {
		// up the tree once
		var oneUp = el.parentElement;
		// and then one up from there
		var twoUp = oneUp.parentElement;
		// hide it		
		twoUp.style.display = 'none';
    }
}
console.log("kill cory called");
setTimeout(moron,500);
}



document.addEventListener("onload", moron(), true);