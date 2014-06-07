// ==UserScript==
// @name        Remove 'Install Google Chrome' Reminder
// @namespace   http://localhost
// @description Removes the box that appears on Google that asks you to install chrome when not using Chrome.
// @include     https://www.google.*/*
// @version     1
// ==/UserScript==
var elmDeleted = document.getElementById("pmocntr2");
	elmDeleted.parentNode.removeChild(elmDeleted);
