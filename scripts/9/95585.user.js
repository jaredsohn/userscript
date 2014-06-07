// Aim Star's One-Code-One-World Layout Fix for Firefox
// version 0.2.20110129.1209
// 2011-01-29
// Copyright (c) 2011, Sakda Preudtiwatdhana (Bronze Star as of Jan 2011)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey Firefox extension : http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Click on install.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Aim Star's One-Code-One World Layout Fix for Firefox
// @namespace      http://diveintogreasemonkey.org/download
// @description    Fix incorrect layout when displaying One Code One World site in Firefox
// @include        http://onecodeoneworld.aimstarnetwork.com/*
// @exclude        http://onecodeoneworld.aimstarnetwork.com/PrintReport/*
// ==/UserScript==


(function() {
/************************************************
* Fix overflow page header
************************************************/
	var css = "#Header {\n    width: 0px !important; \n  }";

	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	}
	else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	}
	else if (typeof addStyle != "undefined") {
		addStyle(css);
	}
	else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}

/************************************************
* Force opening a link in current tab
************************************************/
	var alinks = document.getElementsByTagName("a");
	for (var count=0; alinks.length-1; count++) {
		alinks[count].target = "_top";
	}
})();