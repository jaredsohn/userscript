// ==UserScript==
// @name           HardwareZone LKR
// @author         Dilantha
// @date             2006-11-17
// @namespace   http://www.civilunrest.biz/catagories/greasemonkey
// @description  Add Sri Lakan rupee prices to HardwareZone Singapore
// @include         http://sg.hardwarezone.com/ *
// ==/UserScript==

var debug = false;
if(debug) GM_log('HzLkr begin');

var lkr2sgd = 67.95; // Singapore dollar to Sri Lankan rupee conversion rate

var allDivs, thisDiv;
allPrices = document.evaluate(
    "//span[@class='pg_txt']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allPrices.snapshotLength; i++) 
{
    price = allPrices.snapshotItem(i);
	var priceText = price.innerHTML;
	if(priceText.indexOf("SGD") == 0) 
	{
		priceText = priceText.substr(3);
		if(debug) GM_log("priceText:" + priceText);
		var priceVal = parseFloat(priceText);
		priceVal = priceVal * lkr2sgd;
		priceVal = Math.round(priceVal*100)/100;
		if(debug) GM_log("priceVal:" + priceVal);
		allPrices.snapshotItem(i).innerHTML = allPrices.snapshotItem(i).innerHTML + "<br/>LKR" + priceVal;
	}
}