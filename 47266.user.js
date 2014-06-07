// ==UserScript==
// @name           puzzle-loop.com: Smaller Dots, larger font
// @namespace      http://www.n-regen.bplaced.de
// @description    Replaces the dots on puzzle-loop.com with smaller ones from puzzle-shikaku.com and sets the font-size of the puzzle-boxes to 15px.
// @include        http://*.puzzle-loop.com/*
// ==/UserScript==

var bilder = document.getElementsByTagName("img");
for (var index in bilder)
{
	if (bilder[index].src.indexOf("d.gif") != -1)
	{
		bilder[index].src = "http://www.puzzle-shikaku.com/shd.gif";
	}
}
document.getElementsByTagName("head")[0].innerHTML = document.getElementsByTagName("head")[0].innerHTML.replace(/-->/, '--> <style type="text/css">#LoopTable td {font-size: 15px !important;}</style>');