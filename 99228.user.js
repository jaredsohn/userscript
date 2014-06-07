// ==UserScript==
// @name           Market Offer Link
// @version        0.2
// @namespace      ePseudoParadise
// @description    Adds offer link
// @include        http://www.erepublik.com/*/economy/inventory
// ==/UserScript==

var offerLinkBase;

function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else {
		$j = unsafeWindow.jQuery;

		var LOCALE = document.location.href.split('/')[3];
		offerLinkBase = 'http://economy.erepublik.com/' + LOCALE + '/market/offer/';

		generateLink();
		
		$j('a#post_offer').click(function() { window.setTimeout(generateLink, 2000); } );
	}

}
GM_wait();

function generateLink() {
	$j('img.offer_flag').each(function() {
		var flag = $j(this);
		var grandParent = flag.parent().parent();
		if (grandParent.attr('id').length > 0) {
			var offerId = grandParent.attr('id').replace('offer_', '');
			var offerLink = offerLinkBase + offerId;
			flag.wrap('<a href="' + offerLink + '">' + '</a>');
		}
	});
}
