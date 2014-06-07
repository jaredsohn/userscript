// ==UserScript==
// @name            disemvoweller
// @namespace       fredludd@gmail.com,2009-03-21:sn#v1
// @description     A disemvoweller.
// @include         http://corner.nationalreview.com/*
// @include         http://slate.com/blogs/blogs/kausfiles/*
// @include         http://www.redstate.com/*
// @include         http://hotair.com/*
// @include         http://www.renewamerica.us/*
// ==/UserScript==

function adjust() {
    var nodes=document.evaluate("/html/body//*/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for(var j=0; j<nodes.snapshotLength; j++) {
        var tnode = nodes.snapshotItem(j);
        tnode.nodeValue = tnode.nodeValue.replace(/a|e|i|o|u/gi, "");
    }
}

window.onload = adjust();

//disemvowel.user.js

