// ==UserScript==
// @name          Remove LU-Ware
// @description   Remove annoying Liberty AdWare bar at the top of liberty.edu
// @include       *.liberty.edu/*
// ==/UserScript==


function getStyleClass (className) {
	for (var s = 0; s < document.styleSheets.length; s++)
	{
		if(document.styleSheets[s].cssRules)
		{
			for (var r = 0; r < document.styleSheets[s].cssRules.length; r++)
			{
				if (document.styleSheets[s].cssRules[r].selectorText == '.' + className)
					return document.styleSheets[s].cssRules[r];
			}
		}
	}
	
	return null;
}

getStyleClass('globalmenu').style.display = 'none';