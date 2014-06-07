// ==UserScript==
// @name			PennerVZTool
// @namespace		Pennergame::Spenden
// @author			jSchmidt
// @include			http://www.meinvz.net/Forum/ThreadMessages/*
// ==/UserScript==

var commentContent = "comment-content";

var regEx = new RegExp("(http://berlin.pennergame.de/change_please/)([0-9]*)(/{0,1})", "");
var commentElements = document.getElementsByClassName(commentContent);

if(confirm("Jetzt spenden?"))
{
	var tipMax = "x";
	while(isNaN(tipMax))
	{
		tipMax = prompt("Wie vielen willst du spenden?", "10");
	}

	var i = 0;
	for each(var Element in commentElements)
	{
		if(regEx.test(Element.firstChild.nodeValue))
		{
			if(i < (tipMax - 1))
			{
				var result = regEx.exec(Element.firstChild.nodeValue)[0];

				var win = window.open(result, result, "width=800, height=600");

				i++;
			}
		}
	}
}
