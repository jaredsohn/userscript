// ==UserScript==
// @name        Anti-popup Requester
// @namespace   silvershadow
// @description Changes request button to use AJAX instad of popups
// @include     http://fillyradio.com/request/browse.php*
// @version     1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       GM_getValue
// ==/UserScript==

$(document).ready(function() {
	var first = $('table.songtable > tbody > tr').first().detach();
	var second = $('table.songtable > tbody > tr').first().detach();
	$(document).ajaxError(function(event) {
		alert("AJAX failed!");
	});
	$('table.songtable > tbody > tr').each(function() {
		// AJAX-ify the request system
		var node = $(this).children('td').eq(1).children('a').first();
		var onclick = node.attr("onclick");
		if (onclick) {
			var data = onclick.match(/request.php\?id=\d+/);
			if (!data) {
				return;
			}
			var rqst = data[0];
			// Two of them, to increase the chances of SOMETHING working
			node.removeAttr("onclick");
			node.prop("onclick", null);
			// Define our own
			node.click(function() {
				$.get(rqst, function(data) {
					var err = data.match(/can\s+only\s+request\s+(\d+\s+songs?)\s+per\s+(\d+\s+seconds?)/);
					var recent = data.match(/that\s+song\s+has\s+already\s+been\s+requested\s+recently/);
					var success = data.match(/will play after (\d+) more song/);
					if (err) {
						alert("You can only ask for " + err[1] + " every " + err[2]);
					}
					else if (recent) {
						alert("That song has been requested too recently, sorry");
					}
					else if (success) {
						alert("Your request will be played in " + success[1] + " songs. Congratulations!");
					}
					else {
						alert("Unrecognized response!\n\n\n\n\n" + data);
					}
				});
				return false;
			});
		}
		// AJAX-ify the rating system
		$(this).children('td').eq(2).children('a').each(function() {
			var node = $(this);
			var onclick = node.attr("onclick");
			if (onclick) {
				var data = onclick.match(/rate.php\?id=\d+&rating=\d/);
				if (!data) {
					return;
				}
				var rqst = data[0];
				// Two of them, to increase the chances of SOMETHING working
				node.removeAttr("onclick");
				node.prop("onclick", null);
				// Define our own
				node.click(function() {
					$.get(rqst, function(data) {
						var success = data.match(/Thank you for your song rating/i);
						if (success) {
							var msg = "Rating successful!\n\n";
							msg += "The original system reloaded the page after rating.\nWould you like to reload the page?"
							if (confirm(msg)) {
								window.location.reload();
							}
						}
						else {
							alert("I just don't know what went wrong! 6_9\n\n\n\n\n" + data);
						}
					});
					return false;
				});
			}
		});
	});
	$('table.songtable > tbody').prepend(second);
	$('table.songtable > tbody').prepend(first);
});


