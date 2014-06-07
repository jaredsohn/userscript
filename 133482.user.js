// ==UserScript==
// @name v5_master
// @version 5.00
// @namespace http://www.justmyimagination.com
// @description *shrugs* .. dunno yet ..
// @include http://*.stumbleupon.com/*
// @copyright © JustMyImagination 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='';
headID.appendChild(cssNode);