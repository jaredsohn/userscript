// ==UserScript==
// @name           OWiki BugFix
// @namespace      OWiki
// @description    Verhindert das auftreten von "Bugwörtern" ...
// @include        http://www.owiki.de/*
// @include        http://owiki.de/*
// ==/UserScript==

if (document.getElementById('wpTextbox1'))
	document.getElementById('wpTextbox1').innerHTML = 
		document.getElementById('wpTextbox1').innerHTML.replace(
		/\(.*?)\<\/span\>/g,'$1');