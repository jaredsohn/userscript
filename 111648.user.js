// ==UserScript==
// @name       Flash Info Grabber
// @namespace  http://www.athensgames3.tk/
// @version    1.0
// @description  Makes a link below every embed to the swf, the text being the width, height
// @include    http://*/*
// @copyright  2011+, Carocrazy132
// ==/UserScript==

var allswfs, thisswf;

allswfs = document.evaluate(
    '//embed[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allswfs.snapshotLength; i++) {
    thisswf = allswfs.snapshotItem(i);
    var linksthing = document.createElement("div");
    linksthing.innerHTML = '<div><a href=' + thisswf.src + '> ' + thisswf.width + ', ' + thisswf.height + '</a></div>';
    thisswf.parentNode.insertBefore(linksthing, thisswf.nextSibling);
}