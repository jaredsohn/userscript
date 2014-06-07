// ==UserScript==
// @name           WoS Signatur
// @namespace      userscripts.org/users/cms
// @description    Blendet die Signatur von WoS aus
// @include        http://forum.mods.de/*
// ==/UserScript==

function hide() {
    var expr = document.evaluate(".//tr[@username='" + escape("Wraith of Seth") + "']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (i = 0; item=expr.snapshotItem(i); i++) {
        item.innerHTML = item.innerHTML.replace(/<i>.*<\/i>([\s\r]*)(<\/span>)/,"$1$2");
    }
}

hide();