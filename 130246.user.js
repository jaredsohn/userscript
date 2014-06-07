// ==UserScript==
// @name          TorrentLeech Seeders/Leechers
// @author		  toshilobo
// @namespace     http://userscripts.org/users/toshilobo
// @description   Adds a column with a ratio of seeders / leechers
// @include       http://torrentleech.org/torrents/browse/*
// @include       https://torrentleech.org/torrents/browse/*
// @include       http://www.torrentleech.org/torrents/browse/*
// @include       https://www.torrentleech.org/torrents/browse/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {

	var seeders = 0;
	var leechers = 0;
	var ratio = 0;
	$('#torrenttable thead tr').append('<th>S/L</th>');
	$('#torrenttable tbody tr').each(function(){
		seeders = Number($(this).find('td.seeders').text()).toFixed(2);
		leechers = Number($(this).find('td.leechers').text()).toFixed(2);
		ratio = Number(seeders/leechers).toFixed(2);
		ratio = isNaN(ratio)?'-':isFinite(ratio)?ratio:'-';
		$(this).append('<td>'+ ratio +'</td>');
	});
}

addJQuery(main);