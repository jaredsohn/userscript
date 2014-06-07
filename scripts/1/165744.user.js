// ==UserScript==
// @name           YouTube PewDiePie Removal Tool
// @namespace      void
// @description    Hides any comment, related video, or search result on YouTube containing the word "PewDiePie".
// @match          http://www.youtube.com/*
// @include        http://www.youtube.com/*
// @version        1.0
// ==/UserScript==

var blockables = document.getElementsByTagName("li");

for (var i = 0; i < blockables.length; i++)
{
	if (blockables[i].textContent.toLowerCase().indexOf("pewdiepie") !== -1)
	{
		blockables[i].style.display = "none";
	}
}