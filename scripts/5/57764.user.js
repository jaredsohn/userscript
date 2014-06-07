// ==UserScript==
// @name           Better Fetlife
// @namespace      Fetlife
// @description    Customized Fetlife
// @include        http://*fetlife.com/*
// ==/UserScript==




    var stuff_to_remove = [
'//*[@id="footer"]',
'//*[@id="ads_container"]',
'//*[@class="home_support_fetlife"]',


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
	
	
	