// ==UserScript==
// @name           hwm_forum_moder
// @namespace      Demin
// @description    HWM mod - Forum moder by Demin
// @homepage       http://userscripts.org/scripts/show/145856
// @version        1.00
// @include        http://*heroeswm.*/forum*
// @include        http://178.248.235.15/forum*
// @include        http://*heroeswm.*/pl_info.php*
// @include        http://178.248.235.15/pl_info.php*
// @include        http://*герои.рф/?15091
// @exclude        http://daily.heroeswm.ru/*
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.00';

var script_num = 145856;
var script_name = 'HWM mod - Forum moder by Demin';
var string_upd = /145856=(\d+\.\d+)/;

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

if ( (tag('body'))[0] ) {

// ssylka na modera
if ( location.pathname=='/forum_messages.php' || location.pathname=='/pl_info.php' ) {
var all_a = tag('b');
var a_len = all_a.length;
for (var i=a_len; i--;) {
var a_i = all_a[i];
if ( a_i.parentNode.innerHTML.match("\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435\u043b\u0435\u043c <b>") && ( a_i.parentNode.tagName=='I' || a_i.parentNode.tagName=='FONT' ) ) {
a_i.innerHTML = '<a class=pi href="pl_info.php?nick='+urlEncode(a_i.innerHTML)+'"><font color=red>'+a_i.innerHTML+'</font></a>';
}
}
}

// vklychit' modera
if ( location.pathname=='/forum_messages.php' ) {
var all_a = tag('a');
var a_len = all_a.length;
for (var i=a_len; i--;) {
var a_i = all_a[i];
if ( a_i.href.match(/&md=1/) && a_i.innerHTML.match(/\/\//) ) {

setTimeout(function() { window.location=a_i.href; }, 500);
break;

} else if ( a_i.href.match(/&md=0/) && a_i.innerHTML.match(/\/\//) ) {

// dobavit' ssylki zabanit' dlya zabanenyh
var all_a = tag('tr');
var a_len = all_a.length;
for (var j=a_len; j--;) {
var a_i = all_a[j];
if ( a_i.className=='message_footer' && !all_a[j+2].innerHTML.match(/forum_ban.php/) ) {
//http://www.heroeswm.ru/forum_messages.php?tid=1721654
//http://www.heroeswm.ru/forum_ban.php?mid=26356510&pid=3928999&page=0
var mid = (/name=.?(\d+)/).exec(a_i.innerHTML)[1];
var pid = (/pl_info\.php\?id=(\d+)/).exec(a_i.innerHTML)[1];
var page = (/page=(\d+)/).exec(a_i.innerHTML)[1];

var add_ban = document.createElement('div');
add_ban.setAttribute('align', 'right');
add_ban.innerHTML = "<a href='forum_ban.php?mid="+mid+"&pid="+pid+"&page="+page+"'>\u0417\u0430\u0431\u0430\u043d\u0438\u0442\u044c</a>";
all_a[j+2].lastChild.appendChild(add_ban);
}
}

break;
}
}
}

// posle bana nazad k teme
if ( location.pathname=='/forum_ban.php' ) {
var all_a = tag('a');
var a_len = all_a.length;
for (var i=a_len; i--;) {
var a_i = all_a[i];
if ( a_i.parentNode.innerHTML.match(/<\/a><br><br>\u0417\u0430\u0431\u0430\u043d\u0435\u043d.<br>/) ) {
setTimeout(function() { window.location=a_i.href; }, 500);
break;
}
}
}

}

} finally { update_n() }

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
