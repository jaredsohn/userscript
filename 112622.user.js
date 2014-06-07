// ==UserScript==
// @name	Facebook Autopoke
// @icon	http://i.imgur.com/5ShnMqG.png
// @namespace	http://www.softcreatr.de
// @author	Sascha Greuel
// @description	Automatically pokes back people listed on your home page.
// @version	1.8.3
// @run-at	document-end
// @grant	none
//
// @require	https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include	/^https?://(.*)?facebook\.com(.*)?/
// @exclude	/^https?://(.*)?pixel.\facebook\.com(.*)?/
// @exclude	/^https?://(.*)?developers.\facebook\.com(.*)?/
// @exclude	/^https?://(.*)?facebook\.com/ajax/(.*)?/
// @exclude	/^https?://(.*)?facebook\.com/ai.php(.*)?/
// @exclude	/^https?://(.*)?facebook\.com/l.php(.*)?/
// @exclude	/^https?://(.*)?facebook\.com/plugins/(.*)?/
// @exclude	/^https?://(.*)?s-static\.ak\.facebook\.com(.*)?/
// ==/UserScript==

(function ($) {
	function autopoke() {
		var poke_uids = gfids = [],
			i = aid = 0,
			loc = window.location.host.toLowerCase(),
			dtsg = $('input[name=fb_dtsg]').val();

		$.ajaxSetup({
			async: false
		});

		// 1st, we call the pokes page and fetch all pokes, if there are any 
		$.ajax({
			url: '/pokes',
			dataType: 'html',
			success: function (data) {
				if (loc.match(/m\.facebook\.com/)) {
					// Iterate through received pokes
					$("a[href^='/pokes/inline/']", data).each(function () {
						if ($(this).attr('href').indexOf('is_suggestion=0') !== -1) {
							// Poke found. Send poke back
							$.get($(this).attr('href'));
						}
					});
				} else {
					poke_uids = data.match(/poke_([0-9]+)/g);

					// No pokes, sleep
					if (!poke_uids) {
						return;
					}

					// Pokes found. Send pokes back
					for (i; i <= poke_uids.length - 1; i += 1) {
						$.post('/pokes/dialog/?poke_target=' + poke_uids[i].match(/([0-9]+)/)[0] + '&do_confirm=0', {
							fb_dtsg: dtsg
						});
					}

					// dismiss notifications
					$("li[data-gt*='poke']").each(function () {
						aid = $(this).attr('data-gt').split('{"alert_id":')[1].split(',')[0];
						$.get('/ajax/notifications/mark_read.php?alert_ids[0]=' + aid + '&fb_dtsg=' + dtsg);
					});
				}
			}
		});
	}

	// Runonce
	setTimeout(function () {
		autopoke();
	}, 1500);

	// Start timer
	setInterval(function () {
		autopoke();
	}, 30000); // Repeat every 30 seconds
}(jQuery.noConflict(true)));