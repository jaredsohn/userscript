// ==UserScript==

// @name            Google Groups
// @author          Shafik
// @namespace       http://groups.google.com
// @description     add border to google groups
// @include         http://groups.google.*

// ==/UserScript==

(function()
{
	// Add color to the messages
	var divs = document.getElementsByTagName('div');
	var isYellow = true;
	for (var i = 0; i < divs.length; i++)
	{
		if (divs[i].className == 'mbody')
		{		
			if (isYellow)
				divs[i].style.backgroundColor = '#FFFFE8';
			else
				divs[i].style.backgroundColor = '#FFECEC';
			isYellow = !isYellow;
			divs[i].style.borderLeft = "darkgray thin solid";
			divs[i].style.borderRight = "darkgray thin solid";
			divs[i].style.borderTop = "darkgray thin solid";
			divs[i].style.borderBottom = "darkgray thin solid";
			divs[i].style.width = '503px';
		}
	}
	
	// remove ads
	var ads = document.getElementById('rn');
	if (ads != null)
	{		
		ads.style.display = 'none';
	}
}
)();