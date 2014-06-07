// ==UserScript==
// @name           mail2web banner remover
// @namespace      thunderchicken13
// @description    Removes the banner ad from mail2web.com pages.
// @include        *.mail2web.com/*
// ==/UserScript==

// Document Author: M. Lambert

var ad = document.getElementById("google_flash_embed")
{
	if (ad) {
					ad.parentNode.removeChild(ad);
				}
}