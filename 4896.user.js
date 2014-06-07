// ==UserScript==
// @name           Tapuz Ad Page Removal
// @namespace      
// @description    Disable the ad-page you sometimes have to go through in Tapuz
// @include        http://*.tapuz.co.il/*
// ==/UserScript==

addText = "&maavaronRequest=1";

allLinks = document.getElementsByTagName("a");
for (var i=0; i<allLinks.length; i++) {
	if (allLinks[i].href.match(/tapuz\.co\.il.*\?/)) {
		allLinks[i].href = allLinks[i].href + addText;
	}
}


allForms = document.getElementsByTagName("select");
for (var i=0; i<allLinks.length; i++) {
	if (allForms[i].name == "moveforum") {
		allOpts = allForms[i].getElementsByTagName("option");
		for (var j=0; j<allOpts.length; j++) {
			if (allOpts[j].value == parseInt(allOpts[j].value)) {
				allOpts[j].value += addText;
			}
		}
	}
}