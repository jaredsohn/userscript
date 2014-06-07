// ==UserScript==
// @name			HTF Script Remove Ignored Posts
// @namespace		neworl/removeignoredposts
// @description		This script will center your text automatically on HiTechForums.
// @include			http://hitechforums.net/*
// @include			http://www.hitechforums.net/*
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