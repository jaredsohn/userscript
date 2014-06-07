// ==UserScript==
// @name           Skip MySpace Log In Ad
// @namespace      http://userscripts.org/users/24385/
// @description    Skips MySpace Log In Advertisement
// @include        *secure.myspace.com*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {

    if (links[i].text == 'Skip this Advertisement »') {

	window.location='http://home.myspace.com/index.cfm?fuseaction=user';

	break;

    }

}