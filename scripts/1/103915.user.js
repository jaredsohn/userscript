// ==UserScript==
// @name           QuickVocsStart_GeneralVersion
// @namespace      klavogonki
// @include        http://klavogonki.ru/vocs/*
// @author         Fenex
// @author-page    http://klavogonki.ru/profile/82885/
// @version        5.1
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function saveQuickVocsStart(i) {
	var type = $('type'+i.toString()).value;
	var level_from = $('level_from'+i.toString()).value;
	var level_to = $('level_to'+i.toString()).value;
	var timeout = $('timeout'+i.toString()).value;
	var qual = $('qual'+i.toString()).checked ? '1' : '0';
	var QVStxt = $('QVStxt_'+i.toString()).value;
	localStorage['QVS_'+i.toString()] = type + ":" + level_from + ":" + level_to + ":" + timeout + ":" + qual + ":" + QVStxt;
}

function loadQuickVocsStart() {
	if(!localStorage['QVS_0']||!localStorage['QVS_1']||!localStorage['QVS_2'])
		for(var i=0;i<3;i++)
			localStorage['QVS_'+i.toString()] = 'normal:1:9:20:0:Название';
	
	var txt = '';
	var elem = document.getElementsByClassName('user-title')[0].getElementsByClassName('remove')[0];
	
	for(var i=0;i<3;i++) {
		var opt = localStorage['QVS_'+i.toString()].split(':');
		var qual = opt[4]=='1' ? '&qual=1' : '';
		var href = "http://klavogonki.ru/create?gametype=voc&voc="+location.href.match(/\d+/)+"&type="+opt[0]+"&level_from="+opt[1]+"&level_to="+opt[2]+"&timeout="+opt[3]+qual+"&submit=Начать";
		txt += "<a href='"+href+"'><span>"+opt[5]+"</span></a>";
	}
	
	var e = document.createElement('td');
	e.setAttribute('class', 'links');
	e.setAttribute('id', 'td_QSUS');
	e.innerHTML = txt;
	elem.parentNode.parentNode.insertBefore(e, elem.parentNode.nextSibling);
}

function showStartPopup_QVS() {
	var txt = '<table><tr><td style="height:50px;font-weight:bold;text-align:center;" colspan=9>Настройки быстрого старта по словарю</td></tr><tr style="color:#777777;font-weight:bold;text-align:center;"><td>Имя</td><td>Тип игры</td><td colspan=3>Допуск игроков</td><td>Таймаут</td><td>Квалификация</td><td></td></tr>';
	for(i=0;i<3;i++) {
		txt += '<tr><td><input type="text" value="Название" id="QVStxt_'+i.toString()+'" /></td><td><select id="type'+i.toString()+'"><option value="normal">Открытая игра</option><option value="private">Игра с друзьями</option><option value="practice">Одиночный заезд</option></select></td><td><select style="width:120px;" id="level_from'+i.toString()+'"><option value="1" selected="">новички</option><option value="2">любители</option><option value="3">таксисты</option><option value="4">профи</option><option value="5">гонщики</option><option value="6">маньяки</option><option value="7">супермены</option><option value="8">кибергонщики</option><option value="9">экстракиберы</option></select></td><td> — </td><td><select style="width:120px;" id="level_to'+i.toString()+'"><option value="1">новички</option><option value="2">любители</option><option value="3">таксисты</option><option value="4">профи</option><option value="5">гонщики</option><option value="6">маньяки</option><option value="7">супермены</option><option value="8">кибергонщики</option><option value="9" selected="">экстракиберы</option></select></td><td><select id="timeout'+i.toString()+'"><option value="5">5 сек</option><option value="10">10 сек</option><option value="20">20 сек</option><option value="30" selected="">30 сек</option><option value="45">45 сек</option><option value="60">1 мин</option></select></td><td><input type="checkbox" id="qual'+i.toString()+'"></div></td><td><input onclick="saveQuickVocsStart('+i.toString()+')" type="button" value="Сохранить" /></td></tr>';
	}
	txt += '</table>';
	popalert(txt);
	for(var i=0;i<3;i++) {
		var opt = localStorage['QVS_'+i.toString()].split(':');
		$('type'+i.toString()).value = opt[0];
		$('level_from'+i.toString()).value = opt[1];
		$('level_to'+i.toString()).value = opt[2];
		$('timeout'+i.toString()).value = opt[3];
		$('qual'+i.toString()).checked = opt[4]==1 ? true : false;
		$('QVStxt_'+i.toString()).value = opt[5];
	}
}

var s = document.createElement('script');
s.innerHTML = showStartPopup_QVS+saveQuickVocsStart+loadQuickVocsStart+"loadQuickVocsStart();";
document.body.appendChild(s);

var elem = document.getElementsByClassName('user-title')[0].getElementsByClassName('remove')[0];
elem.setAttribute('style', 'display:block;');
var e = document.createElement('span');
e.setAttribute('onclick', 'showStartPopup_QVS()');
e.setAttribute('class', 'QVS_buttons');
e.innerHTML = 'Настройка';
elem.parentNode.insertBefore(e, elem.nextSibling);

s = document.createElement('style');
s.innerHTML = '.QVS_buttons{display:block;padding-left:15px;color:#AA3333;font-size:11px;cursor:pointer;margin-left:7px;}';
document.body.appendChild(s);