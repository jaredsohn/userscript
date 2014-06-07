// ==UserScript==
// @name        PDX Weighted Stats Correction
// @namespace   cc@PF
// @include     http://puzzledragonx.com/en/monster.asp*
// @include     http://www.puzzledragonx.com/en/monster.asp*
// @version     1.0
// @grant       none
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


var table = $("td.title:contains('Level:')").closest("tbody");
var rows = {};
rows.hp 	= table.find("tr:nth-child(4)");
rows.atk 	= table.find("tr:nth-child(5)");
rows.rcv 	= table.find("tr:nth-child(6)");
rows.total 	= table.find("tr:nth-child(7)");

var elemPri = $("td.title:contains('Element:')").closest("tr").find("a").first().html();
var elemSec = $("td.value-end:contains('Sub:') a").first().html();
var atkBonus = 1.0;
if (elemSec && elemSec.length) {
	 if (elemSec == elemPri)
		atkBonus = 1.1;
	else
		atkBonus = 1.3;
}

var stats = { hp:{}, atk:{}, rcv:{}, total:{} };
["hp", "atk", "rcv", "total"].forEach(function(key) {
	rows[key].cols = {
		min: rows[key].find("td.value-end")[0],
		max: rows[key].find("td.value-end")[1]
	};
	$(rows[key].cols.min).css('text-align', 'right');
	$(rows[key].cols.max).css('text-align', 'right');
	stats[key].min = rows[key].cols.min.innerHTML;
	stats[key].max = rows[key].cols.max.innerHTML;
	//console.log("key:", key, "min:", stats[key].min, "max:", stats[key].max);
});
["min", "max"].forEach(function(key) {
	var modtotal = Math.floor(((stats.hp[key] / 10.0) + (stats.atk[key] / 5.0) + (stats.rcv[key] / 3.0)) * 6.0 + 0.5);
	var bonustotal = Math.floor(((stats.hp[key] / 10.0) + (stats.atk[key]*atkBonus / 5.0) + (stats.rcv[key] / 3.0)) * 6.0 + 0.5);
	var difftotal = bonustotal - stats.total[key];
	//console.log("modtotal:", modtotal);
	$(rows.total.cols[key]).append('<br><span style="color:#6cf;">'+modtotal+'</span>');
	if (atkBonus > 1.0)
		$(rows.total.cols[key]).append('<br><span style="color:#8ef;">'+bonustotal+'</span>');
	var c = '#fff';
	if (difftotal > 0) {
		c = '#0d0';
		difftotal = '+' + difftotal;
	} else if (difftotal < 0) {
		c = '#d00';
	}
	$(rows.total.cols[key]).append('<br><span style="color:'+c+';">'+difftotal+'</span>');
});
