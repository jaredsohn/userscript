// Defangs nicks which bork the site
// Version: 0.0.5
// 2009-05-05
// Copyright (c) 2009 f00m@nB@r <foomanbar@gmail.com>
// Released under the GNU Public Licence
// http://www.gnu.org/copyleft/gpl.html
//
// CHANGELOG:
//   2009-05-05 Fix @version; Fix @include
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts.
//
// ==UserScript==
// @name           SE nick defanger
// @namespace      http://sensibleerection.com/profile.php/13614
// @description    defangs nicks
// @include        http://sensibleerection.com/*
// @include        http://*.sensibleerection.com/*
// @version        0.0.5
// ==/UserScript==
const senickdefangerVersion = "0.0.5";
myRe = new RegExp("kap.*leert", "g");
document.body.innerHTML = document.body.innerHTML.replace(myRe,"ASS");
myRe = new RegExp("k.......a.......p.......l.......e.......e.......", "g");
document.body.innerHTML = document.body.innerHTML.replace(myRe, "ASS");
(function(){
	var assholes = new Array(
	"//a[@href='/profile.php/33786']",
	"//a[@href='/profile.php/33994']",
	"//a[@href='/profile.php/33987']", // kapleert
	"//a[@href='/profile.php/33787']" // <img src="i.jpg">
	);
	var ass,elem,i,j;
	for (j = 0; j < assholes.length; ++j) {
		ass = document.evaluate(assholes[j], document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (elem = null, i = 0; (elem = ass.snapshotItem(i)); ++i) {
			elem.firstChild.nodeValue = "ASSHOLE";
			elem.style.backgroundColor = "#ffaaaa";
		}
	}
})();