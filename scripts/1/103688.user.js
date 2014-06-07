// ==UserScript==
// @name           Geocaching.com - No Disclaimer v1.0
// @namespace      raverave.nodisclaimer
// @description    Removes the red disclaimer box from the top of the cache listings.
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

RemoveDisclaimer()

function RemoveDisclaimer() 
{
var x = document.getElementsByClassName("DisclaimerWidget")
var DiscTag = x.item(0)
var DiscParent = DiscTag.parentNode
DiscParent.removeChild(DiscTag);       
}
