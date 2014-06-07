// ==UserScript==
// @name          NikoniansRemoveNagText
// @namespace     http://www.nostalgix.org/files/greasemonkey/
// @description	  Script to remove Nikonians nag text for upgrading membership
// @include       http://www.nikonians.org/cgi-bin/dcforum/dcboard.cgi*
// ==/UserScript==
// (c) 2006 Arvid Warnecke, nostalgix.org
// does only work in post form, not in the preview view yet


var tableRows, thisRow;
var href = window.location.href;
var regex=/post/gi
tableRows = document.getElementsByTagName('tr'); 

if (regex.test(href)) {
    thisRow = tableRows[20];
    thisRow.style.display="none";
}

