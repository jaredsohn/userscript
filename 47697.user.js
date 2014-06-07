// ==UserScript==
// @name           HWM_Hunt_Records_Analyzer
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/pl_hunter_stat.php*
// @include        http://www.heroeswm.ru/plstats_hunters.php*
// ==/UserScript==

var url_cur = location.href;
var race = url_cur.match(/race=(\d+)/);
var level = url_cur.match(/level=(\d+)/);

if (url_cur.match(/plstats_hunters\.php/)) {
	document.body.innerHTML = document.body.innerHTML.replace(/<b>\u0420\u0435\u0439\u0442\u0438\u043d\u0433 \u043e\u0445\u043e\u0442\u043d\u0438\u043a\u043e\u0432 <\/b>/,
	'<b>\u0420\u0435\u0439\u0442\u0438\u043d\u0433 \u043e\u0445\u043e\u0442\u043d\u0438\u043a\u043e\u0432 </b> <a href="javascript:void(0)" id="save" title="\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0440\u0435\u043a\u043e\u0440\u0434\u044b \u0434\u043b\u044f \u0434\u0430\u043d\u043d\u043e\u0433\u043e \u0443\u0440\u043e\u0432\u043d\u044f \u0438 \u0444\u0440\u0430\u043a\u0446\u0438\u0438">[#]</a> ');
	document.getElementById('save').addEventListener('click', analyze, false);
}

print();

function analyze() {
	if (!race) {
		alert('\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u0430 \u0444\u0440\u0430\u043a\u0446\u0438\u044f');
		return;
	}
	if (!level) {
		alert('\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d \u0443\u0440\u043e\u0432\u0435\u043d\u044c');
		return;
	}
	var mobs_arr = document.body.innerHTML.match(/<tr><td rowspan="\d+" class="wblight">&nbsp;<a href="army_info\.php\?name=(\w+)" class="pi">[^<]+<\/a><\/td><td class="wblight"><a name="\w+"><\/a><b><a class="pi" href="pl_info\.php\?id=\d+">[\S]+&nbsp;<img src="i\/r\d+\.gif" title="[^"]+" align="absmiddle" border="\d+" width="\d+" height="\d+"> \[\d+\]<\/a> - <a href="warlog\.php\?warid=\d+">(\d+)<\/a><\/b><\/td><\/tr>/g);
	var s = "";
	if (mobs_arr) {
		for (var i = 0; i < mobs_arr.length; i++) {
			var data = mobs_arr[i].match(/<tr><td rowspan="\d+" class="wblight">&nbsp;<a href="army_info\.php\?name=(\w+)" class="pi">[^<]+<\/a><\/td><td class="wblight"><a name="\w+"><\/a><b><a class="pi" href="pl_info\.php\?id=\d+">[\S]+&nbsp;<img src="i\/r\d+\.gif" title="[^"]+" align="absmiddle" border="\d+" width="\d+" height="\d+"> \[\d+\]<\/a> - <a href="warlog\.php\?warid=\d+">(\d+)<\/a><\/b><\/td><\/tr>/);
			s += data[1] + '=' + data[2] + '|';
		}
	}
	mobs_arr = document.body.innerHTML.match(/<tr><td rowspan="\d+" class="wblight">&nbsp;<a href="army_info\.php\?name=(\w+)" class="pi">[^<]+<\/a><\/td><td class="wblight"><a name="\w+"><\/a><a href="clan_info\.php\?id=\d+"><img[^>]*><\/a><img[^>]*><b><a class="pi" href="pl_info\.php\?id=\d+">[\S]+&nbsp;<img src="i\/r\d+\.gif" title="[^"]+" align="absmiddle" border="\d+" width="\d+" height="\d+"> \[\d+\]<\/a> - <a href="warlog\.php\?warid=\d+">(\d+)<\/a><\/b><\/td><\/tr>/g);
	if (mobs_arr) {
		for (var i = 0; i < mobs_arr.length; i++) {
			var data = mobs_arr[i].match(/<tr><td rowspan="\d+" class="wblight">&nbsp;<a href="army_info\.php\?name=(\w+)" class="pi">[^<]+<\/a><\/td><td class="wblight"><a name="\w+"><\/a><a href="clan_info\.php\?id=\d+"><img[^>]*><\/a><img[^>]*><b><a class="pi" href="pl_info\.php\?id=\d+">[\S]+&nbsp;<img src="i\/r\d+\.gif" title="[^"]+" align="absmiddle" border="\d+" width="\d+" height="\d+"> \[\d+\]<\/a> - <a href="warlog\.php\?warid=\d+">(\d+)<\/a><\/b><\/td><\/tr>/);
			s += data[1] + '=' + data[2] + '|';
		}
	}
	if (s.length > 1) {
		s = s.substring(0, s.length - 1);
	}
	GM_setValue('records', s);
	alert('saved');
//	alert(s);
}

function print() {
	if (!url_cur.match(/pl_hunter_stat\.php/)) { return;}
	
	var records = GM_getValue('records', '');
	if (records == '') {
		alert('\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e \u0440\u0435\u043a\u043e\u0440\u0434\u043e\u0432');
		return;
	}
	records = records.split('|');
	var rec_arr = new Array();
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		var name = record.split('=')[0];
		rec_arr[name] = record.split('=')[1];
	}
	
	var table_arr = document.getElementsByTagName('table');
	var table = table_arr[table_arr.length - 1];
	var tr_arr = table.childNodes;
	for (var i = 1; i < tr_arr.length; i++) {
		var tr = tr_arr[i];
		var mob = tr.childNodes[0].innerHTML.match(/name=(\w+)/)[1];
		var td = document.createElement('td');
		var cur_number = Number(tr.childNodes[1].innerHTML.match(/<a href="warlog\.php\?warid=\d+">(\d+)<\/a>/)[1]);
		td.setAttribute('class', 'wblight');
		td.innerHTML = '<img height="15" width="15" border="0" src="i/map/nl' + getDanger(cur_number, Number(rec_arr[mob])) + '.gif" title="' + rec_arr[mob] + '"/>';
		tr.appendChild(td);
	}
}

function getDanger(n, r) {
	if (n / r < 0.30) {
		return 1;
	}
	if (n / r < 0.50) {
		return 2;
	}
	if (n / r < 0.70) {
		return 3;
	}
	if (n / r < 1.00) {
		return 4;
	}
	return 5;	
}