// ==UserScript==
// @name        Torrent.lt
// @namespace   Namespeisas
// @description Torrent.lt poster preview
// @include     http://www.linkomanija.net/browse.php*
// @include     http://www.torrent.ai/lt/torrents*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
jQuery(document).ready(function($) {

	 var number = 0;
	 $("table.torrents_table tr").each(function(index) {
	 var sitas = $(this);
	 //	console.log(sitas.find('td').next().find('a').attr('href'));
	 setTimeout(function() {
	 var nuoroda = sitas.find('td').next().find('a').attr('href');
	 number += 1;

	 $.ajax({
	 url : nuoroda,
	 context : document.body
	 }).done(function(data) {
	 var result = '';
	 var step = 5;
	 var pradzia = data.indexOf('id="covercontainer');
	 if (pradzia != -1) {
	 var kerpam = data.substr(pradzia, 500);
	 var url_start = kerpam.indexOf('src="') + step;
	 kerpam = kerpam.substr(url_start, 400);
	 var url_end = kerpam.indexOf('"');
	 result = kerpam.substr(0, url_end);

	 sitas.find('td').eq( 2 ).html('<a href="' + nuoroda + '" target="_blank"><img style="max-width:100px" src="' + result + '" alt="" /></a>');

	 }
	 });
	 }, index * 500);

	 });

});