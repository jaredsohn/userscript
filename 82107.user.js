// ==UserScript==
// @name           no-java-netbanking
// @namespace      http://userscripts.org/users/torotil
// @description    Überspringt die Java-Kontrolle bei netbanking.at (sparkasse.at)
// @include        https://www.sparkasse.at/casserver/login*
// ==/UserScript==

var n = window.location.search
	.replace(/java=off/g, 'java=on')
	.replace(/javaon=false/g, 'javaon=true');

if (n != window.location.search) {
	window.location.search = n;
}