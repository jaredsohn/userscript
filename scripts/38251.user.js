// ==UserScript==
// @name        Helvetireader 2
// @description Helvetireader style for Google Reader
// @include     https://*.google.com/reader/view/*
// @include     http://*.google.com/reader/view/*
// @include     htt*://*.google.*/reader/view*
// @author      Helvetireader by Jon Hicks (http://www.hicksdesign.co.uk) with favicon override by MkFly
// ==/UserScript==


var favvy = document.createElement('link');
favvy.setAttribute('type', 'image/x-icon');
favvy.setAttribute('rel', 'shortcut icon');
favvy.setAttribute('href', 'http://www.helvetireader.com/favicon.png');
var head = document.getElementsByTagName('head')[0];
head.appendChild(favvy);

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://www.helvetireader.com/css/helvetireader-2.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);