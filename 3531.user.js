// ==UserScript==
// @name           StangNet Headlines Remover
// @author         Malevolyn
// @date           2006-03-15
// @version        0.1
// @namespace      http://www.wegotsgames.com/gmscripts/
// @description    Removes the "Latest Headlines" block from the StangNet forums.
// @include        http://forums.stangnet.com/*
// ==/UserScript==

(function ()
{
	var ttags = document.getElementsByTagName('table');
	for (var i=0;i<ttags.length;i++)
	{
		if (

			ttags[i].innerHTML.indexOf("Latest Headlines from RPM Planets") > -1 && 
			ttags[i].innerHTML.indexOf("<!-- Aria Container -->") == -1

		) { ttags[i].parentNode.removeChild(ttags[i]); } 
	}
})();