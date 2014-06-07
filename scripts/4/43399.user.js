// ==UserScript==
// @name          DZone Minimal Display
// @description	  Displays a minimal homepage for Dzone.com. Removes header and left panel, maximising the space for article links. 
// @include       http://dzone.com*
// @include       http://www.dzone.com*

// ==/UserScript==
// Copyright (c) 2009 Brian Boyle
// Released under the BSD license:
// http://www.opensource.org/licenses/bsd-license.php

//Hide the specified Div Element
function hideDiv(div){
	div.style.visibility = "hidden";
	div.style.display = "none";	
}

var leftPanel = document.getElementById("left");
hideDiv(leftPanel);

var leaderboard = document.getElementById("leaderboard");
hideDiv(leaderboard);

var head = document.getElementById("head");
hideDiv(head);

var entice_prompt = document.getElementById("entice_prompt");
if(entice_prompt != null){
    hideDiv(entice_prompt);
}

var titleTabs = document.getElementsByClassName("titleTabs");
for (var i=0; i<titleTabs.length;i++) {
	hideDiv(titleTabs[i]);
}

//Move the pageTitle links to the top left. e.g. Recently Promoted, Top in 24 Hours etc
var pageTitle = document.getElementById("pageTitle");
pageTitle.style.left = "0";
pageTitle.style.top = "10px";
pageTitle.style.margin = "10px 0 0 0px";


//Now re-size the main content div so that it fills the page
var content = document.getElementById("content");
content.style.left = "0";
content.style.top = "53px";		



