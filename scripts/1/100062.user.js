// ==UserScript==
// @name        Pure Reader 1.3
// @description Pure Reader Port for Chrome —  have a look at the original here: http://nadesign.net/safari
// @include     https://*.google.com/reader/view/*
// @include     http://*.google.com/reader/view/*
// @include     htt*://*.google.*/reader/view*
// @author      Pattulus (http://madebypatrick.com) 
// ==/UserScript==


var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://idzr.org/t51d';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
