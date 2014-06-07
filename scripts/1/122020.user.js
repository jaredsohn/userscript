// ==UserScript==
// @name            HF Scripts - Confirm Send Message
// @namespace       no/send message
// @description     Confirm box comes up when trying to sending a message
// @include         http://hackforums.net/private.php*
// @include         http://www.hackforums.net/private.php*
// @version         1.0
// ==/UserScript==


var links = document.getElementsByTagName('a');

for (i = 0; i < links.length; i++) {
	if (links[i].href.indexOf('Send Message') != -1) {
		links[i].href="javascript:if(confirm(\"Send Message?\")){javascript:location.href=\""+links[i].href+"\";}";
	}
}