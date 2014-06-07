// ==UserScript==
// @name          RDI / Radio-Canada.ca Direct Media Links
// @description   Replaces media links popup and ads with direct links to the files.
// @include       http://*radio-canada.ca/*
// ==/UserScript==

var callerReg = /callMediaPlayer\(['"]([^'"&]+)/;
var popupReg = /window\.open\(["']http:\/\/[^.]*\.?radio-canada.ca\/[^?]+\?lien=([^'"&]+)/;
var lMatch;

for (var i=0; i<document.links.length; i++) {
	if (!document.links[i].hasAttribute("onclick")) {
		lMatch = document.links[i].href.match(popupReg);
		
		if (lMatch != null)
			document.links[i].href = lMatch[1];
		
		continue;
	}
	
	lMatch = document.links[i].attributes.getNamedItem("onclick").value.match(callerReg);
	
	if (lMatch == null)
		lMatch = document.links[i].attributes.getNamedItem("onclick").value.match(popupReg);
	
	if (lMatch != null) {
		document.links[i].href = lMatch[1];
		document.links[i].removeAttribute("onclick");
	}
}