// ==UserScript==
// @name         Trello Card Count
// @namespace    http://userscripts.org/users/638813
// @version      1.0
// @description  Displays card count in each list header, by showing a hidden element that Trello already has there but are not displaying for some reason.
// @match        https://trello.com/b/*
// @copyright    2014, Markus Amalthea Magnuson <markus.magnuson@gmail.com>
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];

if (!head) {
	return;
}

var style = document.createElement('style');
style.innerHTML = '.list-header-num-cards { display: inline-block !important; }';

head.appendChild(style);