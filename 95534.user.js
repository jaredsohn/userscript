// NewButton
// version 1.0
// 2011-01-27
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
// @name          NewButton
// @namespace     none
// @description   Script to prevent display of posts and diaries of users on SBN 2.0 boards
// @include       http://www.lonestarball.com/*
// ==/UserScript==
 
//Sets refresh speed (in milliseconds)
refreshspeed = 5000;				

timeout();

function timeout() {
	


for (i = 0; i < allLinks.snapshotLength; i++) {
    	
	thisLink = allLinks.snapshotItem(i);

	var pBody1=thisLink.parentNode;   
	var pBody2=pBody1.parentNode;
	var pBody3=pBody2.parentNode;
			
			
	if (pBody2.getAttribute('class') == "comment not-new clearfix" || pBody2.getAttribute('class') == "comment new clearfix" || pBody2.getAttribute('class') == "comment recommended not-new clearfix") {
				
				var elementB = document.createElement("input");
				elementB.setAttribute("type", Button);
				elementB.setAttribute("value", Button);
				elementB.setAttribute("name", Button);
				pBody3.appendChild(elementB);
				var logo = document.createElement("div");
				
				


				
				
				
			}

			
			
		
	}
}








setInterval(timeout,refreshspeed);
