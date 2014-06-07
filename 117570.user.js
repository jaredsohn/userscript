// ==UserScript==
// @name           Album count
// @namespace      http://userscripts.org
// @description    Album count
// @include        http://what.cd/artist.php?id=*
// @include        https://ssl.what.cd/artist.php?id=*
// ==/UserScript==

var cats = ['album', 'anthology', 'single', 'bootleg', 'mixtape', 'guest_appearance', 'remixed_by', 'remix', 'compilation', 'live_album', 'soundtrack', 'ep', 'unknown', 'interview', 'dj_mix'];

function base(input) {
	return document.querySelectorAll('table[class="torrent_table"][id="torrents_' + input + '"] tbody tr[class*="releases_"][class*="group discog"]').length;
}
function getElement(input) {
	return document.querySelector('div[class="box center"] a[href="#torrents_' + input + '"]');
}

for (var i = 0; i < cats.length; i++) {
	if (getElement(cats[i]) != null) {
		getElement(cats[i]).innerHTML = getElement(cats[i]).innerHTML.replace(/]/,': ' + base(cats[i]) + ']');
	}
	if (document.querySelector('table[class="torrent_table"][id*="torrents_' + cats[i] + '"]') != null) {
		var id = document.querySelector('table[class="torrent_table"][id*="torrents_' + cats[i] + '"]').id.split('torrents_')[1];
		var element =  document.querySelector('table[class="torrent_table"][id*="torrents_' + id + '"] tbody tr.colhead_dark td[width] strong').innerHTML += ' (' + base(id) + ')';
	}
}