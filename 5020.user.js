// Citation Popuper
// (cc) by-nc 2006 Pandora
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          Citation Popup
// @namespace     *
// @description   Make cites popup better
// @include       *
// ==/UserScript==

function eventTrigger (e) {
	if (! e)
		e = event;
	return e.target || e.srcElement;
}

function openCitation(e) {
	var cite = eventTrigger(e)
	if(cite.cite) {
		var popup = window.open(cite.cite,"citationPopup")
		if(!popup) {
			document.location = cite.cite
		}
	}
}

function Loady() {
	var cites = document.getElementsByTagName("q")

	for (i=0;i<cites.length;++i) {
		var cite = cites[i]
		cite.addEventListener('click',openCitation,true)
	}
	
	cites = document.getElementsByTagName("blockquote")

	for (i=0;i<cites.length;++i) {
		var cite = cites[i]
		cite.addEventListener('click',openCitation,true)
	}
}

window.addEventListener('load',Loady,true);
