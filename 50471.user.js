// ==UserScript==
// @name           Filter Expired Slickdeals
// @author         http://www.angelisagirlsname.com
// @version        0.1
// @namespace      http://userscripts.org/scripts/show/50471
// @description    Remove expired deals from Slickdeals listing
// @include        *slickdeals.net
// @include        *slickdeals.net/
// @include        *slickdeals.net/index.php*
// ==/UserScript==

function Filter_Expired_Slickdeals() {
	var expiredDeals = document.getElementsByClassName('expired');
	var count = expiredDeals.length;
	for (var i = count - 1; i >= 0; i--){
		var expiredDeal = expiredDeals[i];
		expiredDeal.style.display = 'none';
	}
}

document.addEventListener("DOMContentLoaded", Filter_Expired_Slickdeals(), true);