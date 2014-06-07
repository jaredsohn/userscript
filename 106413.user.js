// ==UserScript==
// @name        GoogleReader+
// @include     https://*.google.com/reader/view/*
// @include     http://*.google.com/reader/view/*
// @include     htt*://*.google.*/reader/view*
// @author      GoogleReader+ by Tobias Klevenz
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://madfx.de/googleReader+.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
