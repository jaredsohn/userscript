// ==UserScript==
// @name           hwmxcharfind
// @namespace      Demin
// @description    fast player search from any page
// @homepage       http://userscripts.org/scripts/show/92570
// @version        2.00
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://*freebsd-help.org/*
// @include        http://*heroes-wm.*/*
// @include        http://*hommkingdoms.info/*
// @include        http://*hmmkingdoms.com/*
// @include        http://*герои.рф/*
// @include        http://*.lordswm.*/*
// @exclude        */ch_box.php*
// @exclude        */chatonline.php*
// @exclude        */chat_line.php*
// @exclude        */chatpost.php*
// @exclude        */chat.php*
// @exclude        */ticker.html*
// ==/UserScript==

// (c) 2011, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '2.00';

var script_num = 92570;
var script_name = 'HWM mod - Char Find (by Demin)';
var string_upd = /92570=(\d+\.\d+)/;

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

try {

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

if ((tag('body'))[0]) {

var text_find, text_go1, text_go2, text_go3;

if (url.match('lordswm')) {
	text_find = 'Character/clan search';
	text_go1 = 'Character name: ';
	text_go2 = 'Character ID: ';
	text_go3 = 'Clan ID: ';
} else {
	text_find = 'Поиск персонажа или клана';
	text_go1 = 'Имя персонажа: ';
	text_go2 = 'ID персонажа: ';
	text_go3 = 'ID клана: ';
}

var alla = document.getElementsByTagName('img');
var got = false;

for (var i=0; i<alla.length; i++) {
//	if (i>7) {break;}
	if (alla[i].src.indexOf('logo_') >= 0) {
		if (alla[i].parentNode.tagName == 'A') {
			got = alla[i];
			break;
		}
	}
}

if (got) {

var newdiv = document.createElement('div');
with (newdiv.style) {
	visibility = 'hidden';
	position = 'absolute';
	borderStyle = 'solid';
	borderColor = '#b2b1aa';
	borderWidth = '1px';
	padding = '0px';
	zIndex = '3';
	left = '0';
	top = '0';
}



newdiv.innerHTML = '<table cellspacing=4 cellpadding=0 bgcolor="#ffffff">'+
'<tr><td><center><b>'+text_find+'</b></center></td></tr>'+
'<tr><td align="right" ><br>'+text_go1+'&nbsp;&nbsp;<input type=text id="hwm_s_name" value="" maxlength="20"> <input type="submit" id="hwm_s_name_ok" value="&darr;"> <input type="submit" id="hwm_s_name_ok2" value="&uarr;"></td></tr>'+
'<tr><td align="right" >'+text_go2+'&nbsp;&nbsp;&nbsp;&nbsp;<input type=text id="hwm_s_id" value="" maxlength="19"> <input type="submit" id="hwm_s_id_ok" value="&darr;"> <input type="submit" id="hwm_s_id_ok2" value="&uarr;"></td></tr>'+
'<tr><td align="right" >'+text_go3+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=text id="hwm_s_clanid" value="" maxlength="20"> <input type="submit" id="hwm_s_clanid_ok" value="&darr;"> <input type="submit" id="hwm_s_clanid_ok2" value="&uarr;"></td></tr>'+
'</table>';
document.body.appendChild(newdiv);

addEvent($("hwm_s_name_ok"), "click", hwm_s_name_f);
addEvent($("hwm_s_name_ok2"), "click", hwm_s_name_f2);
addEvent($("hwm_s_id_ok"), "click", hwm_s_id_f);
addEvent($("hwm_s_id_ok2"), "click", hwm_s_id_f2);
addEvent($("hwm_s_clanid_ok"), "click", hwm_s_clanid_f);
addEvent($("hwm_s_clanid_ok2"), "click", hwm_s_clanid_f2);

addEvent($("hwm_s_name"), "keypress", handleKeys1);
addEvent($("hwm_s_id"), "keypress", handleKeys2);
addEvent($("hwm_s_clanid"), "keypress", handleKeys3);

//got.parentNode.href = '/search.php';
got.parentNode.addEventListener('click', function(e) {
	e.preventDefault();
	if (newdiv.style.visibility == 'hidden') {
		newdiv.style.left = e.clientX + 5;
		newdiv.style.top = e.clientY + 5;
		newdiv.style.visibility = 'visible';
	} else {
		newdiv.style.visibility = 'hidden';
	}
}, false);

}

}

} finally { update_n() }

function hwm_s_name_f()
{
if (($("hwm_s_name").value.length)>=3) {
window.location = url + 'pl_info.php?nick=' + urlEncode($("hwm_s_name").value);
newdiv.style.visibility = 'hidden';
}
}
function hwm_s_name_f2()
{
if (($("hwm_s_name").value.length)>=3) {
window.open(url + 'pl_info.php?nick=' + urlEncode($("hwm_s_name").value), "_blank");
newdiv.style.visibility = 'hidden';
}
}
function hwm_s_id_f()
{
if (Number($("hwm_s_id").value)>=1 && ($("hwm_s_id").value.length)>=1) {
window.location = url + 'pl_info.php?id=' + ($("hwm_s_id").value);
newdiv.style.visibility = 'hidden';
}
}
function hwm_s_id_f2()
{
if (Number($("hwm_s_id").value)>=1 && ($("hwm_s_id").value.length)>=1) {
window.open(url + 'pl_info.php?id=' + ($("hwm_s_id").value), "_blank");
newdiv.style.visibility = 'hidden';
}
}
function hwm_s_clanid_f()
{
if (Number($("hwm_s_clanid").value)>=0 && ($("hwm_s_clanid").value.length)>=1) {
window.location = url + 'clan_info.php?id=' + ($("hwm_s_clanid").value);
newdiv.style.visibility = 'hidden';
}
}
function hwm_s_clanid_f2()
{
if (Number($("hwm_s_clanid").value)>=0 && ($("hwm_s_clanid").value.length)>=1) {
window.open(url + 'clan_info.php?id=' + ($("hwm_s_clanid").value), "_blank");
newdiv.style.visibility = 'hidden';
}
}

function handleKeys1(e)
{
	var evt = (e) ? e : window.event;	//IE reports window.event not arg
	var c = (evt.charCode) ? evt.charCode : evt.keyCode;
	if(c == 13) {
		hwm_s_name_f();
		return;
	}
}
function handleKeys2(e)
{
	var evt = (e) ? e : window.event;	//IE reports window.event not arg
	var c = (evt.charCode) ? evt.charCode : evt.keyCode;
	if(c == 13) {
		hwm_s_id_f()
		return;
	}
}
function handleKeys3(e)
{
	var evt = (e) ? e : window.event;	//IE reports window.event not arg
	var c = (evt.charCode) ? evt.charCode : evt.keyCode;
	if(c == 13) {
		hwm_s_clanid_f()
		return;
	}
}

function urlEncode(str) {
    // Простая проверка
    if (!str || typeof(str) == "undefined") return;
    // Создаем хеш для хранения символов, где ключ - сам символ,
    // а значение - его шестнадцатеричеый эквивалент
    var utf8Array = {};
    // Сначала добавляем стандартные 255 символов
    var i = j = j2 = 0;
    for (i = 0; i <= 255; i++) {
        j = parseInt(i/16); var j2 = parseInt(i%16);
        utf8Array[String.fromCharCode(i)] = ('%' + j.toString(16) + j2.toString(16)).toUpperCase();
    }
    // И отдельно проработаем кириллицу
    var rusAdditional = {
        '_' : '%5F', 'А' : '%C0', 'Б' : '%C1', 'В' : '%C2', 'Г' : '%C3', 'Д' : '%C4', 'Е' : '%C5',
        'Ж' : '%C6', 'З' : '%C7', 'И' : '%C8', 'Й' : '%C9', 'К' : '%CA', 'Л' : '%CB', 'М' : '%CC',
        'Н' : '%CD', 'О' : '%CE', 'П' : '%CF', 'Р' : '%D0', 'С' : '%D1', 'Т' : '%D2', 'У' : '%D3',
        'Ф' : '%D4', 'Х' : '%D5', 'Ц' : '%D6', 'Ч' : '%D7', 'Ш' : '%D8', 'Щ' : '%D9', 'Ъ' : '%DA',
        'Ы' : '%DB', 'Ь' : '%DC', 'Э' : '%DD', 'Ю' : '%DE', 'Я' : '%DF', 'а' : '%E0', 'б' : '%E1',
        'в' : '%E2', 'г' : '%E3', 'д' : '%E4', 'е' : '%E5', 'ж' : '%E6', 'з' : '%E7', 'и' : '%E8',
        'й' : '%E9', 'к' : '%EA', 'л' : '%EB', 'м' : '%EC', 'н' : '%ED', 'о' : '%EE', 'п' : '%EF',
        'р' : '%F0', 'с' : '%F1', 'т' : '%F2', 'у' : '%F3', 'ф' : '%F4', 'х' : '%F5', 'ц' : '%F6',
        'ч' : '%F7', 'ш' : '%F8', 'щ' : '%F9', 'ъ' : '%FA', 'ы' : '%FB', 'ь' : '%FC', 'э' : '%FD',
        'ю' : '%FE', 'я' : '%FF', 'ё' : '%B8', 'Ё' : '%A8'
    }
    for (i in rusAdditional) utf8Array[i] = rusAdditional[i];
    // Посимвольно заменяем символы на их шестнадцатиречные эквиваленты
    var res = "";
    for(i = 0; i < str.length; i++) {
        var simbol = str.substr(i,1);
        res += typeof utf8Array[simbol] != "undefined" ? utf8Array[simbol] : simbol;
    }
    // Пробелы заменяем на плюсы
//    res = res.replace(/\s/g, "+");
//alert(res);
    return res;
}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }

function addEvent(elem, evType, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(evType, fn, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent("on" + evType, fn)
	}
	else {
		elem["on" + evType] = fn
	}
}

function createXMLHttpReq(rndm)
{
	var objXMLHttpReq;
	
	if (window.XMLHttpRequest)
	{
		// Real browsers ;)
		//
		objXMLHttpReq = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		// IE
		//
		objXMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	return objXMLHttpReq;
}

function update_n() {
if ( (parseInt(GM_getValue('last_update', '0')) + 86400000 <= (new Date().getTime())) || (parseInt(GM_getValue('last_update', '0')) > (new Date().getTime())) ) {
var objXMLHttpReqUpd = createXMLHttpReq(Math.random()* 1000000);
objXMLHttpReqUpd.open('GET', url + 'photo_pl_photos.php?aid=1777' + '&rand=' + (Math.random()* 1000000), true);
objXMLHttpReqUpd.onreadystatechange = function() { update(objXMLHttpReqUpd); }
objXMLHttpReqUpd.send(null);
}
}
function update(obj) {
if (obj.readyState == 4 && obj.status == 200) {
var update_text1 = '\n\n\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 Greasemonkey \u0441\u043A\u0440\u0438\u043F\u0442\u0430 "';
var update_text2 = '".\n\u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E?';
var remote_version, rt;rt=obj.responseText;GM_setValue('last_update', ''+new Date().getTime());remote_version=string_upd.exec(rt)[1];if(version!=-1){if (remote_version > version) setTimeout(function() { if(confirm('There is an update available for the Greasemonkey script "'+script_name+'".\nWould you like to go to the install page now?'+update_text1+script_name+update_text2)){window.open('http://userscripts.org/scripts/show/'+script_num, '_blank')} }, 100) }}
}
