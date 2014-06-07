// ==UserScript==
// @name        Set All Shop Prices
// @namespace   Zachafer
// @description Sets all items in shop to one price
// @include     *neopets.com/market.phtml?type=your*
// @version     1
// ==/UserScript==

var sForms = document.evaluate("//form[@action='process_market.phtml']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var elm = sForms.snapshotItem(sForms.snapshotLength - 1);
elm.innerHTML += '<button type="button" onclick="var price=prompt(\'How much should each item be priced for?\'); var index = 0;while(document.getElementsByName(\'cost_\' + ++index)!=null){document.getElementsByName(\'cost_\' + index)[0].value=price;}">Set all Prices</button>';