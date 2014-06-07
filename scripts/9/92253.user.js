// ==UserScript==
// @name           Google Reader - hide unread count
// @version        4
// @namespace      http://mazzlabs.com, http://www.rithish.in
// @author         John Mazz, adapted from Rithish
// @description    Remove/Hide unread count from Google Readers sidebar, top area and title
// @include        http*://www.google.*/reader/*
// @URL            http://userscripts.org/scripts/show/92253
// ==/UserScript==

function titleFlush(){
	document.title = "Google Reader";
}

var i;
var span_elems = document.getElementsByTagName("span");
var div_elems = document.getElementsByTagName("div");
var tmp;

for (i=0; i<div_elems.length; i++) {
	if(div_elems[i].id.match(/viewer-all-new-links/)){
		div_elems[i].style.display = "none";
	}
}
for (i=0; i<span_elems.length; i++) {
	if(span_elems[i].id.match(/-unread-count$/)){ 
		span_elems[i].style.display = "none";
	}		
}

document.addEventListener('click', titleFlush, false)
window.addEventListener('keypress', titleFlush, false)
setInterval(titleFlush, 9999)
titleFlush();
document.title = "Google Reader";