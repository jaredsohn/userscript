// ==UserScript==
// @name           GLB Summary Analysis
// @namespace      Bogleg
// @description    Analyze Plays, Energy, and Morale on Game Summary page (GMs only)
// @version        1.0.0
// @include        http://goallineblitz.com/game/game_summary.pl?*
// ==/UserScript==

// *** CORE UTILITY **************************************************** {{{1
function getElementsByClassName(re, tag, par) { // {{{2
	var a = new Array();
	var els = par.getElementsByTagName(tag);
	for (var m = 0, j = els.length; m < j; m++) {
		if(re.test(els[m].className)) {
			a.push(els[m]);
		}
	}
	return a;
}

// *** MAIN ************************************************************ {{{1

var tables = getElementsByClassName(/^summary_table$/, 'table', document.getElementById('content'));

var cats = ['Offense', 'Defense', 'Kickers/Punters'];
var s;
var head = undefined;
var cols = [];
var colIdx = [];
var stats = {Total: {num: 0}};

for (var ti in tables) {
	var cat = cats[ti];
	var table = tables[ti];
	var rows = table.getElementsByTagName('tr');
	if (head == undefined) {
		head = rows[0];
		for each (var h in head.getElementsByTagName('td')) {
			cols.push(h);
		}
		var ci = 0;
		cols = cols.filter(function(e, idx, arr) {
			var h = e.innerHTML;
			if (!h.match(/^(?:Plays|Energy|Morale)$/)) {
				ci++;
				return 0;
			}
			colIdx.push(ci++);
			return 1;
		}).map(function(c){return c.innerHTML;});

	}
	if (stats[cat] == undefined) {
		stats[cat] = {num: 0};
	}
	for (var ri = 1; ri < rows.length; ri++) {
		var c = rows[ri].getElementsByTagName('td');
		stats[cat].num++;
		stats.Total.num++;
		for (var i in colIdx) {
			var ci = colIdx[i];
			var h = cols[i];
			if(stats.Total[h] == undefined) {
				stats.Total[h] = {sum: 0, vals: []};
				stats[cat][h] = {sum: 0, vals: []};
			} else if(stats[cat][h] == undefined) {
				stats[cat][h] = {sum: 0, vals: []};
			}
			var v = c[ci].innerHTML;
			if (s = v.match(/rating_bar_fill.+?>(\d+)</)) {
				v = parseInt(s[1]);
			} else if (s = v.match(/^\d+/)) {
				v = parseInt(v);
			}
			stats[cat][h].sum += v;
			stats[cat][h].vals.push(v);
			stats.Total[h].sum += v;
			stats.Total[h].vals.push(v);
		}
//		GM_log('stats[' + cat + ']: ' + stats[cat].toSource());
	}
}

cats.push('Total');
var out = document.createElement('table');
out.className = 'summary_table';
out.setAttribute('cellspacing', 0);
out.setAttribute('cellpadding', 0);
var outHTML = '<tr class="nonalternating_color"><td>Category</td><td>#Plrs</td>';
for each (var c in cols) { outHTML += '<td>' + c + '<br />(min-max / median / mean)</td>'; }
outHTML += "</tr>\n";
var rc = 1;
for each (var c in cats) {
	var n = stats[c].num;
	outHTML += '<tr class="alternating_color' + rc + '"><td>' + c + '</td><td>' + n + '</td>';
	for (var ci in cols) {
		var h = cols[ci];
		var dat = stats[c][h];
		dat.vals = dat.vals.sort(function(a,b){return a - b;});
		// median
		if (n % 2) { // easy
			dat.median = dat.vals[parseInt(n / 2)];
		} else { // not as easy
			dat.median = parseFloat(((dat.vals[parseInt(n / 2)] + dat.vals[parseInt(n / 2) - 1]) / 2).toFixed(2));
		}
		// mean
		dat.mean = parseFloat((dat.sum / n).toFixed(2));
		// output
//		GM_log('stats[' + c + '][' + h + ']: ' + dat.toSource());
		outHTML += '<td>' + dat.vals[0] + '-' + dat.vals[dat.vals.length - 1] + ' / ' + dat.median + ' / ' + dat.mean + '</td>';
	}
//	GM_log('stats[' + c + ']: ' + stats[c].toSource());
	outHTML += "</tr>\n";
	rc = (rc % 2) + 1;
}
out.innerHTML = outHTML;
document.getElementById('content').insertBefore(out, tables[2].nextSibling);
out = document.createElement('div');
out.className = 'medium_head';
out.innerHTML = 'Analysis';
document.getElementById('content').insertBefore(out, tables[2].nextSibling);

// vim: foldmethod=marker
