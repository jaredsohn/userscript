// ==UserScript==
// @name           9gag cleaner AJAX
// @version        1.1
// @description    Removes the social buttons from 9gag for a much better and faster browsing.
// @namespace      9gag
// @updateURL      http://userscripts.org/scripts/source/149941.meta.js
// @include        http*://9gag.com/*
// @run-at         document-end
// ==/UserScript==

var isLoaded = false;
(function gag9fix() {
    if (document.readyState != 'complete') {
        setTimeout(gag9fix, 0);
    }

	var entryList = document.getElementById("entry-list-ul");
    if (entryList == null) {
        // TODO
    } else {
        entryList.addEventListener("DOMNodeInserted", gag9fixAjax, false);
        var entries = entryList.getElementsByClassName("entry-item");
        if (entries != null && entries.length > 1) {
            for (var i = 0; i < entries.length; i++) {
                gag9fixNode(entries[i]);
            }
        }
    }

})();

function gag9fixAjax(event) {
    gag9fixNode(event.target);
}

function gag9fixNode(node) {
    var elements = new Array();
    var classes = ["social-block","sharing-box","spread-bar-wrap"]
    for(var i = 0; i < classes.length; i++) {
        var els = node.getElementsByClassName(classes[i]);
        if (els && els.length >0) {
            for (var j = 0; j < els.length; j++) {
                elements.push(els[j]);
            }
        }
    }


    if (elements.length > 0) {
        for (i = 0; i < elements.length; i++ ) {
            var el = elements[i];
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        }
    }
}