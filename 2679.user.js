// phpBB No Stretch
// version 0.2
// 2006-02-03
// Copyright (c) 2006, xamm
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
// select "phpBB No Stretch", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ChangeLog
// 2005-02-03 - 0.2 - Actually fixed the bug this time and solved an issue where you couldn't select the entire post at
//                    the same time
//
// 2005-02-02 - -.- - Fixed small bug with scrollbars appearing when linked images are in focus, thanks to Branstrom
//                    for pointing it out EDIT :: Do'h, my fix made things worse. Note to self, don't do work when busy at uni.
//                    
// 2005-01-19 - 0.1 - Initial release
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           phpBB No Stretch
// @namespace      http://www.otsegolectric.com/greasemonkey/
// @description    Changes all the posts on a phpBB forum so that they no longer strech the forum when their contents are too wide.
// @include        */viewtopic.php*
// ==/UserScript==

//finds all the posters names and from that finds their posts TD
var postBodies = document.evaluate("//span[@class='name']/../..//span[@class='postbody']/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < postBodies.snapshotLength; i++){
	var thisPostBody = postBodies.snapshotItem(i); //get the current post
	allSpans = thisPostBody.getElementsByTagName('span'); //find all its spans
	for(var j = 0; j < allSpans.length; j++){
		if(allSpans[j].className=='postbody'){ //loop through and get all the post bodies
			var tempContents=document.createElement('div');
			tempContents.innerHTML = allSpans[j].innerHTML;
			allSpans[j].parentNode.insertBefore(tempContents, allSpans[j].nextSibling); //copy and insert after the current one VERY important as placing it before causes FF to either infinite loop or leave things behind
			allSpans[j].parentNode.removeChild(allSpans[j]); //remove the original
		}
	}
	var postWrapper = document.createElement('div'); //wrap the entire post up in a div, give it the corect attributes then shove it on the page
	postWrapper.style.overflow = 'auto';
	postWrapper.style.width = '100%';
	postWrapper.style.height = '101%';
	postWrapper.className = 'postbody';
	postWrapper.innerHTML = thisPostBody.innerHTML;
	thisPostBody.innerHTML = '';
	thisPostBody.appendChild(postWrapper);
}