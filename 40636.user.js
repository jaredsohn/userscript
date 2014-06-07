// FlickrStayInCommons
// version 0.2.2
// 2009-08-04
// Copyright (c) 2009, Ryan Gallagher <clickykbd@indicommons.org>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF THIS SCRIPT, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  This script lacks an auto-update
// prompt.
//
// Go here for latest version:
// http://userscripts.org/scripts/show/40636
// 
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------
// What It Does:
//
// This script fills a UI hole in Flickr.  The features exist but
// photos that belong to "The Commons" (http://www.flickr.com/commons)
// were lacking some fun navigation options.  The quick link to commons
// search is also included.
//
// www.flickr.com:
//  - adds "The Commons" to dropdown of search options in header
//
// www.flickr.com (photo page):
//  - checks if it is a "Commons Photo", if so adds tag icons/links
//    for 'commons only' tag browsing.  User can configure this link
//    to go to commons/tags or search result.
//
// --------------------------------------------------------------------
// ChangeLog:
//
// 20090117 v0.2
//	* Updated to not conflict with flickr_tag_convergence script.
//	* Some node discovery converted to XPath methods.
//	* Migrated image data into CSS definitions.
//	* Added user configurable base-url for Commons tag items.
// 20090117 v0.2.1
//	* Bug-Fixed search action, now actually returns results if you
//	  pre-enter text before clicking "The Commons"
// 20090804 v0.2.2
//      * Bug-Fixed search action, flickr rolled new search UI that
//        was causing issues.  Removed 'w=all' argument in URL.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           FlickrStayInCommons
// @namespace      http://www.indicommons.org
// @description    Add Commons Search (menu dropdown), Tag Links (on photo page).
// @include        http://*.flickr.*/*
// @include        http://flickr.*/*
// ==/UserScript==
//
// --------------------------------------------------------------------
// User Configurable Preferences

// Change base-url of the Commons Tag links:
// Uncomment the line you wish to use, tags page vs. search result.
var commonsTagBase = '/commons/tags/';
//var commonsTagBase = '/search/commons/?m=tags&s=rec&ct=6&ss=2&q=';

// --------------------------------------------------------------------
// Script Globals

// set up for intl (values pulled from http://flickr.com/commons)
var strings = new Array();
strings['The Commons'] = new Array();
strings['The Commons']['zh-hk'] = 'The Commons';
strings['The Commons']['de-de'] = 'Die Commons';
strings['The Commons']['en-us'] = 'The Commons';
strings['The Commons']['es-us'] = 'El patrimonio público';
strings['The Commons']['fr-fr'] = 'Les Organismes publics';
strings['The Commons']['ko-kr'] = 'The Commons';
strings['The Commons']['it-it'] = 'The Commons';
strings['The Commons']['pt-br'] = 'The Commons';

// search menu globals
var lang = 'en-us';
var searchMenu = false;
var searchMenuCount = 0;

var dataRing;
var dataRingHover;
var commonsCSS;
var commons;
var commonsImg;

// function for initing globals this script uses on photo pages.
var initCommonsPhoto = function() {

	// encoded image data, so we don't have to pull from a server
	dataRing = 'data:image/gif;base64,R0lGODlhEAAQALMAAODi4O7v7urr6uDi39nb2Nja19bY1d3e3Pf39u/v7vr6+vf39////wAAAAAAAAAAACH5BAEAAAwALAAAAAAQABAAQARfkMlJqyTGKKsykciRAYmiJEB2IFNQZDBcBFUgxsZBT0OWWInMQCIYLSiLlEFQQQgGBMJAwLIwnFAp1eLCyXaMogFwnCQzTAZGw/FIeoZfJWgYXm8kE0pVldi8OlaCFBEAOw=='; // grey circle
	dataRingHover = 'data:image/gif;base64,R0lGODlhEAAQALMAADRrND9zP0J1QlWDVWaQZmeQZ5m1ma7Erq3Drdbh1ubt5v///wAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAQABAAQARdcMlJqxQAKKuykMmQFYeiHEU2JBMSZDAcIBUixsBAT0R2WIcMQWIYsSaJFMBQSRgIAgHBcLQ4oVKqxYWT7RZFQKG6SGaYC4yG45H0AL9KEDAs30gmlIps6+osgBYRADs='; // green circle

	// CSS definitions, 'icon' and 'globe' flickr definitions also used for
  // spacing and turning off link decorations.
	commonsCSS = '\
.commons {\n\
}\n\
.commonsCircle {\n\
background-image:url(' + dataRing + ');\n\
}\n\
.commonsCircleActive {\n\
background-image:url(' + dataRingHover + ');\n\
}\n\
';

	// build a re-usable link element
	commons = document.createElement('a');
	commons.setAttribute('href', commonsTagBase); // value in config
	commons.setAttribute('class', 'globe commons');
	commons.setAttribute('onmouseout', 'this.childNodes[0].setAttribute("class", "icon commonsCircle");');
	commons.setAttribute('onmouseover', 'this.childNodes[0].setAttribute("class", "icon commonsCircleActive");');

	// build a re-usable base img element.
	commonsImg = document.createElement('img');
	commonsImg.setAttribute('src', 'http://l.yimg.com/g/images/spaceout.gif');
	commonsImg.setAttribute('height', '16');
	commonsImg.setAttribute('width', '16');
	commonsImg.setAttribute('border', '0');
	commonsImg.setAttribute('class', 'icon commonsCircle');

	return;
}

// --------------------------------------------------------------------
// Script Functions

// function for appending a style block containing css definitions
var appendStyles = function (css) {
  var myStyle = document.createElement('style');
	myStyle.setAttribute('type', 'text/css');

	//multi-line string
	myStyle.innerHTML = '<!-- ' + css + ' -->';

  head = document.getElementsByTagName('HEAD')[0];
	head.appendChild(myStyle);
	return;
}

// string lookup for multi-lang support
var _strings = function(str) {
	if (strings[str] && strings[str][lang]) {
		return strings[str][lang];
	}
	return str;
}

// function for updating the language id
var updateLanguage = function() {

	if (!langFooter) var langFooter = document.getElementById('LanguageSelector');
	if (!langFooter) return;

	// xpath grab the selected language link.
	var xp = '//node()[@id="LanguageSelector"]/descendant::a[contains(@class, "selected")]';
	var xpr = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (xpr.snapshotLength != 1) return; // whoops, use defaults.

	// match the language string id out of the url.
	var re = new RegExp('lang=([a-z]{2}-[a-z]{2})&');
	var match = re.exec(xpr.snapshotItem(0).getAttribute('href'));
	if (match[1]) lang = match[1];
	return;
}

// function for appending links to search
var addLinkToSearchsMenu = function(name, link, onclick) {
	if (!searchMenu) searchMenu = document.getElementById('candy_nav_menu_search');
	if (!searchMenu) return false;
	var someSearchLink = document.createElement('a');
	someSearchLink.href = link;
	someSearchLink.setAttribute('title', name);
	if (onclick) {
		someSearchLink.setAttribute('onclick', onclick);
	}
	if (searchMenuCount == 0) {
		someSearchLink.className = 'menu_item_line_above';
		searchMenuCount++;
	}
	someSearchLink.appendChild(document.createTextNode(name));
	searchMenu.appendChild(someSearchLink);
	return;
}

// function bool test for Commons Photo Page (kinda painful, no easy url way)
// assume commons photo if we discover an img tag with appropriate class
var isCommonsPhoto = function() {
	var xp = 'count(//img[contains(@class, "fs-icon_no_known_restrictions")])';
	var xpr = document.evaluate( xp, document, null, XPathResult.ANY_TYPE, null);
	if (xpr.numberValue >= 1) {
		return true;
	}
	return false;
}

// function get a snapshot of the "tag globe" A nodes
// grab them all, but be sensitive to only look for divs in the known
// containers, the fact they have IDs should mean they are unique though.
var getGlobesSnapshot = function() {
	var xp = ''
	+ '//div[@id="thetags"]/div[contains(@id,"tagdiv")]/a[@class="globe"]'
	+ '|'
	+ '//div[@id="themachinetags"]/div[contains(@id,"tagdiv")]/a[@class="globe"]';
	return document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// function add commons tag links & icons
// expects a xpath snapshot result (of the "tag globes" specifically)
var addCommonsTagLinks = function(snap) {

	// step through the "globe" elements and insert the commons things.
	for (var i = 0; i < snap.snapshotLength; i++) {

		// clone and modify the template elements
		var myCommons = commons.cloneNode(true);
		var myCommonsImg = commonsImg.cloneNode(true);

		// update title from globe.
		myCommons.setAttribute( 'title', _strings('The Commons') + ': ' + snap.snapshotItem(i).getAttribute('title') );

		// updat image alt from globe.
		myCommonsImg.setAttribute( 'alt', commons.getAttribute('title') );

		// update destination url from globe partial url.
		var match = snap.snapshotItem(i).getAttribute('href').match('^/photos/tags/(.*)$');
		myCommons.setAttribute('href', myCommons.getAttribute('href') + match[1]);

		// attach based on insertion before the next sibling of the globe.
		// i.e. attempt to always be after the globe.
		myCommons.appendChild(myCommonsImg);
		snap.snapshotItem(i).parentNode.insertBefore(myCommons, snap.snapshotItem(i).nextSibling);
	}
	return;
}

// --------------------------------------------------------------------
// Script Execution

// insert search link, do this on every flickr page.
updateLanguage();
addLinkToSearchsMenu(_strings('The Commons'), '/search/commons/', '_do_header_search(null, null, \'/search/commons/\', \'\'); return false;');

// insert commons tag graphics/links, only on commons photo pages.
if (isCommonsPhoto()) {
	initCommonsPhoto();
	appendStyles(commonsCSS);
	addCommonsTagLinks(getGlobesSnapshot());
}
