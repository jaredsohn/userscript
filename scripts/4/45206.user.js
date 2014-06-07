// ==UserScript==
// @name           Dumpert - Pink Links
// @namespace      http://userscripts.org/users/4613
// @description    Changes colour of hyperlinks to purple to make them stand out a bit more.
// @include        http://www.dumpert.nl/*
// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2009-03-25.
// Initial version
// ==/RevisionHistory==


(function () {
	// Hyperlinks in pink, purple after visit
	var newstyle = " a { color:#FF0099 ! important } a:visited {color:#990044 ! important; }";

	var ss = document.createElement("style");
	var t = document.createTextNode(newstyle);
	
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	ss.appendChild(t);
	root.appendChild(ss);
})();
