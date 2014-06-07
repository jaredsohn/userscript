// ==UserScript==
// @name          iG Link Normal
// @description   Transforma links JavaScript das páginas do iG em links normais.
// @include       http://ig.com.br/*
// @include       http://*.ig.com.br/*
// ==/UserScript==

// Autor: Diogo Kollross <diogoko@gmail.com>

var allLinks = document.evaluate('//a[starts-with(@href, "javascript")]', document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);

    var newUrl = thisLink.href.replace(/^javascript:\s*ck[^'"]*['"]/, '');
    if (newUrl != thisLink.href)
        thisLink.href = newUrl.replace(/['"].*$/, '');
}
