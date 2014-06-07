// ==UserScript==
// @name             User Spy [GW]
// @namespace        s3kat0r.com
// @description      При наведении мышкой на персонажа в бою, показывает структуру его действий в последнем бою.
// @include          http://www.ganjawars.ru/b0/*
// @include          http://www.ganjawars.ru/warlog.php*
// @include          http://ganjawars.ru/b0/*
// @include          http://ganjawars.ru/warlog.php*
// @version          1.3.0
// @author           s3kat0r
// @source           http://www.ganjawars.ru/syndicate.php?id=8516
// ==/UserScript==




(function() {

/*********************************НАСТРОЙКИ*********************************/
var image_ajax  = 'data:image/gif;base64,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';
var tool_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAn0lEQVQ4jcWTsQrEIBBEZ4+D/JsYgiG9v2a6FCKItvm13atOCMZgLsUtWMzIvh1WJBHBk3o96gbwPjPXdW3GstbSJYCI4JzDPM9VcwihLwEA9O6mCdi2rfKGYegHLMtSeSmlyqte4RudmeG9L4eZTwdd7sAYU4G7AcyMGGPR0zTdB4zjeNC3ACKCnHPRWuv7CZRSvyfY9711dSj6+2/8AH4bSPZr42rVAAAAAElFTkSuQmCC'; // картинка возле перса, нажав на которую всплывет тултип.

// Используется html5 механизм sessionStorage для сохранения результатов, чтобы повторно не запрашивать одно и тоже. Работает в opera 10.53 и в mozilla 3.6.3
var is_cache    = true;  // кешировать результаты в sessionStorage браузера или нет (для старых браузеров)
var event_click = true; // true - при клике на иконку и false для срабатывания при наведении мышкой.

// настройки цветов

var border_color  = '#339933'; // цвет бордюра ячеек
var head_color    = '#999966'; // фоновый цвет верхней части таблицы (№, атака, отход)
var simple_color  = '#eeffee'; // фоновый цвет обычной ячейки
var current_color = '#fff0f0'; // фоновый цвет ячейки текущего хода

/*********************************НАСТРОЙКИ*********************************/


/********************************* "Глобальные" переменные *********************************/
var root     = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var handle   = root;
var war_type = 'js'; // вид боя (js - javascript, nojs - обычный, view - просмотр боя)
/********************************* "Глобальные" переменные*********************************/


/*opera bug fix*/


if (root.location.href.indexOf('ganjawars.ru/b0/') == -1 && root.location.href.indexOf('ganjawars.ru/warlog.php') == -1) {
	return false;
}

var css = '.s3c_div {position: absolute}'+"\r\n";
   css += '.s3c_td_head {border: 1px solid '+border_color+';    background: '+head_color+'}'+"\r\n";
   css += '.s3c_td_simple {border: 1px solid '+border_color+';  background: '+simple_color+'}'+"\r\n";
   css += '.s3c_td_current {border: 1px solid '+border_color+'; background: '+current_color+'}'+"\r\n";
   css += '.s3c_table {'+"\r\n";
   css += 'border-spacing:0;'+"\r\n";
   css += 'font-size: 11px;'+"\r\n";
   css += 'text-align: center;'+"\r\n";
   css += 'padding:2px;'+"\r\n";
   css += 'border-collapse: collapse;}'+"\r\n";

if (root.location.href.indexOf('ganjawars.ru/b0/btk.php') != -1 || root.location.href.indexOf('ganjawars.ru/b0/btl.php') != -1 ) {
	war_type = 'js';
	handle = root.parent;
} else if (root.location.href.indexOf('ganjawars.ru/b0/b.php') != -1) {
	war_type = 'nojs';
} else {
	war_type = 'view';
}

/*проверяем версии браузеров*/
if (is_cache) {
	if (window['sessionStorage'] == null) {
		alert('Ваш браузер не поддерживает кеширование результатов. Скачайте Opera 10.53 или Mozilla Firefox 3.6.3 или выше версии');
		is_cache = false;
	}
}

/*сборщик мусора*/
if (is_cache) {
	var bid = root.bid;
	if (bid == null) {
		var geted = /bid=(\d+)/.exec(root.location.href);
		if (geted != null) {
			bid = geted[1];
		} else {
			bid = 0;
		}
	}

	if (sessionStorage.getItem('bid') == null || sessionStorage.getItem('bid') != bid) {
		sessionStorage.clear();
		sessionStorage.setItem('bid', bid);
	}
}

var style = handle.document.createElement('style');
style.setAttribute('type', 'text/css');
style.appendChild(handle.document.createTextNode(css));
handle.document.getElementsByTagName('head')[0].appendChild(style);
var links = handle.document.body.getElementsByTagName('a');
for (i = 0, l = links.length; i < l; i++) {
	var match = /^userheader(\d+)$/.exec(links[i].getAttribute('id'));
	if (match != null) {
		var id = match[1];
		if (event_click) {
			if (handle.document.getElementById('tool_image_'+id) != null) {
				continue;
			}
			var tool_link     = handle.document.createElement('img');
			tool_link.id      = 'tool_image_'+id;
			tool_link.src     = tool_image;
			tool_link.alt     = 'Показать последний бой';
			bindEvent(tool_link, 'onclick', (function(id_){return function(){s3c_query(id_)}})(id));
			links[i].parentNode.insertBefore(tool_link, links[i]);
		} else {
			bindEvent(links[i], 'onmouseover', (function(id_){return function(){s3c_query(id_)}})(id));  /* Я НЕНАВИЖУ ЗАМЫКАНИЯ в JS. Знайте это! */
			bindEvent(links[i], 'onmouseout', (function(id_){return function(){hideTooltip(id_)}})(id)); /* Я НЕНАВИЖУ ЗАМЫКАНИЯ в JS. Знайте это! */
		}
	}
}
return false;


function hideTooltip (id) {
	var div = handle.document.getElementById('s3c_div_'+id);
	if (div != null) {
		div.setAttribute('style', 'display:none');
	}
}

function showToolTipHtml_NOJS(html, user_id) {
	var div        = handle.document.getElementById('s3c_div_'+user_id);
	var userheader = handle.document.getElementById('userheader'+user_id);

	var center_tr  = userheader.parentNode.parentNode.parentNode.rows[1].cells[1];
	var listright  = userheader.parentNode.parentNode.parentNode.rows[1].cells[2];

	var side = '';
	if (userheader.parentNode.cellIndex == 0) {
		side = 'left';
	} else {
		side = 'right';
	}

	div.innerHTML  = html;

	var posCenter = getPosition(center_tr);
	var posUser   = getPosition(userheader);
	var posRight  = getPosition(listright);

	var tipX     = 0;
	var tipY     = posUser.y;

	div.setAttribute('style', 'display:inline');
	
	if (side == 'right') {
		tipX = posRight.x - 3 - div.offsetWidth;
	} else {
		tipX = posCenter.x + 5;
	}

	/*fix*/
	div.style.left = tipX;
	div.style.top  = tipY;
}



function showToolTipHtml_VIEW(html, user_id) {
	var div        = handle.document.getElementById('s3c_div_'+user_id);
	var userheader = handle.document.getElementById('userheader'+user_id);

	var center_tr  = userheader.parentNode.parentNode.parentNode.rows[0].cells[1];
	var listright  = userheader.parentNode.parentNode.parentNode.rows[0].cells[2];

	var side = '';
	if (userheader.parentNode.cellIndex == 0) {
		side = 'left';
	} else {
		side = 'right';
	}
	div.innerHTML  = html;

	var posCenter = getPosition(center_tr);
	var posUser   = getPosition(userheader);
	var posRight  = getPosition(listright);

	var tipX     = 0;
	var tipY     = posUser.y;

	div.setAttribute('style', 'display:inline');
	
	if (side == 'right') {
		tipX = posRight.x - 3 - div.offsetWidth;
	} else {
		tipX = posCenter.x + 5;
	}

	/*fix*/
	div.style.left = tipX;
	div.style.top  = tipY;
}


function showToolTipHtml_JS(html, user_id) {
	var div  = handle.document.getElementById('s3c_div_'+user_id);

	var listleft   = handle.document.getElementById('listleft');
	var listright  = handle.document.getElementById('listright');
	var userheader = handle.document.getElementById('userheader'+user_id);
	var side = '';
	if (userheader.parentNode.id == 'listleft') {
		side = 'left';
	} else {
		side = 'right';
	}

	div.innerHTML  = html;

	var posRight = getPosition(listright);
	var posLeft  = getPosition(listleft);
	var posUser  = getPosition(userheader);

	if (posLeft.x > posRight.x) {
		var buf  = posRight;
		posRight = posLeft;
		posLeft  = buf;
		side     = side == 'left' ? 'right' : 'left';
	}

	var tipX     = 0;
	var tipY     = posUser.y;

	div.setAttribute('style', 'display:inline');
	
	if (side == 'right') {
		tipX = posRight.x - 3 - div.offsetWidth;
	} else {
		tipX = listleft.clientWidth + 5;
	}

	/*fix*/
	div.style.left = tipX;
	div.style.top  = tipY;
}


function rev(string) {
	var ret = '';
	switch (string) {
		case 'left'     : ret = 'влево';  break;
		case 'right'    : ret = 'вправо'; break;
		case 'center'   : ret = 'центр';  break;
		case 'dead'     : ret = 'умер';   break;
		case 'enter'    : ret = 'вошел в бой';    break;
		case 'miss'     : ret = 'пропустил ход';  break;
		case 'grenade'  : ret = 'бросил гранату'; break;
		case 'grenade2' : ret = 'гранатомет'; break;
		case 'gwars'    : ret = 'графический бой'; break;
		default:
			ret = 'неизвестно';
	}
	return ret;
}

function setToolTip(data) {
	/*делаем html таблицу для данных*/
	data['step'] = getStep();
	var html = '';

	html += '<table class="s3c_table" align="center" cellspacing=0 cellpadding=0>'+"\r\n";
	html += '<tr>'+"\r\n";
	html += '<td class="s3c_td_head">№</td>'+"\r\n";
	if (data['2hands']) {
		html += '<td class="s3c_td_head">1 рука</td> <td class="s3c_td_head">2 рука</td>'+"\r\n";
	} else {
		html += '<td class="s3c_td_head">Атака</td>'+"\r\n";
	}
	html += '<td class="s3c_td_head">Отход</td></tr>'+"\r\n";
	if (data['type'] == 'gwars') {
		html += '<tr>'+"\r\n";
		html += '<td class="s3c_td_simple" colspan="3">графический бой</td>'+"\r\n";
		html += '</tr>'+"\r\n";
	} else if (data['history'] == null || data['history'][1] == null) {
		html += '<tr>'+"\r\n";
		html += '<td class="s3c_td_simple" colspan="3">Хрень какая-то</td>'+"\r\n";
		html += '</tr>'+"\r\n";
	} else {
		for (i in data['history']) {
			var style_class = (data['step'] == i) ? 's3c_td_current' : 's3c_td_simple';
			html += '<tr>'+"\r\n";
			if (data['history'][i]['attack'] == 'dead') {
				html += '<td class="s3c_td_simple" colspan="'+(data['2hands'] ? 4 : 3)+'">'+rev(data['history'][i]['attack'])+'</td></tr>'+"\r\n";
				continue;
			} else if (data['history'][i]['attack'] == 'enter') {
				html += '<td class="s3c_td_simple" colspan="'+(data['2hands'] ? 4 : 3)+'">'+rev(data['history'][i]['attack'])+'</td></tr>'+"\r\n";
				continue;
			}
			html += '<td class="'+style_class+'">'+i+'</td>'+"\r\n";
			if (data['2hands'] && data['history'][i]['attack'] != null) {
				html += '<td class="'+style_class+'" colspan="'+(data['2hands'] ? 2 : 1)+'">'+rev(data['history'][i]['attack'])+'</td>'+"\r\n";
			} else if (data['2hands']) {
				html += '<td class="'+style_class+'">'+rev(data['history'][i]['attack1'])+'</td><td class="'+style_class+'">'+rev(data['history'][i]['attack2'])+'</td>'+"\r\n";
			} else {
				html += '<td class="'+style_class+'">'+rev(data['history'][i]['attack'])+'</td>'+"\r\n";
			}

			html += '<td class="'+style_class+'">'+rev(data['history'][i]['defense'])+'</td>'+"\r\n";
			html += '</tr>'+"\r\n";
		}
	}
	html += '</table>'+"\r\n";

	/*показываем тултип и убираем картинку*/
	switch (war_type) {
		case 'js'  : showToolTipHtml_JS(html, data['user_id']);   break;
		case 'nojs': showToolTipHtml_NOJS(html, data['user_id']); break;
		case 'view': showToolTipHtml_VIEW(html, data['user_id']); break;
	}
	var img_ajax = handle.document.getElementById('img_ajax'+data['user_id']);
	if (img_ajax != null) {
		img_ajax.setAttribute('style', 'display:none');
	}

	/*правда же?*/
	return true;
}


function s3c_query (user_id) {
	var div = handle.document.getElementById('s3c_div_'+user_id);
	if (div == null) {
		div = handle.document.createElement('div');
		div.setAttribute('id', 's3c_div_'+user_id);
		div.setAttribute('class', 's3c_div');
		dragMaster.makeDraggable(div);
		div.setAttribute('style', 'display:none');
		bindEvent(div, 'ondblclick', (function(id_){return function(){hideTooltip(id_)}})(user_id));
		handle.document.body.appendChild(div);
	}
	if (is_cache && sessionStorage.getItem(user_id) != null) {
		if (sessionStorage.getItem(user_id) == '0') {
			return false;
		}
		var data = eval('('+sessionStorage.getItem(user_id)+')');
		setToolTip(data);
	} else {
		if (is_cache) {
			sessionStorage.setItem(user_id, '0');
		}
		var link     = handle.document.getElementById('userheader'+user_id);
		var img_ajax = handle.document.getElementById('img_ajax'+user_id);
		if (img_ajax == null) {
			img_ajax = handle.document.createElement('img');
			img_ajax.setAttribute('id', 'img_ajax'+user_id);
			img_ajax.setAttribute('src', image_ajax);
			link.parentNode.insertBefore(img_ajax, link);
		} else {
			img_ajax.setAttribute('style', 'display:inline');
		}
		var xmlhttp = getXmlHttp();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					var content = xmlhttp.responseText;
					var match = /<a href=\/warlog\.php\?bid=(\d+)>/.exec(content);
					if (match != null) {
						var last_war_id = match[1];
						parse_war_log(user_id, last_war_id);
					} else {
						alert('У этого игрока, нет боев');
						link.setAttribute('style',     'color:red');
						img_ajax.setAttribute('style', 'display:none');
						sessionStorage.removeItem(user_id);
						return false;
					}
				} else {
					alert('s3c_query: error 2');
					link.setAttribute('style',     'color:red');
					img_ajax.setAttribute('style', 'display:none');
					sessionStorage.removeItem(user_id);
					return false;
				}
			}
		}
		xmlhttp.open('GET', '/info.warstats.php?id='+user_id, true);
		xmlhttp.send(null);
	}
	return false;
}

function parse_war_log (user_id, war_id) {
	var link     = handle.document.getElementById('userheader'+user_id);
	var img_ajax = handle.document.getElementById('img_ajax'+user_id);
	var xmlhttp = getXmlHttp();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var content = xmlhttp.responseText;
				pre_parse(user_id, war_id, content);
			} else {
				alert('parse_war_log: error');
				link.setAttribute('style',     'color:red');
				img_ajax.setAttribute('style', 'display:none');
				return false;
			}
		}
	}
	xmlhttp.open('GET', '/warlog.php?bid='+war_id, true);
	xmlhttp.send(null);
}


function pre_parse(user_id, war_id, content) {
	var data = {};
	var link     = handle.document.getElementById('userheader'+user_id);
	var img_ajax = handle.document.getElementById('img_ajax'+user_id);
	data['war_id']  = war_id;
	data['user_id'] = user_id;
	data['type']    = 'undef';
	data['2hands']  = false;
	var match       = /<b>(.*?)<\/b>/i.exec(link.innerHTML);
	if (match != null) {
		data['user_name'] = match[1];
	} else {
		setToolTip(data);
		return true;
	}
	if (content.indexOf('Посмотреть поле боя') != -1) {
		data['type'] = 'gwars';
		if (is_cache) {
			/*json формат для хранения*/
			var textjson = JSON.stringify(data);
			sessionStorage.setItem(user_id, textjson);
		}
		setToolTip(data);
		return true;
	} else {
		var pos  = content.indexOf('<span class=txt>');
		if (pos == -1) {
			setToolTip(data);
			return false;
		}
		var log    = content.substring(pos);
		log        = log.substring(0, log.indexOf('</table>'));
		var pos_br = log.indexOf('<BR>');
		var desc   = log.substring(0, pos_br);
		match = /<\/font>\s\((.*?)\)$/i.exec(desc);
		if (match == null) {
			if (desc.indexOf('1 на 1') != -1) {
				data['type'] = 'armed';
			} else {
				data['type'] = 'group';
			}
		} else {
			if (match[1].indexOf('Нападение') != -1) {
				data['type'] = 'killer';
			} else if (match[1].indexOf('Захват') != -1) {
				data['type'] = 'attacks';
			} else if (match[1].indexOf('1 на 1') != -1) {
				data['type'] = 'armed';
			} else if (match[1].indexOf('Бой в секторе') != -1) {
				data['type'] = 'out';
			} else if (/\[ <b><font color=#660000>\$\d+<\/font><\/b> \]/.test(match[1])) {
				data['type'] = 'street';
			} else {
				data['type'] = 'group';
			}
		}
		log         = log.substring(pos_br);
		/*отсекаем информацию о победе*/
		var pos = -1;
		if ((pos = log.indexOf('Победа за')) != -1) {
			log  = log.substring(0, pos);
		} else if ((pos = log.indexOf('Бой закончен')) != -1) {
			log  = log.substring(0, pos);
		} else if ((pos = log.indexOf('Все умерли')) != -1) {
			log  = log.substring(0, pos);
		} else if ((pos = log.indexOf('за нанесённые повреждения')) != -1) {
			log  = log.substring(0, pos);
		}
		var hash    = {};
		var counter = 0;
		var array   = log.split('<BR>');
		for (i in array ) {
			var flag = false;
			var line = array[i];
			/*fix color nick*/
			if (line == '' || line == null) {
				continue;
			}
			/*фиксим методы от prototype gwpanel*/
			if (!/^\d+$/.test(i)) {
				continue;
			}
			line = line.replace(new RegExp('<font color=[^>]+>'+regexp_quote(data['user_name'])+'<\/font>', 'i'), data['user_name']);

			if (line.indexOf(data['user_name']) == -1) {
				continue;
			}
			if (/<!--- user\d+talk ---->/.test(line)) {
				continue;
			}
			match = /\d+:\d+, #(\d+) :/.exec(line);
			if (match == null) {
				if (line.indexOf('<b>'+data['user_name']+'</b> is dead') != -1) {
					counter++;
					hash[counter]    = [];
					hash[counter][0] = 'is dead';
				} else if (line.substring(0, 3) == '***') {
					continue;
				} else if (line.indexOf(data['user_name']+' входит в бой') != -1) {
					counter++;
					hash[counter]    = [];
					hash[counter][0] = 'enter';
				}
				continue;
			}
			if (line.indexOf('Взрыв от гранаты') != -1 || line.indexOf('подходит ближе') != -1) {
				continue;
			}
			counter = match[1];
			if (hash[counter] == null) {
				hash[counter]    = [];
				hash[counter][0] = line;
				if (new RegExp('#\\d+ : <b>'+regexp_quote(data['user_name'])+'<\/b>', 'i').test(line)) {
					flag = false;
				} else {
					flag = true;
				}
			} else {
				if (!new RegExp('#\\d+ : <b>'+regexp_quote(data['user_name'])+'<\/b>', 'i').test(line)) {
					if (flag) {
						continue;
					}
					flag = true;
				}
				hash[counter].push(line);
			}
		}
		var hash2 = {};
		for (i in hash) {
			/*фиксим методы от prototype gwpanel*/
			if (!/^\d+$/.test(i)) {
				continue;
			}
			var hist = {};
			for (j in hash[i]) {
			/*фиксим методы от prototype gwpanel*/
				if (!/^\d+$/.test(j)) {
					continue;
				}
				var line  = hash[i][j];
				var array = parseStringLog(line, data['user_name']);
				if (array['attack'] != '') {
					if (array['attack'] == 'grenade' || array['attack'] == 'dead' || array['attack'] == 'miss') { /*если мертв, или кидал гранату*/
						hist['attack'] = array['attack'];
					} else {
						if (hist['attack'] == null) { /*если не было уже ходов*/
							hist['attack'] = array['attack'];
						} else { /*атакует с двух рук*/
							data['2hands']  = true;
							hist['attack1'] = hist['attack'];
							hist['attack2'] = array['attack'];
							delete hist['attack'];
						}
					}
				}
				if (array['defense'] != '') {
					hist['defense'] = array['defense'];
				}
			}
			if (hist['defense'] == null) {
				hist['defense'] = '';
			}
			hash[i] = hist;
		}
		data['history'] = [];
		data['history'] = hash;
		var user_id  = data['user_id'];
		if (is_cache) {
			/*json формат для хранения*/
			var textjson = JSON.stringify(data);
			sessionStorage.setItem(user_id, textjson);
		}
		setToolTip(data);
		return true;
	}
}

function parseStringLog (line, user_name) {
	if (line == '' || line == null) {
		return {};
	}
	var data   = {};
	var line_a = '';
	var line_z = '';
	if (line == 'is dead') {
		data['attack']  = 'dead';
		data['defense'] = '';
		return data;
	} else if (line == 'enter') {
		data['attack']  = 'enter';
		data['defense'] = '';
		return data;
	} else if (line.indexOf('<b>'+user_name+'</b> пропускает ход') != -1) {
		data['attack']  = 'miss';
		data['defense'] = '';
		return data;
	}
	/*удаляем время и номер шага*/
	line = line.replace(/\d+:\d+, #\d+ : /i, '');
	/*удаляем урон*/
	line = line.replace(/: <font.*?$/i, '');
	if (line.substring(0, 18) == 'Снаряд, выпущенный') {
		data['attack']  = 'grenade2';
		data['defense'] = '';
		return data;
	}
	var pos    = line.indexOf(':');
	if (pos != -1) { /*взорвал грену*/
		line_a = line.substring(0, pos);
		line_z = '';
	} else if (line.indexOf(', но') == -1 && line.indexOf(', хотя') == -1 && line.indexOf(', который') == -1 && line.indexOf(', которая') == -1 && 
		((pos = line.indexOf('и влепил')) != -1 || (pos = line.indexOf('и зарядил')) != -1)) { /гренометчик*/
		if (line_a.substring(0, user_name.length + 7) == '<b>'+user_name+'</b>') {
				data['attack']  = 'grenade2';
				data['defense'] = '';
			} else {
				data['attack']  = '';
				data['defense'] = '';
			}
		return data;
	} else if ((pos = line.indexOf(',')) != -1) { /*обычная стрельба*/
		line_a = line.substring(0, pos);
		line_z = line.substring(pos + 1);
	} else {
		if (line.indexOf('<b>'+user_name+'</b> закрывает свою команду дымовой завесой') != -1 || 
			line.indexOf('<b>'+user_name+'</b> запустил осветительную ракету') != -1) {
			data['attack']  = 'grenade';
			data['defense'] = '';
			return data;
		}
	}
	if (line_a.substring(0, user_name.length + 7) == '<b>'+user_name+'</b>') {
		if (line_a.indexOf('прямо') != -1 || line_a.indexOf('во врага') != -1 || line_a.indexOf('перед собой') != -1) {
			data['attack'] = 'center';
		} else if (line_a.indexOf('левее') != -1 || line_a.indexOf('влево') != -1) {
			data['attack'] = 'left';
		} else if (line_a.indexOf('правее') != -1 || line_a.indexOf('вправо') != -1) {
			data['attack'] = 'right';
		} else if (line_a.indexOf('взорвал') != -1) {
			data['attack'] = 'grenade';
		} else {
			alert('ERROR: undefined method attack => ['+line_a+']');
		}
	} else {
		if (line_z == '') {
			data['defense'] = '';
		} else if (line_z.indexOf('замер') != -1 || line_z.indexOf('вкопанный') != -1 || line_z.indexOf('стояла') != -1 || 
					line_z.indexOf('поправляя прическу') != -1 || line_z.indexOf('стоять') != -1 || line_z.indexOf('присел') != -1) {
			data['defense'] = 'center';
		} else if (line_z.indexOf('влево') != -1) {
			data['defense'] = 'left';
		} else if (line_z.indexOf('вправо') != -1) {
			data['defense'] = 'right';
		} else {
			alert('ERROR: undefined method defense => ['+line_z+']');
		}
	}
	if (data['attack'] == null) {
		data['attack'] = '';
	}
	if (data['defense'] == null) {
		data['defense'] = '';
	}
	return data;
}


function getStep() {
	var step    = 1;
	var content = '';
	if (war_type == 'js') {
		var div_log = handle.document.getElementById('log');
		if (div_log == null) {
			return 0;
		}
		content = div_log.innerHTML;
	} else if (war_type == 'nojs') {
		var divs   = handle.document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; ++i) {
			if (divs[i].parentNode.getAttribute('class') == 'txt' && divs[i].getAttribute('style') == 'font-size:8pt') {
				if (divs[i].innerHTML.indexOf('начался бой') != -1) {
					content = divs[i].innerHTML;
					break;
				}
			}
		}
	} else if (war_type == 'view') {
		var spans   = handle.document.getElementsByTagName('span');
		for (var i = 0; i < spans.length; ++i) {
			if (spans[i].getAttribute('class') == 'txt') {
				if (spans[i].innerHTML.indexOf('начался бой') != -1) {
					content = spans[i].innerHTML;
					break;
				}
			}
		}
	}

	match = /\d+:\d+, #(\d+) :/.exec(content);
	if (match != null) {
		step = parseInt(match[1]) + 1;
	}
	return step;
}



function bindEvent(element, event, callback) {
	if (!element) {
		return;
	}
	if (element.addEventListener) {
		if (event.substr(0, 2) == 'on') {
			event = event.substr(2);
		}
		element.addEventListener(event, callback, false);
	} else if (element.attachEvent) {
		if (event.substr(0, 2) != 'on') {
			event = 'on'+event;
		}
		element.attachEvent(event, callback, false);
	}
	return;
}


function unbindEvent(element, event, callback) {
	if (!element) {
		return;
	}
	if (element.addEventListener) {
		if (event.substr(0, 2) == 'on') {
			event = event.substr(2);
		}
		if (!callback) {
			element.setAttribute('on'+event, null);
		} else {
			element.removeEventListener(event, callback, false);
		}
	} else if (element.attachEvent) {
		if (event.substr(0, 2) != 'on') {
			event = 'on'+event;
		}
		if (!callback) {
			element.event = null;
		} else {
			element.detachEvent(event, callback);
		}
	}
	return;
}

function getPosition(p) {
	var s = { x:0, y:0 };
	while (p.offsetParent) {
		s.x += p.offsetLeft;
		s.y += p.offsetTop;
		p = p.offsetParent;
	}
	return s;
}

function getXmlHttp() {
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function regexp_quote(str) {
	return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}


})();




/**
* drag and drop controller from http://javascript.ru/
*/

var dragMaster = (function() {

	var dragObject
	var mouseOffset
	var root     = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	var handle   = root;


	function getPosition(p) {
		var s = { x:0, y:0 };
		while (p.offsetParent) {
			s.x += p.offsetLeft;
			s.y += p.offsetTop;
			p = p.offsetParent;
		}
		return s;
	}


	function fixEvent(e) {
		// получить объект событие для IE
		e = e || handle.window.event

		// добавить pageX/pageY для IE
		if ( e.pageX == null && e.clientX != null ) {
			var html = handle.document.documentElement
			var body = handle.document.body
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
		}

		// добавить which для IE
		if (!e.which && e.button) {
			e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
		}

		return e
	}

	function setRoot(value) {
		root = value;
	}

	function getMouseOffset(target, e) {
		var docPos	= getPosition(target)
		return {x:e.pageX - docPos.x, y:e.pageY - docPos.y}
	}

	function mouseUp(){
		dragObject = null

		// clear events
		handle.document.setAttribute('onmousemove', null);
		handle.document.setAttribute('onmouseup', null);
		handle.document.setAttribute('ondragstart', null);
		handle.document.body.setAttribute('onselectstart', null);
	}

	function mouseMove(e){
		e = fixEvent(e)
		if (!dragObject) {
			return;
		}

		with(dragObject.style) {
			position = 'absolute'
			top = e.pageY - mouseOffset.y + 'px'
			left = e.pageX - mouseOffset.x + 'px'
		}
		return false
	}

	function mouseDown(e) {
		e = fixEvent(e)
		if (e.which!=1) return

		dragObject  = this
		mouseOffset = getMouseOffset(this, e)

		handle.document.addEventListener('mousemove', mouseMove, true);
		handle.document.addEventListener('mouseup', mouseUp, true);

		return false
	}

	return {
		makeDraggable: function(element){
			element.addEventListener('mousedown', mouseDown, true);
		}
	}

}());

