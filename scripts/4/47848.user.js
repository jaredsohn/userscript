// ==UserScript==
// @name           Shoutcast station direct link
// @namespace      http://userscripts.org/users/88601
// @include        http://www.shoutcast.com/*
// @include        http://shoutcast.com/*
// ==/UserScript==

var station_url = 'http://yp.shoutcast.com/sbin/tunein-station.pls?id=';

function add_direct_links() {
	var station_directory_page = document.getElementById('StationDirectoryPage');
	if (!station_directory_page)
		return;

	var station_divs = station_directory_page.getElementsByTagName('div');
	if (!station_divs)
		return;

	for (var div in station_divs) {
		var e  = station_divs[div];
		var re = /([0-9]+)more/;

		if (e.id && e.id.match(re)) {
			var id = e.id.replace(re, '$1');

			var link_a = document.createElement('a');
			link_a.appendChild(document.createTextNode('Direct link'));
			link_a.setAttribute('class', 'fontstyle fontNormal');
			link_a.setAttribute('style', 'text-decoration: underline;');
			link_a.setAttribute('href', station_url + id);

			var link_div = document.createElement('div');
			link_div.appendChild(link_a);

			var containing = e.getElementsByClassName('dirTuneMoreDiv')[0];
			var more_box   = containing.getElementsByClassName('moreBox')[0];

			containing.insertBefore(link_div, more_box);
		}
	}
}

var page = document.getElementById('page');
if (page) {
	page.addEventListener('DOMNodeInserted', function(e) {
		if (e.target.id && e.target.id == 'StationDirectoryPage')
			add_direct_links();
	}, false);
}

window.addEventListener('load', function() {
	add_direct_links();
}, false);
