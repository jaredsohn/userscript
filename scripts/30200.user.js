// ==UserScript==
// @name           Extended Ally
// @namespace      ExtendedAlly
// @description    Extends Ally page with filter options
// @include        http://*.travian*.*/allianz.php*
// ==/UserScript==

var DEBUG = true;

window.addEventListener('DOMContentLoaded', main, false);
if (document.body) main();

var uid;
var diplomacy;
var users;

function main() {
	init();
	
	var params = location.search;
	if (!params) {
		diplomacy = getDiplomacy();
		users = getUsers();
		saveData();
		return;
	}

	loadData();
	debugData();
	
	if (params == '?s=3') {
		debug('ATACKS');
		addOptions();
	}
}

function init() {
	uid = location.hostname + '_' + getUserId();
	debug('uid: ' + uid);
}

function saveData() {
	GM_setValue('conf_' + uid, diplomacy.conf.join('\n'));
	GM_setValue('naps_' + uid, diplomacy.naps.join('\n'));
	GM_setValue('war_' + uid, diplomacy.war.join('\n'));
	GM_setValue('usrs_' + uid, users.join('\n'));
}

function loadData() {
	var conf = GM_getValue('conf_' + uid, '').split('\n');
	var naps = GM_getValue('naps_' + uid, '').split('\n');
	var war = GM_getValue('war_' + uid, '').split('\n');
	diplomacy = {conf : conf, naps : naps, war : war};
	users = GM_getValue('usrs_' + uid, '').split('\n');
}

function debugData() {
	debug('Conf: ' + diplomacy.conf);
	debug('NAPs: ' + diplomacy.naps);
	debug('War: ' + diplomacy.war);
	debug('Users: ' + users);
}

// Retrieve data from Travian

function getDiplomacy() {
	var res = $x('//div[@id="lmid2"]//table[1]//td//p');
	if (res.length != 3) return;

	var data = {conf : getAllys(res[0]), naps : getAllys(res[1]), war : getAllys(res[2])};

	debug('Conf: ' + data.conf);
	debug('NAPs: ' + data.naps);
	debug('War: ' + data.war);

	return data;
}

function getAllys(init) {
	var el = init.nextSibling;
	var res = [];
	while (el && el.firstChild.nodeName == 'A') {
		res.push(el.firstChild.textContent);
		el = el.nextSibling;
		if (el && el.nodeName != 'DIV') el = null;
	}
	return res;
}

function getUsers() {
	var usr = [];
	var res = $x('//div[@id="lmid2"]//table[2]//tr').slice(1);
	for each (row in res) {
		usr.push(row.cells[1].firstChild.textContent);
	}
	debug('Users: ' + usr);
	return usr;
}

function getUserId() {
	var ref = $x('//table[@id="navi_table"]//td[@class="menu"]/a[contains(@href, "spieler")]')[0].href;
	return ref.substring(ref.indexOf('uid=') + 4).split("&")[0];
}

// Modify travian pages

// function hideRows() {
// 	var rows = $x('//div[@id="lmid2"]//table[1]//tr').slice(1);
// 	for each (row in rows) {
// 		row.style.display = 'none';
// 	}
// 	rows[5].style.display = '';
// }

function addOptions() {
	var set, form;

	set = $id('lmid2');
	set.appendChild($cn('p'));

	var formHTML =	'<table class="tbg" cellpadding="2" cellspacing="1">' +
			'<tbody>' +
			'<tr class="rbg"><td colspan="2">Opciones</td></tr>' +
			'<tr>' +
			'<td class="s7" width="20%">Mostrar:</td>' +
			'<td class="s7">' +
			'<input name="rtype" value="0" checked="checked" type="radio"> Todo<br>' +
			'<input name="rtype" value="1" type="radio"> Ataques<br>' +
			'<input name="rtype" value="2" type="radio"> Defensas<br>' +
			'</td>' +
			'</tr><tr>' +
			'<td class="s7" width="25%">Jugador:</td>' +
			'<td class="s7">' +
			'<select name="aplayer" size="" class="fm">' +
			'<option value="0" selected="selected">Todos</option>';

	for each (user in users.sort()) {
		if (!user) continue;
		formHTML += '<option value="' + user + '">' + user + '</option>';
	}

	formHTML +=	'</select><br>o escribe el nombre<br>' +
			'<input name="gplayer" value="" maxlength="30" class="fm" style="width: 120px;" type="text">' +
			'</td>' +
			'</tr><tr>' +
			'<td class="s7" width="20%">Alianza:</td>' +
			'<td class="s7">';
			
	for each (ally in diplomacy.war) {
		if (!ally) continue;
		formHTML += '<input name="wally" value="' + ally + '" type="checkbox"> ' + ally + '<br>';
	}
			
	formHTML +=	'<input name="wally" value="0" type="checkbox"> <input name="ally" value="" maxlength="30" class="fm" style="width: 120px;" type="text"><br>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>';

	form = $cn('form', formHTML);
	form.id = 'showReports';

	set.appendChild(form);

	form.addEventListener('change', processOptions, true);
}

function processOptions() {
	var filter = {mode:0, player:[], ally:[]};

	var form = document.forms.namedItem('showReports').elements;
	for each (elem in form) {
		switch (elem.name) {
			case 'rtype':
				if (elem.checked)
					filter.mode = elem.value;
				break;
			case 'aplayer':
				if (elem.value != '0')
					filter.player.push(elem.value);
				break;
			case 'gplayer':
				if (elem.value != '')
					filter.player = filter.player.concat(elem.value.split(','));
				break;
			case 'wally':
				if (elem.checked) {
					var ally = form.namedItem('ally').value;
					if (elem.value == 0) {
						if (ally != '')
							filter.ally = filter.ally.concat(ally.split(','));
					}
					else {
						filter.ally.push(elem.value);
					}
				}
				break;
			default:
		}
	}

	debug(filter.mode);
	debug(filter.player);
	debug(filter.ally);
	
	applyFilter(filter);
}

function applyFilter(filter) {
	var rows = $x('//div[@id="lmid2"]//table/tbody/tr');
	rows = rows.slice(2); // Remove headers
	for each (row in rows) {
		var data = processRow(row);
		if (showRow(data, filter))
			row.style.display = '';
		else
			row.style.display = 'none';
	}

}

function processRow(row) {
	var tmp = row.cells[0].firstChild.src;
	var type = 0;
	if (tmp.indexOf('att_all.gif') != -1)
		type = 1;
	else if (tmp.indexOf('def1.gif') != -1)
		type = 2;
	var desc = row.cells[1].firstChild.textContent;
	var report = row.cells[1].firstChild.href;
	tmp = row.cells[2].firstChild.textContent.split(' - ');
	var allyAtt = tmp[0];
	var allyDef = tmp[1];
	return {
		type: type,
		desc: desc,
		att: allyAtt,
		def: allyDef
	};
}

function showRow(data, filter) {
	if (filter.mode == 1 && data.type == 2)
		return false;
	if (filter.mode == 2 && data.type == 1)
		return false;
	if (filter.player[0]) {
		var found = false;
		for each (player in filter.player) {
			if (data.desc.search(player, 'i') != -1)
				found = true;
		}
		if (!found) return false;
	}
	if (filter.ally[0]) {
		var found = false;
		for each (ally in filter.ally) {
			if (data.att.indexOf(ally) != -1 || data.def.indexOf(ally) != -1)
				found = true;
		}
		if (!found) return false;
	}
	return true;
}

// Helper functions

function debug(str) {
	if (DEBUG) GM_log(str);
}

function $x(xpath) {
	var arr = [];
	var xpr = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr.length == 0? null: arr;
}

function $id(id) {
	return document.getElementById(id);
}

function $cn(tag, html) {
	var elem = document.createElement(tag);
	if (html) elem.innerHTML = html;
	return elem;
}
