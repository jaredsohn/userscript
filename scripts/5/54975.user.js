// ==UserScript==
// @name            MyAnimeList.net: Last My Clubs Posts
// @namespace       http://myanimelist.net/profile/N_Ox
// @description	    Display the last club posts on the My Clubs page
// @include         http://myanimelist.net/clubs.php?action=myclubs*
// ==/UserScript==

(function() { if (typeof jQuery == 'undefined') $ = unsafeWindow.$;
	
var rows = $('.normal_header + table * tr');
$('> .borderClass', rows).css('border-width', 0);
$('> .borderClass', rows.next()).css('border-top-width', 1);

rows.each(function () {
	var tr = $(this);
	$.get($('a:has(strong)', this).attr('href'), function (data) {
		var cell = $('<td colspan="2"/>').css('padding-bottom', '3em');
		$('.normal_header:contains(Club Discussion)', $(data).children()).next().andSelf().each(function () {
			cell.prepend(this);
		});
		tr.after($('<tr/>').append('<td/>').append(cell));
	});
});

})();
