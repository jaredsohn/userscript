// ==UserScript==
// @name SU V4 Tag Dropdown List Remover
// @version 1.02
// @namespace http://www.justmyimagination.com
// @description Prevents interests/tags dropdown list from deploying on mouseover. 
// @include http://*.stumbleupon.com/*
// @copyright Eat Me Productions/Done b4 Breakfast 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='li.hasChild ul{width: 0px; height: 0px; border: 0px solid #E0E0E0;}';
headID.appendChild(cssNode);