// ==UserScript==
// @name        Facebook remove stickers
// @namespace   manuelseeger.de
// @description Remove stickers from facebook chat
// @include     https://www.facebook.com*
// @version     1
// @grant       none
// ==/UserScript==

(function() {

function chatModified() {

    var mvs = xpath(document, "//div[@class='mvs']");
    
    for (var i = 0; i<mvs.length;i++) {
            mvs[i].parentNode.removeChild(mvs[i]);
            mvs[i].parentNode.parentNode.removeChild(mvs[i].parentNode);
    }
}

function xpath(node, expr) {

    var resultSet =  document.evaluate(expr, node, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var found = [];
    var res;
    for (var i = 0; i < resultSet.snapshotLength; i++) {
        found.push(resultSet.snapshotItem(i));
    }
    return found;
}

var docEl = document.documentElement;

if (docEl && docEl.addEventListener) {
        docEl.addEventListener("DOMSubtreeModified", function(evt) {
            var t = evt.target;
            chatModified();
        }, false);
} else {
        document.onpropertychange = function() {
                chatModified();
            
        };
}

})();