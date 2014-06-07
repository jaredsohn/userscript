// ==UserScript==
// @name          RemovePopups
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Script to remove pesky Youtube popup
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// ==/UserScript==
//Two <div> elements to remove. 
//quicklist-bar-container
//quicklist-tray-container
var removeelem1 = document.getElementById('quicklist-bar-container');
var removeelem2 = document.getElementById('quicklist-tray-container');
if (removeelem1 && removeelem2) {
    removeelem1.parentNode.removeChild(removeelem1);
	removeelem2.parentNode.removeChild(removeelem2);
}