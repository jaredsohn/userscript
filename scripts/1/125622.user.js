// ==UserScript==
// @name			UG Script Remove Ignored Posts
// @namespace		neworl/removeignoredpostsug
// @description		This script will removed posts of those users on your block list.
// @include			http://uzigaming.com/showthread.php*
// @include			http://www.uzigaming.com/showthread.php*
// @version			1.0
// ==/UserScript==

var tables = document.getElementsByTagName('table');
var e;

for(var i = 0; i < tables.length; i++){
	e = tables[i]
	if(e.id.indexOf('ignored_post_') != -1){
		e.parentNode.removeChild(e);
	}
}