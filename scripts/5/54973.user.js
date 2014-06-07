// ==UserScript==
// @name            MyAnimeList.net: Friends' Anime Updates
// @namespace       http://myanimelist.net/profile/N_Ox
// @description	    Display the anime updates of every friend on My Friends page.
// @include         http://myanimelist.net/myfriends.php*
// ==/UserScript==

(function() { if (typeof jQuery == 'undefined') $ = unsafeWindow.$;

// We check for an empty cell to avoid updating the top friends page,
// as it already contains the top friends anime updates.
var header = $('td:nth-child(3):empty');
if (!header.length) return;

// Set the content of the header cell as on the top friends page.
header.text('Last Anime Updates');

// There is one row per friend, excluding the headers.
friends = $('tr:gt(0)').each(function() {
	$(this.cells[1]).css('min-width', 150);
	$(this.cells[3]).css('min-width', 90);
});

// We fetch the top friends page to retrieve their last updates in one time.
$.get('/myfriends.php?o=5', function (data) {
	$('tr:gt(0)', $(data).children()).each(function () {
		var name = $('strong a', this).text();
		var friend = friends.filter(function () {
			return $('strong a', this).text() == name;
		});
		if (!friend.length) return;
		$('td:nth-child(3)', friend).replaceWith($(this).children().eq(2));

		// This friend has now its anime updates on the page, we exclude him
		// from the set of friends.
		friends = friends.not(friend);
	});

	// For each remaining friend, we fetch its profile page to retrieve his last updates.
	$(friends).each(function () {
		var cell = $(this).children().eq(2);
		$.get('/profile/' + $('strong a', this).text(), function (data) {
			var updates = $('<td valign="top" class="borderClass"/>');
			$('.normal_header:contains(Last List Updates) + table * tr', $(data).children()).each(function () {
				updates.append(
					$('<div class="spaceit_pad"/>')
						.append($('a:not([class])', this))
						.append(' ')
						.append($('<span class="lightLink"/>').text($('.lightLink', this).text()))
				);
			});
			cell.replaceWith(updates);
		});
	});
});

})();
