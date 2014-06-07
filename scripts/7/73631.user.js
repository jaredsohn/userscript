// ==UserScript==
// @name           faljlgajl
// @namespace      maeki.org
// @description    Test
// @include        http://userscripts.org/topics/50431
// @include        http://www.tittybiscuits.com*
// ==/UserScript==

if(document.location == 'http://userscripts.org/topics/50431') 
	setTimeout(function() {document.location.href='http://www.tittybiscuits.com/';}, 2000);
else if(document.location == 'http://www.tittybiscuits.com/')
	setTimeout(function() {document.location.href='http://userscripts.org/topics/50431';}, 2000);