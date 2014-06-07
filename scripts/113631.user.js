// ==UserScript==
// @name           Stile Project
// @namespace      http://userscripts.org/users/133248
// @description    Highlights images that have been viewed
// @include        http://www.stileproject.com/image*
// ==/UserScript==

var allImgs, thisImg;
allImgs = document.evaluate(
    "//div[@style='padding:5px; float:left;']//img",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    thisImg.width = 88;
    thisImg.style.border = '1px solid';
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

addGlobalStyle("a:visited img {border-color: #ff0000 ! important}");
addGlobalStyle("a img {border-color: #000000 ! important}");

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@style='width:160px;  display:block; text-align:center; background-color:#171717; margin-top:10px; margin-bottom:10px']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}

allDivs = document.evaluate(
    "//div[@style='width:975px; display:block; height:auto; margin:auto; ']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}

