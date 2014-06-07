// ==UserScript==
// @name          Alert Infinite Loop Fix
// @namespace     http://rolosworld.googlepages.com/
// @description   Script to change Alert popups to behave like Opera Alert popups
// @include       *
// ==/UserScript==

var script=document.createElement('script');
script.innerHTML="window.alert=function(s){if(!confirm(s))throw \"BREAKING SCRIPT\";};";
var head=document.getElementsByTagName('head')[0];

if(head.firstChild)head.insertBefore(script,head.firstChild);
else head.appendChild(script);
