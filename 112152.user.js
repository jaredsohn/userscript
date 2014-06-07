// ==UserScript==
// @name           Glitch Auction Item Info+
// @namespace      http://beta.glitch.com/profiles/PIF6RN35T3D1DT2/
// @include        http://www.glitch.com/auctions/*/*/
// @match          http://www.glitch.com/auctions/*/*/
// @description    Gives you a little extra information on the auction item. Caveat emptor!
// @require        http://updater.usotools.co.cc/112152.js
// ==/UserScript==

(function() {

function main() {
	$(document).ready(function() {
		if ($('p.breadcrumb a:last') && $('p.breadcrumb a:last').attr("href").match(/auctions\/item-([^\/]+)/).length == 2) {
			$.get(document.location.protocol + '//' + document.location.host + '/items/' + $('p.breadcrumb a:last').attr("href").match(/auctions\/item-([^\/]+)/)[1]
			, function(data) {
				var itemDetails = $(data).find('ul.item-details');

				if (itemDetails && itemDetails.length > 0) {
					displayItemInfo(itemDetails);
				} else {
					$.get('http://beta.glitch.com/items/' + $('p.breadcrumb a:last').text().replace(/\s/g,'-').toLowerCase(),
					function(data) {
						var itemDetails = $(data).find('ul.item-details');
						displayItemInfo(itemDetails);
					});
				}
			});
		}
	});

	function displayItemInfo(itemDetails) {
		$('table.simple tbody tr:nth-child(2) td:nth-child(2)').append(itemDetails);
		$('ul.item-details:first').attr("style","margin-top: 7px;");
		var last = $('ul.item-details:last');
		if (last.attr("style")) {
			last.attr("style",last.attr("style") + " margin-bottom: 3px;");
		} else {
			last.attr("style","margin-bottom: 3px;");
		}
	}
}



var css = document.createElement('link');
css.rel = "stylesheet";
css.type = "text/css";
css.media = "all";
css.href = "http://c1.glitch.bz/css/encyclopedia_39433_1301530216.gz.css";
document.head.appendChild(css);

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();