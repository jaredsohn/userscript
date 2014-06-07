// ==UserScript==
// @name           إظهار القرية على الخريطة من ملف الاعب
// @namespace      tribalwars.ae
// @version        0.1.1
// @description    إمكانية إظهار القرية على الخريطة من ملف الاعب الشخصي
// @icon           http://de71.die-staemme.de/graphic/map_center.png
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @include        http://*.tribalwars.ae/game.php*screen=info_player*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==

// written by Stämme-User "atlanticIsle" --> http://de71.die-staemme.de/guest.php?screen=info_player&id=9106959

/*
####### VERSION 0.1.1 #######
published 2011-04-23
*/

const url = document.location.href;

// Add one element to table head
var head = '<th width="20"></th>';
$('td#content_value table.vis').eq(1).find('tr').eq(0).append(head);

// for each tablerow
$('td#content_value table.vis').eq(1).find('tr').each(function(index) {
if (index != 0) {

	// Get village coordinates
	var coords_roh = $(this).find('td').eq(1).text();
		var coords_x_roh = coords_roh.match(/\d{1,3}\|/)[0];
		var coords_x = coords_x_roh.match(/\d{1,3}/);
		
		var coords_y_roh = coords_roh.match(/\|\d{1,3}/)[0];
		var coords_y = coords_y_roh.match(/\d{1,3}/);

	// Add to table row
	var centerbutton = '<td><a href="/game.php?screen=map&x=' + coords_x + '&y=' + coords_y + '"><img src="/graphic/map_center.png" title="» اظهر القرية على الخريطة" alt ="» اظهر القرية على الخريطة" width="16px"></a></td>';
	$(this).append(centerbutton);

}	

});