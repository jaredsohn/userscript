// ==UserScript==
// @name        PaulGraham Fixed Interface
// @namespace   tungnk1993
// @description Center the main content
// @include     http://paulgraham.com/*
// @version     1
// @grant 		none
// ==/UserScript==

var location = document.getElementsByTagName('td')[1];
location.width = '400';