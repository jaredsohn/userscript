// ==UserScript==
// @name        Get T411
// @namespace   t411
// @description Adds a DL button to the T411 result list
// @include     http://www.t411.me/torrents/search/*
// @version     1.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

$.fn.addT411Download = function() {
	return this.each(function() {
		var tdNfo = $(this).find('a.nfo');
		if (tdNfo.size() > 0) {
			var id = tdNfo[0].href.split('?')[1]; // Should be something like 'id=1234'
			if (id != undefined && id.match(/id=[0-9]+/)) {
				console.log("Found id " + id);
				var newLinkHtml = '<a href="/torrents/download/?' + id + '" class="dl_link"/></a>';
				var newLinkElement = $(newLinkHtml);

				newLinkElement.insertBefore($($(this).children('td')[1]).children('a:first-child'));
			}
		}
	});
};

GM_addStyle(".dl_link { display: inline-block; height: 11px; width: 9px; margin: 0px 4px 0px 4px; background: url('data:image/gif,GIF89a%09%00%0B%00%B3%0C%00i%BDi%99%D2%99%3A%A8%3Az%C4zF%ADFq%C0q.%A2.R%B3R%83%C8%83%8F%CE%8F%A0%D5%A0%00%8E%00%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%0C%00%2C%00%00%00%00%09%00%0B%00%40%04%25p%C99%19%5B%89%98e%FB*%9C%A7%0C%C0!p%8B%A2*A%82%84%16%7C%AD%AC%1Bb%DAMQ3i%CA%1FX%04%00%3B')  no-repeat scroll 0 0 transparent; }");

// Insert all the buttons in the new column
$('table.results tr').addT411Download();
