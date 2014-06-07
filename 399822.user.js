// ==UserScript==
// @name        FixUncachedBattles
// @namespace   by guardian
// @description Temporary fix for the uncached battles problems while browsing battlelogs
// @include     *.war-facts.com/battle_history.php?battle=*
// @version     1
// @grant       none
// ==/UserScript==


links = document.evaluate("//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);

    thisLink.href = thisLink.href.replace('/admin/uncached.php?',
                                          '/battle_history.php?');
}

