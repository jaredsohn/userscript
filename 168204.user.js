// ==UserScript==
// @name          eBay Item Shortener
// @version       1.1a
// @date          2013/05/23
// @description   Make links smaller in Ebay
// @creator       Omeryl
// @license       WTFPL; http://www.wtfpl.net/
// @include       http://*.ebay.com/*
// @grant         none
// @namespace     http://userscripts.org/scripts/show/168204
// ==/UserScript==
//
// © Omeryl
//
//        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
//                    Version 2, December 2004 

// Copyright (C) 2004 Omeryl <omeryl@bassh.net> 

// Everyone is permitted to copy and distribute verbatim or modified 
// copies of this license document, and changing it is allowed as long 
// as the name is changed. 

//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
//   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

//  0. You just DO WHAT THE FUCK YOU WANT TO.

(function()
{
	$('a[href*="ebay.com/itm/"]').each(function() {
		var url = String($(this).attr('href')).split('/').length-1;
		url = $(this).attr('href').split('/')[url];
		url = url.split("?")[0];
		$(this).attr('href', "/itm/" + url);
	});
})();