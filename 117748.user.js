// ==UserScript==
// @name           Better Kjedesgsdgsdgsdgsdfjge Design
// @namespace      DaMoggen
// @description    Changes Itslearning
// @include        http://*.itslearning.com/*
// @include        https://*.itslearning.com/*
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = '.view-assessment-log-item{background:url("http://dl.dropbox.com/u/14605659/Untitled-1.gif") repeat scroll 0 0 #EEE;}'
document.documentElement.appendChild(styleEl);