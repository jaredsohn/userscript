// ==UserScript==
// @name           AbeBooks Static Country Shipping
// @namespace      www.shaunpud.com
// @description    Have the country shipping popup to the country you specify
// @include        http://abebooks.com/*
// @include        http://www.abebooks.com/*
// ==/UserScript==


var country = 'Australia';


var allLinks, thisLink;

allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i=0;i<allLinks.snapshotLength;i++)
{
	thisLink = allLinks.snapshotItem(i);

	var regexPattern = new RegExp('ShippingRatesPL.+vid=([0-9]+)');
	var regexResult = regexPattern.exec(thisLink);

	if (regexResult)
	{
		thisLink.setAttribute('href','http://www.abebooks.com/servlet/ShippingRatesPL?ctry='+country+'&vid='+regexResult[1]);
	}
}
