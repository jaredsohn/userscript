// del.icio.us Prettifier
// version 0.1
// Gina Trapani
// 2005-11-29
// Released to the public domain.
//
// ==UserScript==
// @name          del.icio.us Prettifier
// @description   Changes font family and link colors on del.icio.us.
// @include       http://del.icio.us/*
// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.3
// Released: 2006-01-16
// Background link color for posts, new tag hover rules
//
// Version 0.2:
// Released: 2006-01-03.
// Modified release by Thomas Upton.
// Includes new font family, new link colors, and support for visited links in the main areas of the site.
//
// Version 0.1:
// Released: 2005-11-29.
// Initial release.
// ==/RevisionHistory==

(function () {
	//EDIT ME
	var newstyle = "body { font-family:'Lucida Grande', Arial, Verdana ! important; font-size:110% ! important; color: #666 ! important; } a { color:#39c ! important; } .posts li .desc a:visited, #fp-recent ol a:visited, #fp-popular ol a:visited {color:#aaa ! important; } .posts li .desc a:hover, #fp-recent ol a:hover, #fp-popular ol a:hover { color:#fff ! important; background-color: #39c ! important; text-decoration: none ! important; } .posts li .desc a:visited:hover, #fp-recent ol a:visited:hover, #fp-popular ol a:visited:hover {color:#fff ! important; background-color: #aaa ! important; text-decoration: none ! important; } .meta a { color:#aaa ! important; } .meta a.tag:hover { color: #39c ! important; background-color: transparent ! important; text-decoration: underline ! important; } #header { background-color:#fff ! important; } .alwaysblue a:visited { color:#39c ! important; }";
	//END EDIT ME

	var ss = document.createElement("style");
	var t = document.createTextNode(newstyle);
	
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	ss.appendChild(t);
	root.appendChild(ss);
})();

