// ==UserScript==
// @name            widen google IG
// @namespace       org.ocharake.matobaa.googleig
// @include         http://www.google.*/ig* 
//
// distributed at http://userscripts.org/scripts/show/8669
// ==/UserScript==

window.addEventListener("load", function() {
// hide with IG tabs
//	document.getElementById('nhdrwrap').style.display="none";
// hide without IG tabs
	document.getElementById('nhdrwrapsizer').style.height="auto"; // adopted to iGoogle
	document.getElementById('gbar').style.display="none";
	document.getElementById('gsea').style.display="none";
//	document.getElementById('new_user_demo').style.display="none";
// hide footer
	document.getElementById('footerwrap').style.display="none";
}, false);
