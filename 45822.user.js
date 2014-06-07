// ==UserScript==
// @name           APUG - Remove "Wirelessly posted..."
// @namespace      http://userscripts.org/users/40332
// @description    Remove the inane "wirelessly posted by my ___" lines from threads.
// @include        http://www.apug.org/forums/*
// ==/UserScript==

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i);
    // Wirelessly posted (BlackBerry9000/4.6.0.167 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/102 UP.Link/6.3.0.0.0)<br />
    node.data = node.data.replace(/Wirelessly.*/, ''); 
}

