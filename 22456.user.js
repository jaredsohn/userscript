// No Troll 2.1 User Script
// version 2.1
// 2009-05-03
// written by ab03
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          No Troll 2.1
// @namespace     none
// @description   Script to prevent display of posts and diaries of users on SBN 2.0 boards
// @include       http://www.lonestarball.com/*
// ==/UserScript==

var allLinks, thisLink, uidtext, i, j;



//Sets refresh speed (in milliseconds)
refreshspeed = 5000;				


//Sets the text that appears instead of the post
replacementtext = "Ignore";			


//Enter screen name of person you want to block
//Enter "%20" for spaces
trolls = ["LBrooks","Josey%20Wales","Clueless"]; 



timeout();
function timeout() {




allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (i = 0; i < allLinks.snapshotLength; i++) {
    	
	thisLink = allLinks.snapshotItem(i);

	for (j = 0; j < trolls.length; j++) {
		uidtext = new String("http://www.lonestarball.com/users/"+trolls[j]);
		uidtext2 = new String("http://www.sbnation.com/users/"+trolls[j]);
		if (thisLink.href == uidtext || thisLink.href ==uidtext2){
			
			var pBody1=thisLink.parentNode;   
			var pBody2=pBody1.parentNode;
			var pBody3=pBody2.parentNode;
			
			
			//Blocks comments
			if (pBody2.getAttribute('class') == "comment not-new clearfix" || pBody2.getAttribute('class') == "comment new clearfix" || pBody2.getAttribute('class') == "comment recommended not-new clearfix") {
				var logo = document.createElement("div");
				logo.innerHTML = '<div class="citem"><div class="comment clearfix"><h5 class="comment_title">'+replacementtext+'</h5></div></div>';
				pBody3.parentNode.replaceChild(logo, pBody3);
				//var logo = document.createElement("div");
				


				
				
				
			}

			//Blocks comments of users with pics enabled
			if (pBody2.getAttribute('class') == "comment cpic not-new clearfix" || pBody2.getAttribute('class') == "comment cpic new clearfix" ) {
				
				var logo = document.createElement("div");
				logo.innerHTML = '<div class="citem"><div class="comment cpic clearfix"><h5 class="comment_title">'+replacementtext+'</h5></div></div>';
				pBody3.parentNode.replaceChild(logo, pBody3);
				i=i+3;

				
				
			}
			
			//Blocks diaries
			if (pBody2.getAttribute('class') == "byline") {
				var pBody3=pBody2.parentNode;

				var logo = document.createElement("div");
				logo.innerHTML = '<div class="entry clearfix "><h5>'+replacementtext+'</h5></div>';
				pBody3.parentNode.replaceChild(logo, pBody3);
				
				
				
				
			}
			
		}
	}
}
}
setInterval(timeout,refreshspeed);


