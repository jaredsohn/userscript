// ==UserScript==
// @name          Hide Page Title from Taskbar
// @description	  Prefixes "Google Chrome Browser" to the page title, so that the actual page title doesn't show in the Windows Taskbar.
// @include       http://*
// @include       https://*
// ==/UserScript==

var mainString = document.title;
var origMainString = document.title;
var prefixString = "Google Chrome Browser - ";


document.title = prefixString + mainString;