// ==UserScript==
// @name           Auto-Twitter Reddit Flair
// @namespace      http://reddit.com/u/thibit
// @description    Automatically links to Twitter handles in the reddit flair. Based on userscripts.org/58838
// @include        http://www.reddit.com/r/*/comments/*
// @updateURL      http://userscripts.org/scripts/source/132645.meta.js
// @version        1.0.1
// ==/UserScript==

(function () {
    var textNodes = document.evaluate(
        "//span[@class='flair ' and string-length(substring-after(text(), '@')) >= 1]/text()",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var re = /(@)([A-Za-z0-9_.]+)(?![A-Za-z0-9_\-])/;
        for (var textNode, i = 0; (textNode = textNodes.snapshotItem(i)); i++) {
    var text = textNode.nodeValue;
        if (!text.match(re))
        continue;
    var markNode = document.createElement('span');
    var parentNode = textNode.parentNode;
        parentNode.replaceChild(markNode, textNode);
    do {
        var left = document.createTextNode(RegExp.leftContext + RegExp.$1);
        var anchor = document.createElement('a');
            anchor.setAttribute('href', 'http://twitter.com/' + RegExp.$2);
            anchor.appendChild(document.createTextNode(RegExp.$2));
            parentNode.insertBefore(left, markNode);
            parentNode.insertBefore(anchor, markNode);
            text = RegExp.rightContext;
        } while (text.match(re));
        if (text.length > 0)
        parentNode.insertBefore(document.createTextNode(text), markNode);
        parentNode.removeChild(markNode);
    };
})();