// ==UserScript==
// @name           Bogfa adblock
// @namespace      BAB
// @include        http://*.blogfa.com/*
// ==/UserScript==
function ads_remove(){
		var allObjects = document.getElementsByTagName('table');
		allObjects[0].style.display='none';
}
ads_remove()
