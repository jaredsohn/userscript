// ==UserScript==
// @name        Wikidot Improved Editor
// @namespace   wdeditor
// @version     1
// ==/UserScript==
var head=document.getElementsByTagName('head')[0];
var script=document.createElement('script');
script.type= 'text/javascript';
script.src= 'https://extension.wikidot.com/editor/code/1';
head.appendChild(script);