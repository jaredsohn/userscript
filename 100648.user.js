// ==UserScript==
// @name           [DS] Kontinentrangliste Stämme
// @version        0.1
// @namespace      die-staemme.de
// @description    Kleines Skript, das den Punkteschnitt der Dörfer in der Stammesrangliste auf dem Kontinent berechnet [Die Stämme]
// @icon           http://de71.die-staemme.de/graphic/map_center.png
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @include        http://*.die-staemme.de/game.php?village=*&screen=ranking&mode=con_ally*
// @include        http://*.die-staemme.de/guest.php?screen=ranking&mode=con_ally*
// @include        http://*.ds.ignames.net/guest.php?screen=ranking&mode=con_ally*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==

// written by Stämme-User "atlanticIsle" --> http://de71.die-staemme.de/guest.php?screen=info_player&id=9106959

/*
####### VERSION 0.1 [Beta] #######
published 2011-04-05
*/

var heading = '<th width="100">Punkteschnitt<br/>Dorf</th>';
$('table#con_ally_ranking_table tr').eq(0).append(heading);

for (var i = 1; i <= 20; i++) {

// Get points and villages from table
var jpoint = $('table#con_ally_ranking_table tr').eq(i).find('td').eq(2).text();
var vill = $('table#con_ally_ranking_table tr').eq(i).find('td').eq(3).text();
var village = parseInt(vill.replace('.',''));

// Replace "Mio." numbers
var reg = jpoint.match(/.* Mio/);
if (reg != null) {
	var pointnill = jpoint.replace(',','');
	var point = parseInt(pointnill.replace(' Mio.','0000'));
}
else {
	var point = parseInt(jpoint.replace('.',''));
}

// Calculate averange points
var schnitt = Math.round(point / village);

// Insert into table
var tr_schnitt = '<td class="lit-item">' + schnitt + '</td>';
$('table#con_ally_ranking_table tr').eq(i).append(tr_schnitt);

}