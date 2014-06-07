// ==UserScript==
// @name           [DS] Random Luck
// @namespace      die-staemme.de
// @version        0.1
// @description    Liefert dem Simulator zufällige Werte für das Glück [Die Stämme]
// @require        http://code.jquery.com/jquery-latest.js
// @include        http://de*.die-staemme.de/game.php*screen=place*mode=sim
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==

// written by Stämme-User "atlanticIsle" --> http://de71.die-staemme.de/guest.php?screen=info_player&id=9106959

var counter = 0;

function new_rand() {
	var rnd_1 = Math.round(Math.random());
	var vorzeichen = (rnd_1 == 0) ? -1 : 1;
	var rnd_2 = Math.round(Math.random() * 250)/10;
	var rnd = rnd_2 * vorzeichen;
	return rnd;
}

$('td#content_value form').eq(0).find('table.vis').eq(0).find('tr:last td').eq(1).append('&nbsp;<input name="random_luck" id="rand" type="checkbox"><label for="rand"> Zuf&auml;llig</label>');

$('td#content_value form').eq(0).find('table.vis').eq(0).find('tr:last td').eq(1).find('input').eq(0).attr('id', 'luckbox');


$("input#rand").click(function() {
	counter++;
	if (counter % 2 == 1) {
		var rand_luck = new_rand()
		$('#luckbox').attr('value', rand_luck);
		$('#luckbox').attr('disabled', 'disabled');
		$('td#content_value form').eq(0).find('table.vis').eq(0).find('tr:last td').eq(1).append('<input name="luck" id="luck_hidden" type="hidden" value="' + rand_luck + '">');
	}
	else {
		$('#luckbox').attr('value', '0');
		$('#luckbox').removeAttr('disabled');
		$('#luck_hidden').remove();
	}
});