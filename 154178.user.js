// ==UserScript==
// @name        Crowdrise Live Update
// @namespace   smk
// @include     http://www.crowdrise.com/*
// @description Automatically refreshes Crowdrise fundraisers.
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

$(function() {

	// Only do stuff if on a fundraiser page..
	if($('title').html().match(/fundraiser/i)) {
		var update_seconds = 10; // Change this.
		var update_interval = update_seconds * 1000; // Don't change this.

		var current = parseInt($(".earned").prev('h3').html().replace(/[^0-9]/g, '')); // Get current amount raised.

		// Updating function
		function update() {
			$.get(location.href, function(data) {
				var a = parseInt($(data).find('.earned').prev('h3').html().replace(/[^0-9]/g, ''));
				if(a > current) {
					function upd() {
						setTimeout(function() {
							current++;
							$('.earned').prev('h3').html('$' + addCommas(current));
							if(current < a-1) {
								upd();
							}
						}, 60);
					}

					upd();
				}
			});
		}

		setInterval(update, update_interval);

	}

	function addCommas(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
});
