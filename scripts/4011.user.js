// ed2klinklister
// version 0.1
// 2006-02-23
//
// Copyright (c) 2006 the mad scientist, the.mad.scientist@gmx.net
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Licensed under Creative Commons Attribution
// http://creativecommons.org/licenses/by/1.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ed2klinklister", and click Uninstall.
//
// * Instruction text lifted from Mark Pilgrim's Butler
// * http://diveintomark.org/projects/butler/
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// The script scans pages for ed2k: links. It collects these links
// and displays them as text in a (closable) popup box in the upper right
// hand corner of the page. I use it to have all the links that are
//  scattered across e.g. a forumpage in one place. That makes it easier
// to copy-and-paste them into a mail, eMule etc.
// Modify it anyway you like. Restrict it to run only on your emule-sites,
// display links as clickable HTML-links, whatever.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ed2klinklister
// @description	  grabs ed2k:-links from page and displays them
// @include       *
// ==/UserScript==


// TODO 
// *  everything
var allLinks, thisLink,theDiv,theLinks;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    theLinks="";
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if(thisLink.href.match(/^ed2k*/)) {
	theLinks = theLinks + thisLink.href + "\n";
    }
}
if(theLinks!=""){
    theDiv=document.createElement('div');
	theDiv.innerHTML='<div id="alllinks" style="position:absolute;background-color:white;' +
    	             'color:black;border:2px solid #f00;z-index:255;text-align:left;">' +
        	         '<a onclick=\'var candidate=document.getElementById(\"alllinks\");' +
            	     'candidate.parentNode.removeChild(candidate);return false;\' ' +
                	 'style="color:black" href="#">(close this)</a><br><pre>'+theLinks+'</pre></div>';
	document.body.insertBefore(theDiv, document.body.firstChild);
}