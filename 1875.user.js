// ==UserScript==
// @name          Heise AdFree
// @namespace     http://52g.de/
// @description   script to remove ads from heise.de
// @include       http://www.heise.de/*
// @include       http://heise.de/*
// ==/UserScript==
// (c) Lars Formella (root@52grad.de)
// modified by Thomas Maeder to remove more useless things

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function removeByXPath(query) {
        var snapshots = xpath(query);
    for (var i = 0; i!=snapshots.snapshotLength; ++i) {
        var thisElmt = snapshots.snapshotItem(i);
        thisElmt.parentNode.removeChild(thisElmt);
        }
}

function removeByTagName(name) {
        var allElmts = document.getElementsByName(name);
        for (var i = 0; i!=allElmts.length; ++i) {
            var thisElmt = allElmts[i];
            thisElmt.parentNode.removeChild(thisElmt);
        }
}

removeByXPath("//div[contains(@class,'adbottom')]");
removeByXPath("//*[starts-with(@class,'kasten_markt')]");
removeByXPath("//table[tbody/tr/td/span='Anzeige']");

removeByTagName("bcadv");
removeByTagName("cadv");
