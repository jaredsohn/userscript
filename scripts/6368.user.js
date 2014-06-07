// ==UserScript==
// @name GayRomeo_Shortcuts
// @namespace  http://www.patrik-spiess.de/gayRomeoMod
// @author  Patrik Spiess <post@patrik-spiess.de>
// @include http*://*.gayromeo.com/*
// @description  Add access keys to the submit buttons of the foto assessment page of GayRomeo
// @version  0.4.0
// ==/UserScript== 


(function(){ try {

var buttonList;
buttonList = document.evaluate(
    "//td[@class='softcore']/form/input[@type='submit']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (buttonList.snapshotLength > 0) {
    buttonList.snapshotItem(0).setAttribute("accesskey", "s");
}

buttonList = document.evaluate(
    "//td[@class='hardcore']/form/input[@type='submit']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (buttonList.snapshotLength > 0) {
    buttonList.snapshotItem(0).setAttribute("accesskey", "p");
}

buttonList = document.evaluate(
    "//td[@class='rejected']/form/input[@type='submit']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (buttonList.snapshotLength > 0) {
    buttonList.snapshotItem(0).setAttribute("accesskey", "u");
}

buttonList = document.evaluate(
    "//td[@class='illegal']/form/input[@type='submit']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (buttonList.snapshotLength > 0) {
    buttonList.snapshotItem(0).setAttribute("accesskey", "i");
}

buttonList = document.evaluate(
    "//td[@class='next']/form/input[@type='submit']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (buttonList.snapshotLength > 0) {
    buttonList.snapshotItem(0).setAttribute("accesskey", "x");
}

} catch(e) {dump('Linkify Plus Error ('+e.lineNumber+'): '+e+'\n');} })();
