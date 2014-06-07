// ==UserScript==
// @name           TvSquad Cleaner
// @namespace      http://userscripts.org/users/674;scripts
// @description    clean up the layout on TVSquad.com
// @include        http://www.tvsquad.com/*
// ==/UserScript==

function $(id) { return document.getElementById(id); }
$('subcontent').style.display = 'none';
$('linkscol').style.marginLeft = '-970px';
$('content').style.width = '770px';
