// last.fm Prettifier// version 0.1// Thomas Upton// 2006-01-11// Released to the public domain.//// ==UserScript==// @name          last.fm Prettifier// @description   Changes font family and link colors on last.fm// @include       http*://*last.fm/*// ==/UserScript==//// ==RevisionHistory==
// Version 0.2.2
// Released 2006-02-04
// Added rule for hover on tag clouds on Last.fm Beta
//
// Version 0.2.1
// Released 2006-01-15
// Changed @include to work for everyone.
//
// Version 0.2:
// Released 2006-01-14
// Now affects only tracks in the chart, and not the headers / titles.
// Added a new rule for the "Just Listened" track so you can see the link on hover.
//// Version 0.1:// Released: 2006-01-11.// Initial release.// ==/RevisionHistory==(function () {	//EDIT ME	var newstyle = ".lastChart table a { display: block ! important; } .lastChart table a:hover, #tagcloud a:hover {color:#D20039 ! important; } .lastChart table tr.now a:hover { color: #fff ! important; }";	//END EDIT ME	var ss = document.createElement("style");	var t = document.createTextNode(newstyle);	    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);	ss.appendChild(t);	root.appendChild(ss);})();