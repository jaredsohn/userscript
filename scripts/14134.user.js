// ==UserScript==
// @name           WoW Forum De-Interceptor
// @namespace      http://userscripts.org/
// @description    Stops Blizzard's warning page from intercepting links to non-blizzard sites
// @include        http://forums.worldofwarcraft.com/*
// ==/UserScript==
onClickLinks = document.evaluate('//a[@onclick]',document,null,
								XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
								 null);
for (i=0;i<onClickLinks.snapshotLength;i++) {
	link = onClickLinks.snapshotItem(i);
	if (link.getAttribute('onclick') == 'return warn(this)') {
		link.setAttribute('onclick','');
	}
}
