// ==UserScript==
// @name          DS Schnell links Pa-only
// @description   Fuegt in "Die Staemme" zusaetzliche Gebaeude-Links ein, sowie eine kleine Popup-Karte mit den eigenen Doerfern in bunt. Siehe auch die Beschreibung im Quellcode.
// @(z.B. #f00 ist rot, #0f0 ist gruen, #00f ist blau, #ff0 ist gelb, usw.)
// @Autor         Ich nicht
// @include       http://*.die-staemme.de/game.php*
// @include       http://*.staemme.ch/game.php*
// ==/UserScript==




(function(){


var village_colors = '#000#f00#fa0#ff0#af0#0f0#0fa#0ff#0af#00f#a0f#f0f#f0a#eee#700#740#077#047#007#407#707#704#f66#fa6#ff6#6f6#6ff#6af#f6a';


function set_village_color(id, col)
{
	var cols = GM_getValue('village_colors', '|');
	var str = '|' + id + '#';
	var i = cols.indexOf(str);
	if (i >= 0) {
		var j = cols.indexOf('|', i + 1);
		cols = cols.substr(0, i) + cols.substr(j);
	}
	cols += id + '#' + col.substr(1) + '|';
	GM_setValue('village_colors', cols);
}


function get_village_color(id)
{
	var cols = GM_getValue('village_colors', '|');
	var str = '|' + id + '#';
	var i = cols.indexOf(str);
	if (i >= 0) {
		i += str.length - 1;
		return (cols.substr(i, cols.indexOf('|', i) - i));
	}
	var list = GM_getValue('village_list', '');
	var j = 0;
	for (;;) {
		j = list.indexOf(id, j);
		if (j < 0) return('#888');
		if (j <= 1 || list.substr(j - 2, 2) == '<>') break;
		j++;
	}
	var k = list.indexOf('<>', j);
	if (k < 0) str = list.substr(j);
	else str = list.substr(j, k - j);
	j = str.lastIndexOf('(');
	k = str.lastIndexOf('|');
	var l = str.lastIndexOf(')');
	var x = parseInt(str.substr(j + 1, k - j - 1));
	var y = parseInt(str.substr(k + 1, l - k - 1));
	var col = village_colors.substr(
		(Math.floor(((x * 15619) ^ + y) * 36473) % (village_colors.length / 4)) * 4,
		4
	);
	return (col);
}


function village_links(id)
{
	return(
		'&nbsp;<a href="game.php?village=' + id + '&amp;screen=main"><img width=14 height=12 src="graphic/buildings/main.png" title="Hauptgebaeude" alt="" /></A>' +
		'&nbsp;<a href="game.php?village=' + id + '&amp;screen=barracks"><img width=14 height=12 src="graphic/buildings/barracks.png" title="Kaserne" alt="" /></A>' +
                '&nbsp;<a href="game.php?village=' + id + '&amp;screen=snob&mode=coin"><img width=14 height=12 src="/graphic/gold.png" title="Gold Münzen prägen" alt="" /></A>' +
		'&nbsp;<a href="game.php?village=' + id + '&amp;screen=market"><img width=14 height=12 src="graphic/buildings/market.png" title="Markt" alt="" /></A>' +
		'&nbsp;<a href="game.php?village=' + id + '&amp;screen=market&mode=own_offer"><img width=14 height=12 src="graphic/buildings/market.png" title="Markt Angebote" alt="" /></A>' 

	);
}


function map_link(isForMarket)
{
	return (
		'<a href="javascript:toggle_visibility(\'' +
		(isForMarket ? 'minimap_m' : 'minimap') +
		'\');"><img ' +
		(isForMarket ? 'width=15 height=15' : 'width=14 height=12') +
		' src="graphic/map/v5.png" title="Popup-Karte" alt="" /></A>&nbsp;'
	);
}


function map_div(isForMarket, village_id)
{
	var res = "";

	var div_name = isForMarket ? "minimap_m" : "minimap";

	var list = GM_getValue('village_list', '');
	var vs = new Array();
	for (var i = 0; i < list.length; ) {
		var j = list.indexOf('<>', i);
		var str;
		if (j < 0) {
			str = list.substr(i);
			i = list.length;
		}
		else {
			str = list.substr(i, j - i);
			i = j + 2;
		}
		j = str.indexOf(':');
		if (j < 0) continue;
		var vid = str.substr(0, j);
		str = str.substr(j + 1);
		j = str.lastIndexOf('(');
		var k = str.lastIndexOf('|');
		var l = str.lastIndexOf(')');
		if (j <= 0 || k <= j || l <= k) continue;
		var vname = str.substr(0, j - 1);
		var vx = parseInt(str.substr(j + 1, k - j - 1));
		var vy = parseInt(str.substr(k + 1, l - k - 1));
		vs.push(new Array(vx, vy, vid, vname));
	}

	var ref = location.href;
	var refpart1 = null;
	var refpart2 = null;
	var i = ref.indexOf('village=');
	if (i >= 0) {
		refpart1 = ref.substr(0, i + 8);
		var j = ref.indexOf('&',i);
		if (j > i) refpart2 = ref.substr(j);
		else refpart2 = "";
	}

	if (vs.length <= 0 || refpart1 == null) {
		res += '<div id="' + div_name + '" name="' + div_name + '"';
		res += ' style="position:absolute;left:10px;top:10px;display:none;';
		res += 'z-index:10;padding:10px;background:#fcc;border:1px solid #000">';
		if (vs.length <= 0) {
			res += '<p>Besuche bitte einmal die kombinierte Uebersicht damit dies funktioniert.</p>';
		}
		else {
			res += '<p>Fehler: Unerwartete URL</p>';
		}
		res += '<a href="javascript:toggle_visibility(\'' + div_name + '\');">&lt;OK&gt;</a>';
		res += '</div>';
		return (res);
	}

	var tx = 100000;
	var ty = 100000;
	var tw = -100000;
	var th = -100000;
	for (var i = 0; i < vs.length; i++) {
		var vx = vs[i][0];
		var vy = vs[i][1];
		if (tx > vx) tx = vx;
		if (ty > vy) ty = vy;
		if (tw < vx) tw = vx;
		if (th < vy) th = vy;
	}
	tw = tw - tx;
	th = th - ty;
	if (tw < 16) { tx -= Math.floor((16 - tw) / 2); tw = 16; }
	if (th < 16) { ty -= Math.floor((16 - th) / 2); th = 16; }

	var vsz = Math.min((window.outerHeight - 200) / th, (window.outerWidth - 100) / tw);
	if (vsz < 2) vsz = 2;
	if (vsz > 12) vsz = 12;

	var fsz = Math.floor(vsz * 1.3 + 0.5);
	if (vsz < 3) vsz = 3;
	if (vsz > 13) vsz = 13;

	res += '<div id="' + div_name + '" name="' + div_name + '"';
	res += ' style="display:none;position:absolute;z-index:10;left:10px;top:10px;';
	res += 'width:' + Math.floor(tw * vsz + fsz * 1.3 + 5 + 0.5) + 'px;';
	res += 'height:' + Math.floor(th * vsz + fsz * 1.3 + 13 + 0.5) + 'px;';
	res += 'padding-top:0px;';
	res += 'padding-right:5px;';
	res += 'padding-bottom:5px;';
	res += 'padding-left:5px;';
	res += 'background:#2a2;border:1px solid #000">';
	res += '<div align=right><a href="javascript:toggle_visibility(\'' + div_name + '\');">&lt;Schlie&szlig;en&gt;</a></div><br>';

	for (var i = 0; i < vs.length; i++) {
		var vx = vs[i][0];
		var vy = vs[i][1];
		var vid = vs[i][2];
		var vname = vs[i][3];
		var url = refpart1 + vid + refpart2;
		if (isForMarket) {
			url =
				"javascript:" +
				"document.forms[0].x.value=" + vx + ";" +
				"document.forms[0].y.value=" + vy + ";" +
				"toggle_visibility('" + div_name + "');"
			;
		}
		res += '<div style="position:absolute;z-index:11;padding:0px;';
		res += 'left:' + Math.floor((vx - tx) * vsz + 5) + 'px;';
		res += 'top:' + Math.floor((vy - ty) * vsz + 12) + 'px;';
		res += (vid == village_id ? 'border:3px solid #fff' : 'border:1px solid #000');
		res += '">';
		res += '<a href="' + url + '" title="'+vname+'"';
		res += ' style="font-size:' + fsz + 'px;font-family:courier;font-weight:bold;';
		res += 'background-color:' + get_village_color(vid) + ';color:#2a2;">';
		res += '&nbsp;&nbsp;';
		res += '</a>';
		res += '</div>';
	}

	res += '</div>';
	return (res);
}


if (/screen=/.test(location.href)) {

	var dcstr = document.cookie;
	var dcsrch = "fast_navigation=setup_color_of_"
	var dci = dcstr.indexOf(dcsrch);
	if (dci >= 0) {
		document.cookie = 'fast_navigation=setup_done';
		dci += dcsrch.length;
		var dce = dcstr.indexOf(";",dci);
		if (dce < 0) dce = dcstr.length;
		var id = dcstr.substr(dci, dce - dci);
		var val = prompt(
			"Farbe fuer das Dorf in der Popup-Karte:",
			get_village_color(id)
		);
		if (val) {
			if ((val.length != 4 && val.length != 7) || val.substr(0,1) != '#') {
				alert("Ungueltige Farbe: '"+val+"'");
			}
			else {
				set_village_color(id, val)
			}
		}
	}

	if (/screen=overview_villages/.test(location.href)) {
		var tables = document.getElementsByTagName('table');
		var village_table = null;
		for (var i = 0; i < tables.length; i++) {
			if (tables[i].className == 'vis') {
				var trs = tables[i].getElementsByTagName('tr');
				if (trs.length >= 2) {
					var spans = trs[1].getElementsByTagName('span');
					if (
						spans.length >= 2 &&
						spans[1] != null &&
						spans[1].id != null &&
						spans[1].id.substr(0, 11) == 'label_text_'
					) {
						village_table = tables[i];
						break;
					}
				}
			}
		}
		if (village_table != null) {
			var trs = village_table.getElementsByTagName('tr');
			var list = "";
			for (var i = 1; i < trs.length; i++) {
				var span = trs[i].getElementsByTagName('span')[1];
				if (
					span != null &&
					span.id != null &&
					span.id.substr(0, 11) == 'label_text_'
				) {
					var id = span.id.substr(11);
					list += id + ":" + span.innerHTML + "<>";
					var td = trs[i].getElementsByTagName('td')[0];
					td.innerHTML += '<BR>&nbsp;' + village_links(id);
				}
			}
			if (list.length > 0) {
				GM_setValue('village_list', list);
			}
		}
	}

	var village_id = null;

	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		if (trs[i].id == 'menu_row2') {
			var id = trs[i].innerHTML;
			var j = id.indexOf('village=');
			if (j >= 0) {
				id = id.substr(j+8);
				for (j = 0; id.charCodeAt(j) >= 48 && id.charCodeAt(j) < 58; j++) {}
				village_id = id.substr(0,j);
				trs[i].innerHTML += '<td>' + map_div(false, village_id) +
					map_link(false) + village_links(village_id) + '</td>';
			}
			break;
		}
	}

	if (
		/screen=market/.test(location.href) &&
		(!/mode=/.test(location.href) || /mode=send/.test(location.href)) &&
		village_id != null
	) {
		var elems = document.getElementsByTagName('select');
		var elem = null;
		for (var i = 0; i < elems.length; i++) {
			if (elems[i].name == 'target') { elem = elems[i]; break; }
		}
		if (elem != null) {
			var new_elem = document.createElement('span');
			new_elem.innerHTML =
				map_div(true, village_id) +
				"&nbsp;" + map_link(true) + "&nbsp;"
			;
			elem.parentNode.insertBefore(new_elem, elem);
		}
	}

	if (
		/screen=main/.test(location.href) &&
		village_id != null
	) {
		var forms = document.getElementsByTagName('form');
		var tbl = null;
		for (var i = 0; i < forms.length; i++) {
			if (/action=change_name/.test(forms[i].action)) {
				var tbls = forms[i].getElementsByTagName('table');
				if (tbls.length > 0) {
					tbl = tbls[0];
					break;
				}
			}
		}
		if (tbl != null) {
			tbl.innerHTML+='<TR><TD><A HREF="javascript:document.cookie=' +
				'\'fast_navigation=setup_color_of_' +
				village_id +
				'\';location.reload()">Farbe in Popup-Karte &auml;ndern</A></TD></TR>'
			;
		}
	}
}


})()
