// ==UserScript==
// @name           Estiah wiki linker
// @namespace      http://localost
// @description    Creates links to estiah wiki
// @include        http://www.estiah.com/*
// ==/UserScript==

var allLinks,thisLink, indirizzo, wiki;
allLinks = document.evaluate("//a[contains(@class,'BV_system_file')][not(contains(@href, '/party/'))][not(contains(@class, 'avatar'))]|//a[contains(@href,'dungeon')][not(@href='/dungeon/diary')][not(contains(@class, 'icon'))][not(contains(@class, 'button'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	if (thisLink.textContent=='[Event]') {
		break;
	}
	indirizzo = "http://www.progenitor-softworks.com/ew/index.php?title=" + thisLink.textContent;
	wiki = document.createElement("a");
	wiki.innerHTML = "<a target='_blank' href='"+indirizzo+"'> [w]</a>";
	thisLink.parentNode.insertBefore(wiki, thisLink.nextSibling);
}
