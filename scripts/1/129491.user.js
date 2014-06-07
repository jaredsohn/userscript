// ==UserScript==
// @name           seeders download
// @namespace      download_seeders
// @version        1.2
// @description    Download seeder.lt torrents in VIP category
// @include        *seeders.lt/browse.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://usocheckup.redirectme.net/129491.js
// ==/UserScript==

var $row = $('td:has(span.activator1)');
$row.each(function(){
	id = $(this).parent('tr').children('td.info').children('a').attr('href').match(/torrent(\d+)/);
	$span = $('span.activator1',$(this));
	$span.replaceWith('<a href="download.php?torrent='+id[1]+'">'+$span.html()+'</a>');
});