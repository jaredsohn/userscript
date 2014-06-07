// ==UserScript==
// @name	YTMND ad blocker
// @namespace	http://ytmnd.com
// @include	*ytmnd.com*
// @grant	none
//

// ==/UserScript==
jQuery(function($) {
	var DID_I_STUTTER = 5;
	var count = 0;
	var t = setInterval(function() {
		aidsCure();
	}, 1000);
	function aidsCure() {
		$("#please_dont_block_me").add('#a_plague_upon_your_house').hide();
		if (count++ >= DID_I_STUTTER) {
			clearInterval(t);
		}
	}
});