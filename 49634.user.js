// ==UserScript==
// @name           TVGids.nl - nu/straks
// @namespace      TVGids.nl - nu/straks
// @description    TVGids.nl - nu/straks
// @include        http://www.tvgids.nl/nustraks/
// ==/UserScript==

    var stuff_to_remove = [
'//*[@id="footer"]',
'/html/body/div/div[4]/div[6]',
'/html/body/div/div[4]/div[5]',
'/html/body/div/div[3]/div[4]',
'//*[@id="col-three"]',
'//*[@id="header"]',
'//*[@id="horNavigation"]',
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