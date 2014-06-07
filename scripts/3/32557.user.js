// ==UserScript==
// @name newtab
// @include *
// ==/UserScript==

function new_tab(){
var anchs = document.getElementsByTagName("a");
for (var i=0; i<anchs.length; i++) {
		var anch = anchs[i];
		anch.target="_blank";
	}
}
window.onload = function{
	new_tab();
}