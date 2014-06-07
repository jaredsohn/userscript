// ==UserScript==
// @name           Wikipedia link remover
// @namespace      Redonwhite
// @description    Makes wikipedia links look like normal text and unckickable. Saves tons of time to people who have to use Wiki for research but too often wander off ("Einstein's General Relativity" > (...) > "List of Hermaphrodites in the Pokemon Universe"). In order to actually search wiki, I made a search keyword for Firefox. Works quite nice. redonwhite@gmail.com
// @include        http://*.wikipedia.org/*
// ==/UserScript==


var links = document.getElementsByTagName('a');

for(i=0; i < links.length; i++)
{
	links[i].setAttribute("href", "");
	links[i].setAttribute("style", "color: inherit; font-style: inherit; text-decoration: inherit; font-weight: inherit");
}