//START OF SCRIPT

/*
BBC News Black Bar Removal - v1.0 2008-04-01

Greasemonkey user script: see http://greasemonkey.mozdev.org

Removes black bar from BBC News site.

Change Log:

* (v1.0) Initial release (01/04/2008).

*/

// ==UserScript==
// @name             BBC News Remove Black Bar
// @description      (v1.0) Removes black bar from BBC News site
// @namespace        http://david.j.whitehead.googlepages.com
// @include          http://news.bbc.co.uk/*
// ==/UserScript==

var x=document.body.getElementsByTagName("div")[2];
x.parentNode.removeChild(x);

var x=document.body.getElementsByTagName("ul")[0];
x.parentNode.removeChild(x);

//END OF SCRIPT