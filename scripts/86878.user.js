// ==UserScript==
// @name           Copy-paste from Wikipedia without links or references
// @description    Removes references and links from Wikipedia articles for easy copy-pasting
// @namespace      http://userscripts.org/users/226222
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==

var Sups = document.getElementsByTagName("sup");

for(var i = 0; i < Sups.length; i++)
  if(Sups[i].className == "reference")
	Sups[i].style.display = "none";

var Anchors = [];

do
{
	if(Anchors[0])
	{
		var Span = document.createElement("span");
		Span.innerHTML = Anchors[0].innerHTML;

		Anchors[0].parentNode.replaceChild(Span, Anchors[0]);
	}

	Anchors = document.getElementById("bodyContent").getElementsByTagName("a");
} while(Anchors.length);