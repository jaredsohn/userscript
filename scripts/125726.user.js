// ==UserScript==
// @name            UG Scripts - Confirm Log Out
// @namespace       graphics/confirmlogout
// @description     Confirm box comes up when trying to log out.
// @include         http://uzigaming.com/*
// @include         http://www.uzigaming.com/*
// @version         1.0
// ==/UserScript==


var links = document.getElementsByTagName('a');

for (i = 0; i < links.length; i++) {
	if (links[i].href.indexOf('action=logout') != -1) {
		links[i].href="javascript:if(confirm(\"Logout?\")){javascript:location.href=\""+links[i].href+"\";}";
	}
}