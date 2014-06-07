// ==UserScript==
// @name           	Neopets Game Tab Titles
// @namespace     	http://userscripts.org/scripts/show/138672
// @description   	Gives Neopets game tabs the correct game title instead of "Games | Kids Games | Virtual Games & Pets | Games for Kids | Neopets"
// @include        	http://www.neopets.com/games/*
// ==/UserScript==

var line = document.querySelector ("#gr-header div h1");
var game = line.textContent.replace (/^.*\s-\s/, "");
document.title = game;
