// ==UserScript==
// @name           Digg Sponsored Result Remover
// @description    Removes the sponsored results from new.digg.com
// @version        0.02
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// @include        http://new.digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==

var results = document.getElementsByClassName('diggadsriver');
for ( i=0; i<results.length; i++ )
	results[i].parentNode.removeChild(results[i]);
