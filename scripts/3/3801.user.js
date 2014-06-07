// Heise Ad-Cleaner user script
// version 0.1 BETA!
// 2005-11-16
// Copyright (c) 2005, Daniel Hohenberger
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Heise Ad-Cleaner", and click Uninstall.
//
// --------------------------------------------------------------------
//
// This script is an extension of the version developed by cpuidle.
// See his Weblog: http://www.cpuidle.de/blog/?p=5
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Heise Ad-Cleaner
// @description Entfernt Werbung von den Heise-Seiten
// @include *heise*
// ==/UserScript==

(function() {

// on load or realtime?
var onLoad = false;

if (onLoad) {
// on load
window.addEventListener("load", onDocumentLoad, false);
} else {
// realtime
onDocumentLoad();
}

function onDocumentLoad(){
	try{
		var elements = document.getElementsByTagName('div');
		for (var i=elements.length-1; i>=0; i--){
			var el = elements[i];
			var attr = el.getAttribute("class");
			
			if (
				(attr == "adbottom")
				|| (attr == "adbottom_itmarkt")
				|| (attr == "contentbanner")
				|| (attr == "skyscraper")
				|| (attr == "heiseadvert")
				|| (attr == "werbung")
				|| (attr == "leaderboard")
				){
				el.parentNode.removeChild(el);
			}
		}
	} catch (e){
		GM_log("exception!");
	}
	try{
		var elements = document.getElementsByTagName('span');
		for (var i=elements.length-1; i>=0; i--){
			var el = elements[i];
			//
			var attr = el.getAttribute("style");
			
			if (el.style.textAlign=="left"){
				el.parentNode.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode.parentNode);
			}
		}
	} catch (e){
		GM_log("exception!");
	}
}

})();