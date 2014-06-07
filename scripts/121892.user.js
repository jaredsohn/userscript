// ==UserScript==
// @name            HF Scripts - Confirm Log Out
// @namespace       xerotic/confirmlogout
// @description     Confirm box comes up when trying to log out.
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.0
// ==/UserScript==


var links = document.getElementsByTagName('a');

for (i = 0; i < links.length; i++) {
	if (links[i].href.indexOf('action=logout') != -1) {
		links[i].href="javascript:if(confirm(\"Logout?\")){javascript:location.href=\""+links[i].href+"\";}";
	}
}