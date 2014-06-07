// ==UserScript==
// @name            UziGaming - Confirm Logout
// @namespace       hack/cf
// @description     Confirm box pops up when trying to log out.
// @include         http://uzigaming.org/index.php*
// @include         http://www.uzigaming.org/index.php*
// @version         1.0
// ==/UserScript==


var links = document.getElementsByTagName('a');

for (i = 0; i < links.length; i++) {
	if (links[i].href.indexOf('action=logout') != -1) {
		links[i].href="javascript:if(confirm(\"Logout?\")){javascript:location.href=\""+links[i].href+"\";}";
	}
}