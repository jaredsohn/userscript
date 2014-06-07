// ==UserScript==
// @name           Damn You Matilda!
// @namespace      http://userscripts.org/scripts/show/70277
// @description    Warn against adventuring again after a dance card
// @include        http://127.0.0.1:*/adventure.php*
// @include        http://*kingdomofloathing.com/adventure.php*
// ==/UserScript==

if (document.body.innerHTML.match("decrepitude and decomposition")) {
	
	document.body.innerHTML = document.body.innerHTML.replace("Adventure Again","D<\/a>on't Adventure Again");
	
}