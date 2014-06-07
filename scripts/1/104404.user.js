// ==UserScript==
// @name           iDNES - zobrazovat smazane prispevky
// @include        http://*.idnes.cz/*
// @include        https://*.idnes.cz/*
// @description    Skript implicitně zobrazí smazané příspěvky v diskusích iDNES.cz
// ==/UserScript==

var allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; ++i) {
	var aEl = allLinks[i];
	var aLink = aEl.href.toLowerCase();
	if ((aLink.indexOf('/diskuse.asp?iddiskuse=') >= 0
		|| aLink.indexOf('/diskuse.aspx?iddiskuse=') >= 0)
			&& aLink.indexOf('&show=all') < 0)
				aEl.href += '&show=all';
}
