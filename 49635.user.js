// ==UserScript==
// @name           Geenstijl
// @namespace      Geenstijl
// @description    Geenstijl
// @include        http://www.geenstijl.nl/*
// ==/UserScript==
    var stuff_to_remove = [
'//*[@id="klasbox"]',
'//*[@id="gsnlbox"]',
'/html/body/div/div[3]/div[7]',
'//*[@id="gstvbox"]',
'//*[@id="dumpbox"]',

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