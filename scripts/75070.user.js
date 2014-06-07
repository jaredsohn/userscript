// ==UserScript==
// @name           AvaxHome Links Expander
// @description    Displays full download links (for JDownloader, etc.)
// @version        1.1
// @license        Public Domain
// @include        http://avaxhome.ws/*
// @include        http://www.avaxhome.ws/*
// ==/UserScript==

var links = document.evaluate("//div[@id='main-info-container']//a[@href]"+
    "[starts-with(@href,'http')]"+
    "[not(starts-with(@href,'http://avax'))]"+
    "[not(starts-with(@href,'http://www.avax'))]"+
    "[not(descendant::img)]"+
    "[not(contains(.,'High Speed Download'))]"+
    "", document, null, 7, null);
for (var a, i = 0; a = links.snapshotItem(i); i++) {
    if (a.textContent !== a.href) {
    	a.innerHTML += ' <span style="color:#888">- ' + a.href.replace(/&/, '&amp;') + '</span>';
    }
}
