// ==UserScript==
// @name          Globe and Mail remove Banner Ad and Weather DIV
// @namespace     http://userstyles.org
// @description	  Removes the adbanner div from i use this, a software index.
// @author        Nicholas Cotton, based on a script by Dr. Rock
// @homepage      http://userscripts.org
// @include       http://theglobeandmail.com/*
// @include       https://theglobeandmail.com/*
// @include       http://*.theglobeandmail.com/*
// @include       https://*.theglobeandmail.com/*

// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); #attic,#atticPromo{display:none}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}