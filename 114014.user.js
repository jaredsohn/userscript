// ==UserScript==
// @name          Chalk PDF Link fix
// @version		  1.3
// @namespace	  http://userscripts.org
// @description	  Fixes PDF link for Chalk (UChicago Blackboard)
// @include       https://chalk.uchicago.edu/*
// @include       http://chalk.uchicago.edu/*
// @include       https://chalk9.uchicago.edu/*
// @include       http://chalk9.uchicago.edu/*
// ==/UserScript==
var embed = document.getElementsByTagName("embed")[0].src;
if (embed) {
	var name = document.getElementById("pageTitleText").innerHTML;
	var string = '<a href="' + embed + '">' + name + '</a>';
	document.getElementById("containerdiv").innerHTML = string;
}
