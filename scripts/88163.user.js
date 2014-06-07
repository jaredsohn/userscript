// ==UserScript==
// @name           Maps.lt
// @namespace      *
// @description    Maps.lt
// @include        http://maps.lt/map/*
// @version 	   1.0
// ==/UserScript==

var stuff_to_remove = [
    "//div[@id='top']",
];

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);