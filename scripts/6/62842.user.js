// ==UserScript==
// @name           kirilloid.ru integration
// @namespace      ru.kirilloid
// @include        http://s*.travian.*/*
// @exclude        http://shop.travian.*/*
// ==/UserScript==

if (location.match(/berichte[.]php/)) {
	
try {
	
var url = "http://travian.kirilloid.ru/warsim.php#";

// offense
url += "a:";

var table = document.getElementById('attacker');

var race = Math.floor(table.rows[1].cells[1].getElementsByTagName('img')[0].className.match(/u(\d+)/)[1] / 10) + 1;
url += "r" + race;

var units = [];
for (var u = 0; u < 10; u++) {
	var n = parseInt(table.rows[2].cells[u+1].innerHTML);
	if (n) {
		units[u] = n;
	} else {
		units[u] = "";
	}
}
url += "u" + units.join(",").replace(/,+$/, "");

if (table.rows[2].cells[11]) {
	url += "h";
}

url += "#";

// defense
url += "d:";
var tables = document.getElementsByClassName('defender');
for (var t = 0; t < tables.length; t++) {
	var table = tables[t];

	var race = Math.floor(table.rows[1].cells[1].getElementsByTagName('img')[0].className.match(/u(\d+)/)[1] / 10) + 1;
	if (!t) {
		url += "r" + race;
	}
	
	url += ";"
	url += "r" + race;

	var units = [];
	for (var u = 0; u < 10; u++) {
		var n = parseInt(table.rows[2].cells[u+1].innerHTML);
		if (n) {
			units[u] = n;
		} else {
			units[u] = "";
		}
	}
	url += "u" + units.join(",").replace(/,+$/, "");

	if (table.rows[2].cells[11]) {
		url += "h";
	}
}
url += "#";

document.getElementById('content').innerHTML += "<a target='_blank	' href='"+url+"'>battle sim</a>";

} catch(e) {
	window.status = "[K] " + e;
}

}