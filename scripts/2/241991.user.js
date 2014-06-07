// ==UserScript==
// @name       Userscripts.org 502 reload
// @namespace  http://popeen.com
// @version    0.1
// @description  Reloads the page if you get the 502 error message
// @include      *userscripts.org*
// ==/UserScript==

if(document.title == '502 Bad Gateway'){
	window.location.reload()
}