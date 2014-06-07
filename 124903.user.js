// ==UserScript==
// @name Cat_tester_2
// @version 1.01
// @namespace http://www.justmyimagination.com
// @description forum tester_1
// @include http://*.southernfriedsicilian.com/*
// @copyright © JustMyImagination 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='  ';
headID.appendChild(cssNode);