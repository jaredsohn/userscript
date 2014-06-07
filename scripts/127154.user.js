// ==UserScript==
// @name           add cgbt
// @namespace      http://cutehalo.sinaapp.com/
// @description    add checkbox
// @version        1
// @author         cutehalo
// @license        MIT License
// @include       http://out.cgbt.cn/*
// ==/UserScript==
var main, newElement;
main = document.getElementsByTagName("tr").getElementsByTagName("td").getElementsByTagName("a");
if (main) {
	newElement = document.createElement("input");
	newElement.type="checkbox";
	main.parentNode.insertBefore(newElement, main);
};