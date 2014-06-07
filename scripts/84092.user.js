// ==UserScript==
// @name           Ask.com hide "Sponsored Results"
// @description    Hides the "Sponsored Results" ads on Ask.com
// @include        http://www.ask.com/web?*
// ==/UserScript==



// For ask.com
// hides the "Sponsored results"

var rpane = document.getElementById("rpane");
if (rpane)
{
	// go through child elements
	for (var i = 0; i < rpane.childNodes.length; i++)
	{
		//if (rpane.childNodes[i].tagName != "DIV") continue;
		if (rpane.childNodes[i].nodeType != 1) continue;
		
		if (rpane.childNodes[i].className.indexOf("spl_shd_plus") < 0) continue;
		rpane.childNodes[i].style.display = "none";
	}
}

var rr_zoom = document.getElementById("rr_zoom");
if (rr_zoom)
{
	rr_zoom.style.display = "none";
}

