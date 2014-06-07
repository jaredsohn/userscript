// ==UserScript==
// @name           [DS] Freie Bauernhofplätze
// @version        0.3
// @namespace      die-staemme.de
// @description    Kleines Skript zum Anzeigen freier Bauernhofplätze [Die Stämme]
// @icon           http://wiki.die-staemme.de/images/6/6b/Face.png
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @include        http://*.die-staemme.de/game.php*screen=farm
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==

// written by Stämme-User "atlanticIsle" --> http://de71.die-staemme.de/guest.php?screen=info_player&id=9106959


/*
####### VERSION 0.3 [Beta] #######
published 2011-03-10

####### CHANGELOG: #######
	Version 0.2: [Bugfix] Skript läuft mit Premium und auf den neuen Servern (mit Milizen) [2011-03-07]
		Version 0.2.1: [Bugfix] Skript läuft auch mit voll ausgebautem Bauernhof [2011-03-08]
		Version 0.2.2: [Code] Berechnung verändert
					   [Bugifx] Bug bei voll ausgebautem Bauernhof gefixt [2011-03-09]
	Version 0.3: [Code] Code auf jQuery umgestellt
				 [Bugfix] Auf Welten mit Milizen werden die freien Plätze nun unter den Gesamtplätzen angezeigt [2011-03-10]
*/

// get maximal population and empty places
var total_places = parseInt(document.getElementById("pop_max_label").textContent.replace('.',''));
var full_places = parseInt(document.getElementById("pop_current_label").textContent.replace('.',''));

// calculate empty places
var empty_places = total_places - full_places;

// create table row
var tablerow = '<tr><td>Freie Plätze</td><td align="right"><b>' + empty_places + '</b></td></tr>';

// insert into table row
var zeile = 6;

	// farm level 30
	if (total_places == "24000") {
		var zeile = 5;
	}
	else if (total_places == "22782") {
		// world 3 and world 9
		var zeile = 5;
	}
	else if (total_places == "26400") {
		// bonus village
		var zeile = 5;
	}

$('table.vis tr').eq(zeile).after(tablerow);

// ready :-)