// ==UserScript==
// @name          Red Facebook 
// @description   Turns Facebook color into grey
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

var node = document.createElement('link');
node.setAttribute('type','text/css');
node.setAttribute('rel','stylesheet');
node.setAttribute('href','http://rayyan.wen.su/facebook.css');
document.getElementsByTagName('head')[0].appendChild(node);
