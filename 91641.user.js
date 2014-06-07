// ==UserScript==
// @name           blessed-silence
// @namespace      http://userscripts.org/users/133663
// @description    Silence is golden.  Make 4chan golden, too.
// @include        http://boards.4chan.org/*
// ==/UserScript==

var x = document.getElementsByTagName('embed');
for(var i=x.length-1;i>=0;i--)
{
	x[i].parentNode.removeChild(x[i]);
}