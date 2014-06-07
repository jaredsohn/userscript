// ==UserScript==
// @name           Drudge Report Makeover
// @description    My favorite news site gets a minor makeover.  Drops the Verdana and gray bars.
// @include        http://drudgereport.com/*
// ==/UserScript==

// Shawn Nelson
// 10-24-2006
// like the script? let me know at shawn(at)ignited.tv

(function () {
	//EDIT ME
var newstyle = " tt { font-family: Arial ! important; font-size:80% ! important; } hr { visibility:hidden; padding-top: 3px; } br { margin: -5px;}";
	//END EDIT ME


	var ss = document.createElement("style");
	var t = document.createTextNode(newstyle);
	
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	ss.appendChild(t);
	root.appendChild(ss);
})();