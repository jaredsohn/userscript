// ==UserScript==
// @author	kirilloid
// @name		Travian scripts
// @namespace	http://userscripts.org/
// @description	Travian: My own scripts set
// @include	http://s*.travian.*
// @exclude	http://shop.travian.*
// @include	http://*travian.org/*
// ==/UserScript==
try {

var stats = {
	capacity: [
		[40, 20, 50, 0, 100, 70, 0, 0, 0, 3000],
		[60, 40, 50, 0, 110, 80, 0, 0, 0, 3000],
		[30, 45, 0, 75, 35, 65, 0, 0, 0, 3000]
	],
	off_i: [
		[40, 30, 70, 0, 0, 0, 60, 75, 50, 0],
		[40, 10, 60, 0, 0, 0, 65, 50, 40, 10],
		[15, 65, 0, 0, 0, 0, 50, 70, 40, 0]
	],
	off_c: [
		[0, 0, 0, 0, 120, 180, 0, 0, 0, 0],
		[0, 0, 0, 0, 55, 150, 0, 0, 0, 0],
		[0, 0, 0, 90, 45, 140, 0, 0, 0, 0]
	],
	def_i: [
		[35, 65, 40, 20, 65, 80, 30, 60, 40, 80],
		[20, 35, 30, 10, 100, 50, 30, 60, 60, 80],
		[40, 35, 20, 25, 115, 50, 30, 45, 50, 80],
		[25, 35, 40, 66, 70, 80, 140, 380, 170, 440]
	],
	def_c: [
		[50, 35, 25, 10, 50, 105, 75, 10, 30, 80],
		[5, 60, 30, 5, 40, 75, 80, 10, 40, 80],
		[50, 20, 10, 40, 55, 165, 105, 10, 50, 80],
		[10, 40, 60, 50, 33, 70, 200, 240, 250, 520]
	],
	upkeep: [
		[1, 1, 1, 2, 3, 4, 3, 6, 5, 1, 6],
		[1, 1, 1, 1, 2, 3, 3, 6, 4, 1, 6],
		[1, 1, 2, 2, 2, 3, 3, 6, 4, 1, 6],
		[1, 1, 1, 1, 2, 2, 3, 3, 3, 5]
	]
}
var gp_path = document.images[0].src.replace("img/un/a/x.gif", "");

function number_multi(x) {
	var m_letters = ' kMGTP'.split('');
	var idx = 0;
	while (x > 10000) {
		idx++;
		x /= 1000;
	}
	return (x > 100 ? Math.round(x) : x.toFixed(2)) + m_letters[idx];
}

function get_race_from_img(img) {
	x = parseInt(img.src.replace(/^.*?(\d+)\.gif$/, "$1"));
	if (!isNaN(x)) return Math.floor(x/10);
	return Math.floor(img.className.replace(/^.*u(\d+).*$/, "$1") / 10);
}

function $(id) {
	return document.getElementById(id);
}

if ($('content')) { // is T3.5
	stats.capacity[0][0] = 50;
	stats.capacity[2][0] = 35;
}

function toggle_display(style) {
	if (style.display != 'none') {
		style.display = 'none';
		style.visibility = 'hidden';
	} else {
		style.display = '';
		style.visibility = 'visible';
	}
}

function toggle_ca() {
	toggle_display($('compact_attacks').style);
}

function toggle_minor_attacks() {
	toggle_display(document.styleSheets[0].cssRules[0].style);
}

// report parsing
if (location.href.match(/berichte\.php\?id/)) {
	var div_container = $('lmid2') || $('content');
	var report_tables = div_container.getElementsByTagName('table')[0].rows[3].cells[0].getElementsByTagName('table');
	var attack_table = report_tables[0];
	var farm_row = attack_table.rows[attack_table.rows.length-1];
	var farmed = 0;
	try { farmed = eval(farm_row.cells[1].textContent.replace(/\s+\|\s+/g, "+")); } catch(e) {};
	var img_base = attack_table.rows[1].cells[1].firstChild;
	var race = get_race_from_img(img_base);
		img_src_base = img_base.src.replace(/^(.*)img.*$/, "$1");
	var total_capacity = 0;
	var bs = {
		update_stats: function(xtable, race, stat_type) {
			this[stat_type] = {i:0, c:0};
			for (i=0; i<10; i++) {
				this[stat_type].i += parseInt(xtable.rows[2].cells[i+1].innerHTML) * stats[stat_type+'_i'][race][i];
				this[stat_type].c += parseInt(xtable.rows[2].cells[i+1].innerHTML) * stats[stat_type+'_c'][race][i];
			}
		},
		relative_def: function() {
			if (this.off.i + this.off.c) {
				return (this.def.i * this.off.i + this.def.c * this.off.c) / (this.off.i + this.off.c);
			} else {
				return (this.def.i + this.def.c) / 2;
			}
		}
	}		
	if (attack_table.rows[4]) {
		var wasTrapped = (attack_table.rows[4].cells.length > 2);
		for (i=0; i<10; i++) {
			total_capacity +=
				(parseInt(attack_table.rows[2].cells[i+1].innerHTML)
				-parseInt(attack_table.rows[3].cells[i+1].innerHTML)
				-(wasTrapped?parseInt(attack_table.rows[4].cells[i+1].innerHTML):0))
				* stats.capacity[race][i];
		}
		bs.update_stats(attack_table, race, 'off');
		attack_table.rows[1].cells[0].innerHTML = '<img src="'+img_src_base+'img/un/a/att_all.gif" /> ' + number_multi(bs.off.i + bs.off.c);
		// highlight farm info
		if (total_capacity) {
			if (total_capacity == farmed) {
				farm_row.cells[0].innerHTML = farm_row.cells[0].innerHTML.bold();
			} else {
				farm_row.cells[0].innerHTML += ' ' + Math.round(100 * farmed / total_capacity) + '%';
			}
		}
		for (var t = 1; t < report_tables.length; t++) {
			race = get_race_from_img(report_tables[t].rows[1].cells[1].firstChild.src);
			bs.update_stats(report_tables[t], race, 'def');
			report_tables[t].rows[1].cells[0].innerHTML =
				'<img src="'+img_src_base+'img/un/a/def_all.gif" /> ' + 
				number_multi(bs.relative_def());
		}
	} else try {
		bs.update_stats(attack_table, race, 'def');
		attack_table.rows[1].cells[0].innerHTML =
			'<img src="'+img_src_base+'img/un/a/def_i.gif" /> ' + number_multi(bs.def.i) + '<br/>' +
			'<img src="'+img_src_base+'img/un/a/def_c.gif" /> ' + number_multi(bs.def.c);
	} catch(e) {}
}


function find_stats(xtable) {
	for (i=xtable.length-1; i>=2; i--) {
		if (xtable.rows[i].cells[2].className=='ou') {
			result = {
				rank: xtable.rows[i].cells[0].innerHTML.replace(/(\d+)\.\s+/, "$1"),
				pts:  xtable.rows[i].cells[4].innerHTML
			};
		}
	}
	return result;
}

function ajax_post(url, callback, data_params) {
	http_request = new XMLHttpRequest();
	if (http_request.overrideMimeType) {
		http_request.overrideMimeType('text/html');
	}
	http_request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				callback(this);
			} else {
				alert('There was a problem with the request.');
			}
		}
    }
	http_request.open('POST', url, true);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http_request.setRequestHeader("Content-length", data_params.length);
	http_request.setRequestHeader("Connection", "close");
	http_request.send(data_params);
}

function add_rating(player_table, source) {
	var xrow = player_table.insertRow(9);
	xrow.insertCell(0).innerHTML = 1;
}

if (location.href.match(/spieler\.php.*\?uid/)) {
	var xtable = document.getElementById('lmid2').getElementsByTagName('table')[0];
	var player_name = xtable.rows[0].cells[0].innerHTML.replace(/^.*?\s(.*)$/, "$1");
/*	ajax_post(
		"statistiken.php&id=31",
		add_rating(xtable),
		'id=31&rang=1&name='+player_name
	);*/
//	ajax_post("statistiken.php&id=32", function(){;}, 'id=32&rang=1&name='+player_name);
}

if (location.href.match(/build\.php/)
&&	location.href.match(/(gid\=16)|(id\=39)/)) {
	var div_container = $('lmid2') || $('content');
	var tables = div_container.getElementsByTagName('table');
	var z, cell, ta = 1;
	var tbl = document.createElement('table');
	tbl.className = "tbg";
	tbl.setAttribute('cellspacing', 1);
	tbl.setAttribute('id', 'compact_attacks');
	tbl.style.position = 'absolute';
	tbl.style.left = '30px';
	tbl.style.top = '180px';
	tbl.style.display = 'none';
	with (tbl.insertRow(0).insertCell(0)) {
		className = '';
		setAttribute('colspan', 5);
		setAttribute('align', 'center');
		innerHTML = "<a href='#a' id='minor_attacks_switcher'>minor</a>";
	}
	document.styleSheets[0].insertRule('tr.minor {}', 0);
//	tbl.style.opacity = 0.9;
	for (var t = 0; t < tables.length; t++) if(tables[t].rows[1]) {
		cell = tables[t].rows[0].cells[0];
		var links = cell.getElementsByTagName('a');
		if (links.length) {
			z = parseInt(links[0].href.replace(/^.*d\=(\d+).*$/, "$1")) - 1;
			s = "(" + ((z % 801) - 400) + "|" + (400 - Math.floor(z / 801)) + ")";
			coords = "<span style='font-weight:bold; color:gray;'>" + s + "</span>";
			tables[t].rows[1].cells[0].innerHTML += coords;
		}
		cell = tables[t].rows[3].cells[1];
		var spans = cell.getElementsByTagName('span');
		if (spans && spans[0]
		&&	spans[0].id.match(/timer\d+/)
		&&	tables[t].rows[0].cells[1].textContent.match(/^Нападение на/)) {
			var r = tbl.insertRow(ta++);
			r.insertCell(0).innerHTML = coords;
			r.insertCell(1).innerHTML = '<img src="'+gp_path+'img/un/a/att1.gif"/>';
			r.insertCell(2).innerHTML = tables[t].rows[1].cells[9].innerHTML;
			r.insertCell(3).innerHTML = cell.firstChild.rows[0].cells[0].innerHTML;
			r.insertCell(4).innerHTML = cell.firstChild.rows[0].cells[1].innerHTML;
			r.className = 'minor';
		}
	}
	div_container.appendChild(tbl);
	for(var r = 1; r < tbl.rows.length; r++) {
		if (r > 1 && tbl.rows[r-1].cells[4].innerHTML == tbl.rows[r].cells[4].innerHTML)
			tbl.rows[r].className = 'cbg1';
		if (r < tbl.rows.length-1 && tbl.rows[r+1].cells[4].innerHTML == tbl.rows[r].cells[4].innerHTML)
			tbl.rows[r].className = 'cbg1';
	}
	var menu = div_container.getElementsByClassName('txt_menue')[0];
	menu.innerHTML += " | <a href='#a' name='a'>#compact</a>";
	menu.getElementsByTagName('a')[3].addEventListener('click', toggle_ca, false);
	$('minor_attacks_switcher').addEventListener('click', toggle_minor_attacks, false);
}

} catch(e) {
	window.status = e;
}