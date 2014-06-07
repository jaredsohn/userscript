// ==UserScript==
// @name           Extract Results
// @namespace      Google
// @description    Extract Results from Google Results Page
// @include        http://www.google.com/search*
// ==/UserScript==

div = '<div width="100%">';
gEntry = document.evaluate("//a[@class='l']", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < gEntry.snapshotLength; i++) {
    var href = gEntry.snapshotItem(i).getAttribute('href');
    href = href + '<br/>';
    div += href ;
}
div += '</div>';
document.getElementById('res').innerHTML += div;
