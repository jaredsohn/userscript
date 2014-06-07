// ==UserScript==
// @name        Swigview dark mode
// @namespace   swigview.com
// @include     http://www.swigview.com/*
// @version     1.2
// ==/UserScript==

document.body.style['background'] = "#000000";
document.getElementsByClassName('top-bar')[0].style['display'] = "none";
document.getElementsByClassName('bottom-bar')[0].style['display'] = "none";
document.getElementsByClassName('nav')[0].style['display'] = "none";

var controls = document.getElementsByClassName('controls')[0];
controls.style.borderBottom = "none";
controls.style.backgroundColor = "#666666";

document.getElementsByClassName('controls-sel')[0].style['border'] = "none";

var tables = document.getElementsByTagName('table');
for(var i in tables) {
   tables[i].cellSpacing = 0;
   tables[i].cellPadding = 0;
}