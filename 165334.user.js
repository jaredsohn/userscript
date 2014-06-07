// ==UserScript==
// @name       xVTT remove ads
// @namespace  xVTT remove ads
// @version    1.03
// @description  remove top ads
// @include        http://www.xvtt.fr/*
// @include        https://www.xvtt.fr/*
// @copyleft  2013+, lolo888
// ==/UserScript==

document.body.removeAttribute('style');
var pDiv0 = document.body.firstChild.parentNode.children[0];
var pDiv1 = document.body.firstChild.parentNode.children[1];
if (pDiv0.nodeName=="DIV") {
	document.body.removeChild(pDiv0);
} else {
    document.body.removeChild(pDiv1);
}