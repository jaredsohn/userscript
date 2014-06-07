// ==UserScript==
// @name           Thread posts
// @namespace      b5b1e01d2b084aad9a291a2da94d53c3
// @description    Groups replies in 4chan threads under the post they're replying to.
// @include        http://*.4chan.org/*/res/*
// ==/UserScript==

var INDENT_PERCENT = 5;
var MAX_COLOR_VALUE = 0xE0;

function xpath(path, el) {
    return document.evaluate(path, el||document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpath1(path, el) {
    return document.evaluate(path, el||document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function rcv() {
    return Math.floor(MAX_COLOR_VALUE * Math.random());
}

// Don't run from iframe -- for compatibility with thread updaters
if (window.frameElement == null || window.parent.location.href.replace(/#.*/, '') != location.href) {

    // Iterate over posts containg quote links
    var replies = xpath("//td[.//a[@class='quotelink']]");
    for (var i = 0; i < replies.snapshotLength; i++) {

        // Get current post
        var reply = replies.snapshotItem(i);
        var num = reply.id.match(/\d+/);
        var anch = xpath1("//a[@name='" + num + "']");
        var tab = xpath1("ancestor::table", reply);

        // Get list of quote links
        var quotes = xpath(".//a[@class='quotelink']", reply);

        // Pick last valid quoted post
        var qnum = null;
        var qtab = null;
        for (var j = 0; j < quotes.snapshotLength; j++) {
            var quotej = quotes.snapshotItem(j);
            var m = quotej.href.match(/#(\d+)/);
            if (m) {
                var qnumj = m[1];
                var qtabj = xpath1("id('" + qnumj + "')/ancestor::table");
                if (qtabj && parseInt(qnumj) < parseInt(num)) {
                    if (qtab == null || qtab.compareDocumentPosition(qtabj) & document.DOCUMENT_POSITION_FOLLOWING) {
                        qnum = qnumj;
                        qtab = qtabj;
                    }
                }
            }
        }
        if (qtab == null) continue;

        // Find or create DIV containing replies to thread
        var div = document.getElementById("repliesto" + qnum);
        if (div == null) {
            qtab.style.clear = "left";
            div = document.createElement("div");
            div.id = "repliesto" + qnum;
            div.style.position = "relative";
            div.style.left = INDENT_PERCENT + "%";
            div.style.width = (100 - INDENT_PERCENT) + "%";
            div.style.borderLeft = "solid 1px rgb(" + rcv() + "," + rcv() + "," + rcv() + ")";
            qtab.parentNode.insertBefore(div, qtab.nextSibling);
        }

        // Move reply into DIV
        div.appendChild(anch);
        div.appendChild(tab);
    }
}
