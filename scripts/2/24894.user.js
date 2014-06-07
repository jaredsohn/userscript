// ==UserScript==
// @name          Wikipedia - Easy Read
// @namespace     http://userscripts.org
// @description	  Big screen 1100px nice read
// @author        Blanka
// @homepage      http://userscripts.org/scripts/show/24894
// @include       http://wikipedia.org/*
// @include       https://wikipedia.org/*
// @include       http://*.wikipedia.org/*
// @include       https://*.wikipedia.org/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); body {background-image: url();} #column-one, #footer { display: none; } #content { border:0; left:50%; margin:0 0 0 -550px; width:1100px; background-color: #FFF;} #bodyContent {border:0; margin: 0; max-width: none;text-align: justify;} p {font-size:17px; line-height:1.6em; font-family:Times; text-align:left; margin-bottom: 1em;} a {color: #579;} a.new {color: #933;} .reference a {font-size:0.6em; color: #579;} html .thumbcaption {font-size:12px; line-height:1.6em;} li {font-size:14px; line-height:1.6em;} .firstHeading {margin-bottom: 0.3em; line-height: 1.2em; padding-bottom: 0pt;} h1 {font-size: 220%;} h2 {font-size: 160%;} #bodyContent a.external, #bodyContent a.extiw, #bodyContent a.extiw:active {color: #555;} .references-small li {font-size:12px; line-height:1.4em;} .navbox-title, table.navbox th {background-color: #EEE;} #imageLicenseIcon.boilerplate {background-color: #FFF;} .toc li {line-height:1.4em;} .ambox, .boilerplate, .messagebox, .messagebox.cleanup.metadata, #imageLicenseIcon { display: none; } ";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
