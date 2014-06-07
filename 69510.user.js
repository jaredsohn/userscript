// ==UserScript==
// @name           TheWest Minimize all
// @namespace      forestking
// @include http://*.the-west.*
// @include http://zz1w1.tw.innogames.net/* 
// @exclude http://*.the-west.de/forum*
// @exclude http://forum.the-west.*
// ==/UserScript==

function aKeyIsPressed(e) 
{
	var key = e.keyCode;

	if (key == 113)
	{
		for (var i=0; i<document.getElementById('windows').childNodes.length; i++)
		{
			if (document.getElementById('windows').childNodes[i].style.display != "none") 
			{
				var str = document.getElementById('windows').childNodes[i].id;
				document.location.href = "javascript:AjaxWindow.toggleSize(\'" + str.substr(7) + "\', \'"+ str.substr(7)+ "\');"
			}
		}
	}
}	


document.addEventListener('keydown', aKeyIsPressed, true);
