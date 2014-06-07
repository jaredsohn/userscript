// ==UserScript==
// @name		Cuevana Movie Link
// @namespace	http://userscripts.org/scripts/show/105158
// @description	Adds links to Cuevana movie titles
// @include		http://www.cuevana.tv/peliculas/*
// @include		http://www.cuevana.tv/series/*
// ==/UserScript==

var a = document.getElementsByClassName("tit")[0];
if (a) {
	var b = a.innerHTML;
	a.innerHTML = "<a href=\"http://www.imdb.com/find?s=all&q="+b.replace(/ /g,"+")+"\" target=\"_blank\">"+b+"</a>";
}