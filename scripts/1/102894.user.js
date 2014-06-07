// ==UserScript==
// @name           [DS] Erweiterte Angriffsansicht
// @namespace      die-staemme.de
// @version        0.1.1
// @description    Ergänzt in der Angriffsansicht den Typ des Angriffs und den Zeitpunkt der Rückkehr [Die Stämme]
// @icon           http://de71.die-staemme.de/graphic/command/attack.png
// @require        http://code.jquery.com/jquery-latest.js
// @include        http://*.die-staemme.de/game.php*screen=info_command*type=own
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==

// written by Stämme-User "atlanticIsle" --> http://de71.die-staemme.de/guest.php?screen=info_player&id=9106959

if ( $('td#error').text() == "Befehl existiert nicht mehr." ) {
}

else {
var titletext = $('td#content_value h2').eq(0).text();

// Command types and images
types = new Array('Angriff', 'Rückkehr', 'Abgebrochener Befehl', 'Unterstützung', 'Rückzug');
imgs  = new Array('attack.png', 'return.png', 'cancel.png', 'support.png', 'back.png');

// Get command type
for (var i = 0; i <= types.length; i++) {
	if ( titletext.match(types[i]) ) {
		var type = types[i];
		var image_id = i;
		break;
	}
}

// Add command icon to headline
var img_att = '<img src="graphic/command/' + imgs[image_id] + '?1" alt="" title="' + titletext + '">&nbsp;';
$('#labelText').before(img_att);
}


// Get arrival time
if (image_id == 0) {
var att_time = $('td#content_value table.vis').eq(0).find('tr').eq(6).find('td').eq(1).text();
var day    = parseInt(att_time.substring(0, 2), 10);
var month  = parseInt(att_time.substring(3, 5), 10);
var year   = parseInt('20' + att_time.substring(6, 8));
var hour   = parseInt(att_time.substring(9, 11), 10);
var minute = parseInt(att_time.substring(12, 14), 10);
var second = parseInt(att_time.substring(15, 17), 10);
// var ms  = att_time.substring(18, 21);

// Get duration
var att_duration = $('td#content_value table.vis').eq(0).find('tr').eq(5).find('td').eq(1).text();
for (var j = 0; j <= 3; j++) {
	var k = j + 1;
	var subs = att_duration.substring(j, k);
	
	if (subs == ":") {
		var substring_end = j;
		break;
	}
}

var hours_d = parseInt(att_duration.substring(0, substring_end));
var minutes_d = parseInt(att_duration.substring(substring_end + 1, substring_end + 3));
var seconds_d = parseInt(att_duration.substring(substring_end + 4, substring_end + 6));

// Get rest time
var att_rest_time = $('td#content_value table.vis').eq(0).find('tr').eq(7).find('td').eq(1).text();
for (var j = 0; j <= 3; j++) {
	var k = j + 1;
	var subs = att_rest_time.substring(j, k);
	
	if (subs == ":") {
		var substring_end = j;
		break;
	}
}

var hours_r = parseInt(att_rest_time.substring(0, substring_end));
var minutes_r = parseInt(att_rest_time.substring(substring_end + 1, substring_end + 3));
var seconds_r = parseInt(att_rest_time.substring(substring_end + 4, substring_end + 6));


// Workaround to get the time difference to UTC
var d = new Date();
var heute = new Date(d.getFullYear(), d.getMonth(), d.getDate());
var utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
var time_difference = Math.abs(utc -heute) / 3600000;

// Calculate time when the troops come back
var unixtime_att_utc = (Date.UTC(year, month - 1, day, hour, minute, second))/1000;
var unixtime_att = unixtime_att_utc -time_difference*3600;
var seconds_att_d = hours_d * 3600+ minutes_d * 60+ seconds_d;
var seconds_att_r = hours_r * 3600+ minutes_r * 60+ seconds_r;
var backtime = unixtime_att+ seconds_att_d;
var back_rest_time = seconds_att_d+ seconds_att_r;

// Convert Unix timestamp into date
var arrival = new Date(backtime*1000);
datum = new Array();
datum[0] = arrival.getDate();
datum[1] = parseInt(arrival.getMonth())+ 1;
datum[2] = parseInt(arrival.getFullYear()) - 2000;
datum[3] = arrival.getHours();
datum[4] = arrival.getMinutes();
datum[5] = arrival.getSeconds();

for (var f = 0; f <= 5; f++) {
	var z = String(datum[f]);
	if (parseInt(z.length) < 2) {
		var newdatum = 0 + z;
		datum[f] = newdatum;
	}
}
var arrival_date = datum[0] + '.' + datum[1] + '.' + datum[2] + ' ' + datum[3] + ':' + datum[4] + ':' + datum[5];

// Convert seconds into time
rest_time = new Array();
rest_time[0] = Math.floor(back_rest_time/3600);
rest_time[1] = Math.floor((back_rest_time -rest_time[0]*3600)/60);
rest_time[2] = back_rest_time -rest_time[1]*60 -rest_time[0]*3600;
for (var f = 1; f <= 2; f++) {
	var y = String(rest_time[f]);
	if (parseInt(y.length) < 2) {
		var newrest = 0 + y;
		rest_time[f] = newrest;
	}
}
var arrival_rest = rest_time[0] + ':' + rest_time[1] + ':' + rest_time[2];

// Insert into table
$('td#content_value table.vis').eq(0).find('tr').eq(7).after('<tr><td colspan="2">R&uuml;ckkehr:</td> <td>' + arrival_date + '</td></tr>');
$('td#content_value table.vis').eq(0).find('tr').eq(8).after('<tr><td colspan="2">R&uuml;ckkehr in:</td> <td><span class="timer">' + arrival_rest + '</span></td></tr>');
}