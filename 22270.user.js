// Vox Recent Activity Collapser
// version 0.1
// 2008-02-01
// Copyright (c) 2008, Ross Goldberg
// Please direct comments/questions to rossruns@gmail.com
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
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF VOX RECENT ACTIVITY 
// COLLAPSER, go to Tools/Manage User Scripts and manually uninstall the 
// previous version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Vox Recent Activity Collapser", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Provides "[+/-]" (Click to Show/Hide) links for every post on
// the Recent Activity page at http://www.vox.com/reader/recent-activity/ .
//
// By default, all comments will be hidden from view, making it easy to
// scroll through the posts to find the one you are interested in.  Click
// on the "[+/-]" link under each post heading to make comments visible, 
// click again to hide them.
//
// --------------------------------------------------------------------
//
// THANKS TO:
//
// 1) Mark Pilgrim and his Greasemonkey tutorial "Dive Into Greasemonkey",
// found at 
// 
// http://diveintogreasemonkey.org/
//
// Without his help, I would not have had the background to implement 
// the greasemonkey scripting to inject the code into the page.
//
// 2) Annie at Blogger University ( http://bloggeruniversity.blogspot.com/ ),
// who gave me the necessary javascript code to expand/collapse sections of
// a page in her post found at 
//
// http://bloggeruniversity.blogspot.com/ 
// 2006/05/hideshow-expandcollapse-navigation.html 
//
// (join above lines together to get URL)
//
// 3) RodMcguire of the Greasemonkey-Users google group, 
// ( http://groups.google.com/group/greasemonkey-users )for his advice
// on how to get the comments inside the new show/hide div area.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Vox Recent Activity Collapser
// @namespace       http://rossotron.com/public/gm/collapser/
// @description     Collapses comments on Vox Recent Activity page for easier navigation
// @include         *vox.com/reader/recent-activity/
// ==/UserScript==


// Function to insert CSS for hide/display style into page
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}


// Function to insert javascript for hide/display function into page
function addGlobalScript(javascript) {
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('script');
	style.type = 'text/Javascript';
	style.innerHTML = javascript;
	head.appendChild(style);
}


// Insert css
addGlobalStyle('.commenthidden {display:none} .commentshown {display:inline}');

// Insert javascript to handle the show/hide behavior on mouseclick
addGlobalScript('function togglecomments (postid) { ' +
	'var whichpost = document.getElementById(postid); ' +
	'if (whichpost.className=="commentshown") ' +
	'{ whichpost.className="commenthidden"; } ' +
	'else { whichpost.className="commentshown"; } ' +
	'} ');

// Find all instances of the beginning of the comments div 
var allCommentDivs, thisCommentDiv;
allCommentDivs = document.evaluate(
	"//div[@class='watched-asset-activity']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Insert code to provide link to hide comments
for (var i = 0; i < allCommentDivs.snapshotLength; i++)
{
	// Get current comment div
	thisCommentDiv = allCommentDivs.snapshotItem(i);

	// Create [-/+] link to click to show/hide comments
	var hidelink = document.createElement("a");
	hidelink.href = 'javascript:togglecomments(\'CommentsPost' + i + '\')';
	hidelink.title = 'Click to show/hide comments';
	hidelink.innerHTML = '[+/-]';
	
	// Create div to contain the comment area
	var hidelink2 = document.createElement("div");
	hidelink2.className = "commenthidden";
	hidelink2.id = 'CommentsPost' + i;
	
	// Insert link and div area into page
	thisCommentDiv.parentNode.insertBefore(hidelink, thisCommentDiv);
	thisCommentDiv.parentNode.insertBefore(hidelink2, thisCommentDiv);

	// Move comments div into the show/hide div so it will be hidden when
	//	you click the link
	hidelink2.appendChild(thisCommentDiv);
}



/*
TODO:
- Move show/hide toggle so it is next to post heading, not under it

0.1 - 2008-02-01 - Initial release
*/

// END FILE	