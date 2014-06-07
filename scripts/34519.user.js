// ==UserScript==
// @name           Lerposorium Karma Autoincrement
// @namespace      chocho.lepra
// @description    Проставляет 2 плюса в карму в любой открываемый профайл.
// @include        http://leprosorium.ru/users/*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//a[@class='plus']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    thisDiv.dispatchEvent(evt);
}