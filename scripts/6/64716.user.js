// ==UserScript==
// @name           Umsusi
// @description    Removes a “_blank” target attribute.
// @author         ngizau
// @version        0.4
// @include        *
// ==/UserScript==

var blinks = document.querySelectorAll("a[target='_blank'], a[target='blank'], a[target='_new']");
if (blinks)
	for (var i = 0, l = blinks.length; i < l; i++)
		blinks[i].setAttribute("target", "_self");
	
var rlinks = document.querySelectorAll("a[rel='external']");
if (rlinks)
	for (var i = 0, l = rlinks.length; i < l; i++)
		rlinks[i].removeAttribute("rel");