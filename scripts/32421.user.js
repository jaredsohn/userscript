// ==UserScript==
// @name          Change Users
// @namespace      http://www.metafilter.com/member/25038
// @description   Change every instance of 
// @include        http://www.metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==


var user_replacement="member"
var els = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var i = 0;
		
while ((el=els.snapshotItem(i++))) 
{
	data = el.data;
	newval = data.replace(/user/g, user_replacement);
	if (newval.length != data.length ||  newval != data)
	{
		//check the length first since its quicker than a a string comparison.
		//only change the value if we need to. its quicker.
		el.data = newval;
	}
}
