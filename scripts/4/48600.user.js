// ==UserScript==
// @name           Citeulike.org - Remove [My Copy]
// @namespace      www.mond.me.uk
// @description    Removes the redundant [My Copy] when you're in your own library. Please change the include URLs via Greasemonkey to your own username
// @include        http://www.citeulike.org/user/yourusername
// @include  	   http://www.citeulike.org/user/yourusername/*
// @include  	   http://www.citeulike.org/search/*username=yourusername*
// ==/UserScript==

var allTags;

// Function taken from diveintogreasemonkey.org by Mark Pilgrim
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Get all the [My Copy] links
allTags = xpath("//a[starts-with(@id, 'mycopy_')]");

// Remove them all!
for (var i = 0; i < allTags.snapshotLength; i++) {
  var t = allTags.snapshotItem(i);
  t.parentNode.removeChild(t);
}