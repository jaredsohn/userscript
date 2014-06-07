// ==UserScript==
// @name          Ad Slicer for MySpace
// @namespace     Adrian232
// @description   Removes all the ads, and the space they leave behind.
// @source        http://userscripts.org/scripts/show/3890
// @identifier    http://userscripts.org/scripts/source/3890.user.js
// @creator       Adrian (myspace.com/adrian232)
// @version       1.1.3
// @date          2008-10-9
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// @exclude       http://*myspace.com/
// @exclude       http://*myspace.com/index.cfm?fuseaction=splash*
// @exclude       http://del.B.myspace.com/*
// @exclude       http://deSK.myspace.com/*
// ==/UserScript==
// Created by Adrian: http://www.myspace.com/adrian232
// WARNING: Before you even THINK about changing the line(s) above and reposting this
// script as your own, remember that I have put a lot of hard work into this script and
// do not appreciate it getting stolen by amateur script writers!
// If you have something to add to this script, contact me on MySpace about it. If it's
// worthy of putting it in the next release, I will credit you.
// DO NOT UNDER ANY CIRCUMSTANCES RE-POST THIS SCRIPT WITHOUT CONTACTING ME FIRST!

/***********************\
|* User Script Updates *|
\***********************/
// http://userscripts.org/scripts/show/2296
var ScriptData =  {
	name: "Ad Slicer for MySpace",
	namespace: "Adrian232",
	description: "Removes all the ads, and the space they leave behind.",
	
	source: "http://userscripts.org/scripts/show/3890",
	identifier: "http://userscripts.org/scripts/source/3890.user.js",
	
	version: "1.1.3",
	date: Date.parse("October 9, 2008")
};
var UpdateChecking = false;
window.addEventListener("load", function(e) {
	try {
		unsafeWindow.UserScriptUpdates.requestAutomaticUpdates(ScriptData);
		UpdateChecking = true;
	} catch(e) {
		UpdateChecking = false;
		GM_log("User Script Updates is not installed. To receive notices of new updates, visit http://userscripts.org/scripts/show/2296");
	}
}, false);

(function() {
	// define these here for use later
	var frames = document.getElementsByTagName('iframe');
	var scripts = document.getElementsByTagName('script');
	var images = document.getElementsByTagName('img');
	var tables = document.getElementsByTagName('table');
	var divs = document.getElementsByTagName('div');
	
	/*
	var srch = document.getElementById('srch');
	var header = document.getElementById('header');
	var topnav = document.getElementById('topnav');
	*/
	
	var modify = null; // reusable object

	// first, extract them from the new "Home" page
	destroy(document.getElementById('squareAd'));
	destroyParent(document.getElementById('marketingcontent'));
	destroy(document.getElementById('advert'));
	destroy(document.getElementById('ad-wrap'));
	destroy(document.getElementById('leaderboardRegion'));
	destroy(document.getElementById('tkn_leaderboard'));
	destroy(document.getElementById('tkn_leaderboardDiv'));
	destroy(document.getElementById('ctl00_Main_ctl00_InfoBar1_pnlAdSpot'));
	destroy(document.getElementById('googleads'));
	destroy(document.getElementById('googlead'));
	destroy(document.getElementById('googleadtest'));
	destroy(document.getElementById('rightlinks'));
	/* // These are handled below
	destroy(document.getElementById('ctl00_Main_ctl00_CMS_ProfileHome_gads'));
	destroy(document.getElementById('ctl00_Main_ctl00_CMS_ProfileHome_Gads_A'));
	destroy(document.getElementById('ctl00_Main_ctl00_CMS_ProfileHome_Gads'));
	destroy(document.getElementById('ctl00_Main_ctl00_ProfileHome_gads'));
	*/

	// loop thru all SCRIPT tags that load ads
	for (var y = 0; y < scripts.length; y++) {
		var t = scripts[y];
		
		var n = scripts[y].nextSibling;
		// skip over text nodes
		//for (n = scripts[y].nextSibling; n && n.nodeName == "#text"; n = n.nextSibling);
		
		//t.className = "1";	// debug
		/* There are 2 kinds of scripts MySpace uses:
		 * 1) <script src="blahblah.js"></script> (this one has src defined)
		 * 2) <script> some.javascript.here(); </script> (this one doesn't)
		 *
		 * And then there are Google ads:
		 * 3) <script src="http://pagead[0-9].googlesyndication.com/..."></script>
		 */
		// ignore any of type 2 that don't contain the oas_ad() function
		if (!t.src && !t.text.match(/(?:oas_ad|sdc_wrapper)\(/))
			continue;
		//t.className = "2";	// debug
		// ignore all valid myspace scripts
		if (t.src.match(/x\.myspace\.com/) ||
			t.src.match(/x\.myspacecdn\.com/) ||
			t.src.match(/cache\.static\.userplane\.com/) || // chat script
			t.src.match(/\/WebResource.axd/)
			)
			continue;
		//t.className = "3";	// debug
		// if the next sibling is a script, then stop here
		if (!n || n.nodeName == "SCRIPT")
			continue;
		//t.className = "4";	// debug
		// destroy the next sibling
		destroy(n);
		destroyParent(t);
		//t.className = "5";	// debug
	}
	
	// dirty id's
	for (var y = 0; y < divs.length; y++) {
		if (!divs[y].id) continue;
		if (divs[y].id.match(/_[gG]ads/) || divs[y].id.match(/ad-wrap/))
			destroy(divs[y]);
		if (divs[y].id.match(/ad-hdr/) ||
			(divs[y].firstChild && divs[y].firstChild.nodeType == Node.TEXT_NODE && divs[y].firstChild.nodeValue == "Sponsored Links"))
			destroyParent(divs[y]);
	}
	
	// the "advertisement" image is a dead giveaway
	for (var y = 0; y < images.length; y++) {
		if (images[y].src.match(/advertisement/)) {
			destroyParent(images[y]);
			destroy(images[y]);
		}
	}
	
	// destroy all frames, JIC
	for (var y = 0; y < frames.length; y++)
		destroy(frames[y]);
	
	// un-hide special nodes
	for (y = 0; y < tables.length; y++) {
		var t = tables[y];
		if (t.className == "sidenav") {	// for the side navbar in mail
			for (var p = t.parentNode; p; p = p.parentNode) {
				if (p.nodeName == "TABLE") {
					unhide(p);
					unhide(p.parentNode);
					if (p.previousSibling) // the blank table before it, too
						unhide(p.previousSibling.previousSibling);
					break;
				}
			}
		}
	}
		
	// destroy the parent node
	function destroyParent(node) {
		if (!node) return;
		var p = node.parentNode;
		if (p&& p.id != "content" && // exclusions JIC
				p.id != "contentWrap" &&
				p.id != "container" &&
				p.id != "SplashContentWrap" &&
				p.id != "splash_profile" &&
				p.id != "photo_wrap" &&
				p.id != "photo_list" &&
				p.id != "photoLeft" &&
				p.id != "mainContentBlock" &&
				p.id != "ctl00_Head1" &&
				p.id != "header" &&
				p.id != "main" &&
				p.id != "mainContent" &&
				p.id != "body" &&
				p.id != "nav" &&
				p.className != "col_1" &&
				p.className != "col_2" &&
				p.className != "col_3" &&
				p.id != "bfc_LeftColumn" &&
				p.id != "rightRail" &&
				p.id != "whosOnlineDiv" &&
				p.id != "srch" &&
				p.id != "searchmain" &&
				p.id != "blog_content" &&
				p.id != "groupsnarrowleft" &&
				p.id != "books_skinny" &&
				p.id != "headControls" &&
				!(isPage("home") && (p.id == "col1" || p.id == "col2" || p.id == "col3")) &&
				p.id != "aspnetForm" && // form for picture comments
				p.nodeName != "BODY" && // don't destroy the BODY tag
				p.parentNode && // or any child of the BODY
				p.parentNode.nodeName != "BODY" &&
				p.parentNode.nodeName.id != "body" &&
				!containsTdText(p))
			destroy(p);
	}
	
	// destroy the node and all its children
	function destroy(node) {
		if (!node) return;
		for (var y = 0; y < node.childNodes.length; y++) {
			var p = node.childNodes[y];
			if (p.style)
				p.style.setProperty('display', 'none', 'important');
		}
		if (node.style)
			node.style.setProperty('display', 'none', 'important');
		GM_log("Destroying Node: " + node.tagName + "#" + node.id + "." + node.className);
	}
	
	function unhide(node) {
		if (node && node.style) {
			if (node.nodeName == "TABLE")
				node.style.setProperty('display', 'table', 'important');
			else if (node.nodeName == "TD")
				node.style.setProperty('display', 'table-cell', 'important');
			else if (node.nodeName == "TR")
				node.style.setProperty('display', 'table-row', 'important');
			else
				node.style.setProperty('display', 'block', 'important');
		}
	}
	
	function containsTdText(node) {
		if (node) {
			cells = node.getElementsByTagName("TD");
			for (var i = 0; i < cells.length; i++)
				if (cells[i].className == "text")
					return true;
			return false;
		}
	}
	
	function isPage(name) {
		if (typeof name == "RegExp") {
			search = name;
		} else {
			if (name == "home")
				search = /fuseaction=user[^\.]*$/i;
			if (name == "videos")
				search = /^https?:\/\/vids\.myspace\.com\//i;
			if (name == "profile")
				search = /myspace\.com\/([0-9a-zA-Z]+|index\.cfm\?fuseaction=user\.viewprofile[^_]*)$/i;
		}
		if (search && document.location && document.location.href) {
			if (document.location.href.match(search))
				return true;
			return false;
		} else
			return false;
	}
})();

