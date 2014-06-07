// ==UserScript==
// @name SU V4 Project14
// @version 14
// @namespace http://www.justmyimagination.com
// @description Just a printskew(-20deg) test. Not for public use.
// @include http://*.stumbleupon.com/*
// @copyright Â© JustMyImagination 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='#dashboard {-moz-transform: skew(-20deg); } #navMain a {-moz-transform: skew(-30deg); }';
headID.appendChild(cssNode);