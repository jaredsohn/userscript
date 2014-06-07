// ==UserScript==
// @name          Ta bort FZ grunka!
// @description   Tar bort den flashiga ikonen pý FZ.se
// @namespace bongo.2007 March 4th fz.se http://userscripts.org/scripts/show/7773
// @include       http://fz.se/*
// @include       http://www.fz.se/*
// ==/UserScript==
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='news_icon']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}
allDivs = document.evaluate(
    "//div[@class='plug_icon']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'.news_headline {' +
'  padding-left:0px; ! important;' +
'}');
