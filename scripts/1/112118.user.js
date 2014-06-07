// ==UserScript==
// @name           Digg Open Links in Same Tab
// @description    Stops the stupid 'open in new tab' behaviour of story links
// @version        0.01
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// @include        http://new.digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==

var results = document.getElementsByClassName('story-item-title');
for ( i=0; i<results.length; i++ )
	results[i].getElementsByTagName('A')[0].target = '_self';