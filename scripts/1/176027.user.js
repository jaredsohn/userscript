// ==UserScript==
// @name        STADS cookie fix
// @description Skip the cookie error message when logging in to STADS self service
// @copyright 	2013, Rasmus Wriedt Larsen
// @namespace   rasmuswriedtlarsen.com
// @include     https://sb.stads.ku.dk/SB_PSTA/sb/
// @version     1.0.0
// @grant       GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({	
	method: "GET",
	url: "https://sb.stads.ku.dk/SB_PSTA/sb/"
});