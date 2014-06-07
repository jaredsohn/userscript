// ==UserScript==
// @name           [GW] Sector Attack
// @description    Сортирует таблицу недвижимости сектора. Работает в Opera 10.10 и Firefox 3.0
// @include        http://www.ganjawars.ru/map.php*
// @include        http://www.ganjawars.ru/syndicate.php?id=*&page=politics
// @exclude        http://www.ganjawars.ru/map.php?sx=*&sy=*&st=shops
// @exclude        http://www.ganjawars.ru/map.php?sx=*&sy=*&st=houses
// @exclude        http://www.ganjawars.ru/map.php?sx=*&sy=*&st=destroyed
// @version        1.3
// @author         z0man
// ==/UserScript==

(function() {

var my_name = 'Сортировка сектора';

var Opera = navigator.appName.indexOf('pera') >= 0;
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var s_sind = 100500;
var checkbox_state = getCookie('filter_sa');
if (checkbox_state == null) { checkbox_state = 'false' }

if (/^http:\/\/www\.ganjawars\.ru\/syndicate\.php\?id=(\d+)&page=politics/.test(root.location.href)) {

	var a = root.document.getElementsByTagName('a');
	for (j = 0; j < a.length; j++) {
		
		if (a[j].textContent == 'Протокол боёв') { var log_wars = a[j] }
		
	}
	
	// добавляем чекбокс
	var checkbox = root.document.createElement('span');
	checkbox.innerHTML = ' | <span style = "cursor: pointer;">' + my_name + ' </span><input id = box type = checkbox>';
	log_wars.parentNode.insertBefore(checkbox, log_wars.nextSibling);
	var box = root.document.getElementById('box');
	if (checkbox_state == 'true') { box.checked = true }
	if (checkbox_state == 'false') { box.checked = false }
	
	// обрабтываем клик
	box.onclick = function() {
		
		// кука для состояния чекбокса
		setCookie('filter_sa', this.checked, 0, '/');
		
		// кука для номеров вражеских синдов
		var tmp = root.document.getElementsByTagName('b');
		for (j = 0; j < tmp.length; j++) {
			
			if (tmp[j].textContent == 'Объявленные войны:') {
				
				var war_list_all = tmp[j].parentNode.innerHTML;
				var war_list_li = new Array();
				var war_list_li_number = '';
				if (Opera) { war_list_li = war_list_all.split('<LI>') }
				else { war_list_li = war_list_all.split('<li>') }
				for (m = 1; m < war_list_li.length; m++) { war_list_li_number = war_list_li_number + /\d+/i.exec(war_list_li[m]) + ' ' }
				war_list_li_number = war_list_li_number.substring(0, war_list_li_number.length - 1);
				
				setCookie('war_list_all', war_list_li_number, 0, '/');
				
				break;
				
			}
			
		}
		
	}
	
}

if (root.location.href.indexOf('http://www.ganjawars.ru/map.php') >= 0 && checkbox_state == 'true') {

	// ищем таблицу недвижимости
	var tmp = root.document.getElementsByTagName('b');
	for (i = 0; i < tmp.length; i++) {

		// нашли
		if ((/Тип/.test(tmp[i].textContent)) && tmp[i].parentNode.parentNode.bgColor == '#ddffdd') {
			
			// сортируем
			var tr_all = tmp[i].parentNode.parentNode.parentNode.innerHTML;
			var tr_sorted = sort(tr_all);
			tmp[i].parentNode.parentNode.parentNode.innerHTML = tr_sorted;
			
			break;
			
		}
		
	}
	
}

function sort(tr_all) {

var result = '';
var tr_array = new Array();
var tmp_array = '';
var str_up = '';
var str_down = '';
var war_list_li_number_с = getCookie('war_list_all');

var war_list_tr = new Array();
war_list_tr = war_list_li_number_с.split(' ');

	if (Opera) { tr_array = tr_all.split('</TR>') } else { tr_array = tr_all.split('</tr>') }
	for (k = 1; k < tr_array.length; k++) {
		
		no_double = 0;
		if (/e0ffe0/.test(tr_array[k])) { str_down += tr_array[k] + '</tr>'; continue; }
		
		tmp_array = tr_array[k].split('<a href="/object.php?id=')[0];
		tmp1 = /http:\/\/images\.ganjawars\.ru\/img\/synds\/(\d+)\.gif/.exec(tmp_array);
		if (tmp1 == null) { str_up += tr_array[k] + '</tr>' }
		
		if (tmp1 != null) {
			for (c = 1; c < war_list_tr.length; c++) {
				if (war_list_tr[c] == tmp1[1]) { str_up += tr_array[k] + '</tr>'; no_double = 1; break; }
			}
			for (c = 1; c < war_list_tr.length; c++) {
				if (war_list_tr[c] != tmp1[1] && no_double == 0) { str_down += tr_array[k] + '</tr>'; break; }
			}
			
		}
		
	}
	
	if (Opera) { str_up = tr_array[0] + '</tr>' + str_up }

result = tr_array[0] + str_up + str_down;
return(result);

}

function setCookie (name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

})();