// ==UserScript==
// @name SU V4 Top Banner Remover
// @version 1.01
// @namespace http://www.justmyimagination.com
// @description Removes the new advertising banner that sits atop the page.
// @include http://*.stumbleupon.com/*
// @copyright © JustMyImagination 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='.beeFiveButterBar {background-color: transparent; border-bottom: 0px solid #FFCF3F;font-size: 0px;padding: 0px;text-align: center;}';
headID.appendChild(cssNode);