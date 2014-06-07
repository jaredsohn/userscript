// ==UserScript==
// @name		   Most popular torrent
// @namespace		   what.cd
// @description		   Most popular torrent
// @include		   http*://*what.cd/artist.php?id=*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$('tr[class*=releases_]').find('td[class=nobr]').next('td').addClass('snatched');
var snatches = [];
var i = 0;

$('.snatched').each(function () {
	snatches[i] = $(this).html().split(",").join("");
	i++;
});

snatches.sort(function(a,b){ return a - b; }); // order by numeric
var highest = snatches[snatches.length-1]; // most snatched

$('.snatched').each(function () {
	if ($(this).html().split(",").join("") == highest) {
		$(this).html("<strong><u>" + $(this).html() + "</u></strong>");
	}
});