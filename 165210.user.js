// ==UserScript==
// @name        Metafilter Comment Box Logout
// @namespace   http://example.com/metafilter_comment_box_logout
// @description Adds a "logout" link to the right of your username above the comment box.
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// @version     1
// ==/UserScript==

var commentBoxSnap = document.evaluate(
    "//textarea[@name='comment']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var table = null;
if (commentBoxSnap.snapshotLength > 0) {
    var commentBox =
        commentBoxSnap.snapshotItem(commentBoxSnap.snapshotLength - 1);
    table = commentBox.parentNode.parentNode.parentNode;
}

var tr = null;
if (table != null) {
    var trSnap = document.evaluate("tr", table, null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (trSnap.snapshotLength > 0) {
        tr = trSnap.snapshotItem(0);
    }
}

var link = null;
if (tr != null) {
    var linkSnap = document.evaluate(
        "td/span/a[starts-with(@href, 'http://www.metafilter.com/user/')]",
        tr, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    if (linkSnap.snapshotLength > 0) {
        link = linkSnap.snapshotItem(0);
    }
}

if (link != null) {
    var span = link.parentNode;
    span.innerHTML += " (<a href=\"http://www.metafilter.com/index.cfm?delcookie=yes\">logout</a>)";
}
