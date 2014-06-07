// ==UserScript==
// @name           Quiver Modifier
// @namespace      okcupid.com
// @include        http://*.okcupid.com/*
// ==/UserScript==

quiverBox = document.evaluate(
    "//div[@id='headerQuiver']/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
box = quiverBox.snapshotItem(0);
box.style.background = '';
