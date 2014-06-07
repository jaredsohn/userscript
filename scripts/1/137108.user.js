// ==UserScript==
// @name           BlockRenrenRadio
// @namespace      renren.com
// @description    Block the annoying renren radio
// @include        http://www.renren.com/*
// @include        *renren.com/*
// @include        blog.renren.com/*
// ==/UserScript==


function killAds(xpath)
{
        var targets;
   	targets = document.evaluate(xpath, document, null,

		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
        for (var i=0; i<targets.snapshotLength; i++) {

		var target = targets.snapshotItem(i);

		target.parentNode.removeChild(target);

	}
}
function process()
{
	var xpath;
	
	xpath = '//div[contains(@id, "radio")]';
	killAds(xpath);
        
    xpath='//div[contains(@class,"side-item sales-poll")]';
	killAds(xpath);

    xpath='//ul[contains(@class,"web-function")]';
	killAds(xpath);
}
window.addEventListener("load", process, false);
//var url=window.location;
var timer = window.setInterval(process, 1000);

