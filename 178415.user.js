// ==UserScript==
// @name           [†Академия Миротворцев†] изменение ссылки на рулетку
// @description    меняет ссылку рулетки на "†Академия Миротворцев†"
// @version        1.3
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://*lordswm.*/*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2013+ mod for web, armin4ik  ( http://www.heroeswm.ru/pl_info.php?id=5348396 )
// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.3';

var script_num = 124668;
var script_name = 'HWM mod - Roulette delete by Demin';
var string_upd = /124668=(\d+\.\d+)/;

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

var dfv = '<b><font color="#ff9c00">†Академия Миротворцев†</font></b>';
if (url.match('lordswm')) {
dfv = '<b>Паутина</b>';
}



var dfr = '<b><font color="#ff9c00">Управление кланом</font>';



// menu
var all_a = tag('li');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( ( a_i.innerHTML.match(/frames\.php\?room=4/) && !a_i.innerHTML.match(/<b>/) ) || a_i.innerHTML.match(/inforoul\.php/) || a_i.innerHTML.match(/allroul\.php/) ) {
	a_i.parentNode.removeChild(a_i);
	}
}
var all_a = tag('a');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.href.match(/roulette\.php/) && a_i.innerHTML.match(/<b>.+<\/b>/) ) {
	a_i.href = 'clan_info.php?id=846';
	a_i.innerHTML = dfv;
	}
}



// roul



}

} finally {
if ( location.pathname=='/roulette.php' || location.pathname=='/gift_box_log.php' || location.pathname=='/allroul.php' || ( location.pathname=='/frames.php' && location.search && location.search.match(/room=4/) ) )


update_n()
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
