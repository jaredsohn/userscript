// ==UserScript==
// @name           TVCatchup Advert Killer
// @namespace      ee
// @description    Remove adverts from TVCatchup
// Author: ee
// @include        *tvcatchup.com/watch.html*
// @license        Copyright (c) 2010 ee
// ==/UserScript==

if(ad_requested == "no")
{
	ad_requested = "yes";
}