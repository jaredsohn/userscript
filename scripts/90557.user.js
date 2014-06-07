// ==UserScript==
// @name           journal
// @namespace      udev
// @include        http://mafiamatrix.com/journal/*
// @require		   http://pajhome.org.uk/crypt/md5/2.2/md5-min.js
// @require	   	   http://secretz.kapsi.fi/mmfiles/001jquery-1.4.3.min.js
// ==/UserScript==

$(document).ready(function() {
	lastLatest = GM_getValue('mmjournal_latest');
	if (lastLatest != null) {
		$('.journal_event').parent().each(function(index) {
			var journal = $(this).html().trim();
			if (journal == lastLatest) return false;
			$(this).css('background-color','red');
			$(this).css('color', 'black');
		});
	}
	var latest = $('.journal_event:eq(0)').parent().html().trim();
	GM_setValue('mmjournal_latest', latest);
});