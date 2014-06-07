// ==UserScript==
// @name        Asystent
// @namespace   http://userscripts.org/users/509170
// @description Zmienia linki w asystencie zatwierdzania
// @include     https://bip.warszawa.pl/*
// @grant       none
// @version     1
// ==/UserScript==

var links,thisLink;
links = document.evaluate("//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);

    thisLink.href = thisLink.href.replace('\';',
                                          '');

    thisLink.href = thisLink.href.replace('javascript:window.opener.location=\'',
                                          'https://bip.warszawa.pl');
                                          
    thisLink.href = thisLink.href.replace('%20window.opener=self;',
                                          '');
                                          
    thisLink.href = thisLink.href.replace('%20window.close();',
                                          '');
}