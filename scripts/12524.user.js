// Metafilter Pastel Comment Dividers
// version 0.1
// Mike Harris, Tuwa, VoidContext & Gina Trapani
// 2007-05-29
// Released to the public domain.
//
// ==UserScript==
// @name          Metafilter Pastel Comment Dividers
// @description   This darkens the "posted by" line using the sidebar color for each relevant Metafilter subsite, making a nice-looking divider to help separate comments.
// @include       http://*.metafilter.com/*
// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.2.1:
// Released: 2007-05-30.
// Now with magical Projects and Music goodness.  (Jobs doesn't have comments.)
//
// Version 0.2:
// Released: 2007-05-29.
// Revised with new code, different color, etc.
//
// Version 0.1:
// Released: 2007-05-29.
// Initial release.
// ==/RevisionHistory==

(function () {
	//EDIT ME
	if (location.href.indexOf("http:\/\/ask.metafilter.com\/")!=-1) var newstyle = "div.comments span.smallcopy { display: block; color: #eee; background: #B1CDB7; margin: -1px 1px -1px 1px; padding: 1px; }";
	if (location.href.indexOf("http:\/\/metatalk.metafilter.com\/")!=-1) var newstyle = "div.comments span.smallcopy { display: block; color: #eee; background: #444; margin: -1px 1px -1px 1px; padding: 1px; }";
	if (location.href.indexOf("http:\/\/www.metafilter.com\/")!=-1) var newstyle = "div.comments span.smallcopy { display: block; color: #eee; background: #D3D3F1; margin: -1px 1px -1px 1px; padding: 1px; }";
	if (location.href.indexOf("http:\/\/projects.metafilter.com\/")!=-1) var newstyle = "div.comments span.smallcopy { display: block; color: #eee; background: #1e4242; margin: -1px 1px -1px 1px; padding: 1px; }";
	if (location.href.indexOf("http:\/\/music.metafilter.com\/")!=-1) var newstyle = "div.comments span.smallcopy { display: block; color: #eee; background: #000; margin: -1px 1px -1px 1px; padding: 1px; }";
	//END EDIT ME

	var ss = document.createElement("style");
	var t = document.createTextNode(newstyle);
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	ss.appendChild(t);
	root.appendChild(ss);
})();