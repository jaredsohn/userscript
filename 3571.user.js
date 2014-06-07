// ==UserScript==
// @name           Ogame Commander Announcement Remover
// @author         Malevolyn
// @date           2006-03-19
// @version        0.2
// @namespace      http://www.wegotsgames.com/gmscripts/
// @description    Removes the commander announcement on the overview page.
// @include        http://ogame*.de/game/overview.php?*
// ==/UserScript==

(function()
{
	var ttags = document.getElementsByTagName('table');

	for (var i=0;i < ttags.length;i++)
		if (ttags[i].innerHTML.indexOf("Commander") > -1)
		{
			ttags[i].parentNode.removeChild(ttags[i]);
			ttags[i].parentNode.insertBefore("<br /><br />",ttags[i]);
		}
})();
