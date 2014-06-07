// ==UserScript==
// @name           Paiq
// @namespace      Paiq.nl
// @description    Paiq slim
// @include        http://*paiq.nl/*
// ==/UserScript==


    var stuff_to_remove = [
'//*[@class="!26"]',
'//*[@class="!40"]',
'//*[@class="@tipButton"]',
'/html/body/span/a',
'/html/body/span/div[2]/table/tbody/tr/td/div/table[3]/tbody/tr[3]/td/div/span/span[7]',

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
	

(function()
{
	
	liTag = document.evaluate(
	"/html/body/span/div[2]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
		
	liTag.snapshotItem(0).style.padding = "0";

	
}) ();
