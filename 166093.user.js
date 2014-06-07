// ==UserScript==
// @name        No comment
// @namespace   http://www.phirework.com
// @description Get rid of the commenting box
// @include     http://www.metafilter.com/*
// @include     http://*.metafilter.com/*
// ==/UserScript==

// document.styleSheets[0].insertRule('form#commentform { display:none !important; visibility: hidden; }', 0);

function hide() {
    var comment = document.evaluate(
        "//FORM[@id='commentform']",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < comment.snapshotLength; i++) {

        var box = comment.snapshotItem(i);
        box.setAttribute("style", "display: none;");
    }
}

hide();