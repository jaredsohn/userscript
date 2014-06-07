// ==UserScript==
// @name        clickybutton
// @namespace   http://userscripts.org/users/303794
// @description clickbutton
// @include     http://portal.catchpoint.com/*
// @author      PJ Bezilla
// ==/UserScript==  

var help = document.getElementsByTagName('a')[5];//find the element
location.href = help.getAttribute('href');
var A = document.createEvent("MouseEvents");
A.initEvent("click", true, true);
help.dispatchEvent(A);
