// ==UserScript==
// @name           Geocaching.com - No Ads v1.0
// @namespace      raverave.noads
// @description    Removes the adverts that show on the right hand side of several of the pages.
// @include        http://www.geocaching.com/*
// ==/UserScript==

RemoveAdds()

function RemoveAdds()
{
Del_AddStyle1()
Del_AddStyle2()
}

function Del_AddStyle1() 
{
	var AddSpan = document.getElementById("ctl00_ContentBody_ADModules_09")
	if (AddSpan != null) 
	{
		var SpanParent = AddSpan.parentNode
		SpanParent.removeChild(AddSpan);
		
		var AddLink = document.getElementById("ctl00_ContentBody_advertisingWithUs")
		var LinkParent = AddLink.parentNode
		LinkParent.removeChild(AddLink)       
	}
}

function Del_AddStyle2() 
{
var AddSpan = document.getElementById("ctl00_ADModules_09")
	if(AddSpan != null)
	{
		var SpanParent = AddSpan.parentNode
		SpanParent.removeChild(AddSpan);

		var AddLink = document.getElementById("ctl00_hlAdvertiseWithUs")
		var LinkParent = AddLink.parentNode
		LinkParent.removeChild(AddLink)       
	}
}