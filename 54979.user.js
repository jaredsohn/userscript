// ==UserScript==
// @name            MyAnimeList.net: All My Friend's Entries
// @namespace       http://myanimelist.net/profile/N_Ox
// @description	    Add the "All My Friend's Entries" box from the stats page in anime details.
// @include         http://myanimelist.net/anime*
// ==/UserScript==

(function() { if (typeof jQuery == 'undefined') $ = unsafeWindow.$;

var pos = $('h2:contains(Reviews)');
if (!pos.length) return;

$.get(window.location + '/stats', function (data) {
	var link = $('a[name=members]', $(data).children());
	if (!link) return;
	var next = link.nextAll();
	pos.before(link).before(next);
	if (next.length == 1)
		pos.before($('<div style="margin:10px 0"/>').append('No users found with this Anime in their list.')).before('<br/>');
});

})();
