// ==UserScript==
// @name        Pure Reader 
// @description Pure Reader ported for Chrome, original author http://nadesign.net/safari/
// @include     https://*.google.com/reader/view/*
// @include     http://*.google.com/reader/view/*
// @include     htt*://*.google.*/reader/view*
// @author      Palaniraja (http://dr-palaniraja.blogspot.com) 
// ==/UserScript==


var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://idzr.org/c5br';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);