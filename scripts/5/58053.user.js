// ==UserScript==

// @name           comics.com - HD

// @namespace      http://userscripts.org/users/108927

// @description    Zoomed (bigger) comic strips by default instead of smaller ones. Clean page to make more room for strips.

// @include        http://comics.com/*

// ==/UserScript==



var thumbMode = window.location.search.indexOf ('ViewType=Thumb') != -1 ? 1 : null;



var items = document.evaluate ('//a[@class="STR_StripImage"]/img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



if (items.snapshotLength) {

	if (!thumbMode) {

		for (var i = 0; i < items.snapshotLength; i++) {

			var img = items.snapshotItem (i);

			var big = img.src.replace (/\.full\.gif$/, '.zoom.gif');

			img.src = '';

			img.src = big;

			img.removeAttribute('width');

		}

	}

	

	var css = '';

	

	css += '.Header, #STR_ComicScroller > p, .Col_B, .SRCH_Wrapper > .SRCH_Header, .Ad_C, .Col_A > .Promo_1a, .AD_Property, .AD_FooterAds {display:none !important;}';

	

	css += '.Content {width:1000px !important; padding:0 !important;}';

	css += '.Content > .Col_A {margin-right:0 !important; padding-top:0 !important;}';

	css += '.Content > .Col_A > .STR_Container {margin-top:0 !important;}';

	

	css += '.Col_A > .SRCH_Wrapper {margin-left:4px !important;}';

	css += '.STR_ComicWrapper > .STR_Header, .STR_Container > .STR_Footer, .SRCH_StripList > .PAG_Paging {width:646px; margin-left:0 !important;}';

	css += '.STR_Container > .STR_ComicWrapper > .STR_Comic {margin-left:0 !important; text-align:left !important; background-position:left top !important;}';

	

	if (thumbMode) {

		css += '.STR_Zoom {display:block !important;}';

	} else {

		css += '.STR_Zoom {display:none !important;}';

	}

	

	GM_addStyle (css);

}

