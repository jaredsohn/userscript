// ==UserScript==
// @name          GrooveShark No Ads
// @namespace     Sindrok
// @description   Removes ads on GrooveShark
// @include       http://listen.grooveshark.com/*
// @version       1.0
// ==/UserScript==

document.getElementById('capital').parentNode.removeChild(document.getElementById('capital'));

document.getElementById('application').style.margin = 0;

var width = document.getElementById('application').offsetWidth - document.getElementById('sidebar').offsetWidth;

document.getElementById('page_wrapper').style.width = width + "px";