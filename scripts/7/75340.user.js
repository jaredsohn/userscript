// ==UserScript==
// @name          Hello World
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

var x = document.getElementsByTagName("a");
for (i = 0; i < x.length; i += 1) {
e = x[i];
alert(e);
if("http://diveintogreasemonkey.org/toc/" == e){
window.location = e;
}
}