// ==UserScript==
// @name           Rimozione Banner Ogame Commander
// @author         CoRe
// @date           2006-11-22
// @version        1.1
// @namespace      http://www.sstars.eu
// @description    Removes the new commander ads ( work with ogame.it )
// @include        http://ogame*.de/game/overview.php?*
// ==/UserScript==

(function()
{
	var ttags = document.getElementsByTagName('div');

	for (var i=0;i < ttags.length;i++)
		if (ttags[i].innerHTML.indexOf("Alla conquista di nuovi pianeti...") > -1)
		{
			ttags[i].parentNode.removeChild(ttags[i]);
			ttags[i].parentNode.insertBefore("<br /><br />",ttags[i]);
		}
})();


