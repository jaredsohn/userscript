// ==UserScript==
// @name          shortener link & ripway zapper at kaskus forum
// @namespace     http://userscripts.org/scripts/show/92720
// @include       http://kaskus.*/*
// @include       http://*.kaskus.*/*
// @version       1.0
// @description   strip bit.ly, alturl, anturl and ripway link at kaskus forum
// @author        sempaxxx (http://userscripts.org/users/sempaxxx)
// ==/UserScript==

// bit.ly, alturl dan anturl sering digunakan untuk membuat link ke clubcoe, iklan xxx, dsb
// http://h1.ripway.com/facebookhappy888/ sering digunakan untuk phising account facebook

try{
var korban, b;
korban = document.evaluate(
    '//a[contains(@href,"bit.ly") or contains(@href,"adf.ly") or contains(@href,"alturl") or contains(@href,"anturl") or contains(@href,"femalepedia") or contains(@href,"sangrajalendir") or contains(@href,"ripway")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

} catch(err) { korban = null; }


for (var k = 0; k < korban.snapshotLength; k++) {
   b = korban.snapshotItem(k);
   b.parentNode.removeChild(b);
}





