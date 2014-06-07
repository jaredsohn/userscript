// ==UserScript==
// @name           Expert Blocker
// @namespace      http://code.ninthorder.com/
// @description    Eliminate Experts Exchange results from Google searches.
// @include        http://*.google.com/search?*
// ==/UserScript==

(function() {
    var patterns = [
                "experts-exchange.com/",
                "allexperts.com/"
                ];

    var eliminate = function(element, index, array) {
        var nodes = document.evaluate(
            "//a[contains(@href, '" + element + "')]/../..",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);

        for(var node=null, i=0; node = nodes.snapshotItem(i); i++) {
            node.parentNode.removeChild(node);
        }
    }

    var main = function() { patterns.forEach(eliminate); }
    
    main();

})()
