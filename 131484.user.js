// ==UserScript==
// @include        http://minecraft-game.ru/*
// @id             antiantiblock
// @name           AntiAntiblock
// @namespace      CoolCmd
// @description    Отключает Antiblock на сайте Minecraft-game.ru
// @version        2012.4.21.1
// @author         CoolCmd
// @run-at         document-end
// @homepage       http://userscripts.org/scripts/show/131484
// @updateURL      https://userscripts.org/scripts/source/131484.meta.js
// @downloadURL    https://userscripts.org/scripts/source/131484.user.js
// @license        MIT License; http://opensource.org/licenses/mit-license
// @noframes
// ==/UserScript==

if (self == top)
{
	var a = document.getElementsByTagName('noscript');
	for (var i = 0, e; e = a[i]; ++i)
	{
		if (e.textContent.indexOf('antiblock.org') >= 0)
		{
			e.previousElementSibling.textContent =
				e.previousElementSibling.textContent.substr(0, 5) + '{display:none}';
			e.parentNode.removeChild(e);
			break;
		}
	}
}
