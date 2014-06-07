// ==UserScript==
// @name           hwm_trans_nick
// @namespace      Demin
// @description    HWM mod - Set link & nick for transfer (by Demin)
// @homepage       http://userscripts.org/scripts/show/95540
// @version        3.0
// @include        http://*heroeswm.ru/*
// @include        http://178.248.235.15/*
// @include        http://209.200.152.144/*
// @include        http://*lordswm.com/*
// ==/UserScript==

// (c) 2011-2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

var version = '3.0';

var script_num = 95540;
var script_name = "HWM mod - Set link & nick for transfer (by Demin)";
var string_upd = /95540=(\d+\.\d+)/;

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


if ( url_cur.match('pl_info.php') )
{

if ( url.match('lordswm') ) {
	var string = 'Transfer&nbsp;resources';
	var string2 = 'Transfer&nbsp;elements';
} else {
	var string = '\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c&nbsp;\u0440\u0435\u0441\u0443\u0440\u0441\u044b';
	var string2 = '\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c&nbsp;\u044d\u043b\u0435\u043c\u0435\u043d\u0442\u044b';
}

	var el = document.querySelector("a[href^='sms-create.php?mailto=']");
	item_name = /mailto=([^&]+)/.exec( el.href );
	if ( item_name ) {
		span = document.createElement('span');
		span.innerHTML = '<br>&nbsp;&nbsp;<a href=transfer.php?nick=' + item_name[1] + ' style="text-decoration: none;">' + string + '</a>/';
		span.innerHTML += '<a href=el_transfer.php?nick=' + item_name[1] + ' style="text-decoration: none;">' + string2 + '</a>';
		el.parentNode.insertBefore( span, el.nextSibling );
	}
}


if ( url_cur.match('transfer.php') )
{
	item_name = /nick=([^&]+)/.exec( url_cur );
	if ( item_name ) {
		gold_trans = /gold=(\d+)/.exec( url_cur );
		desc_trans = /desc=([^&]+)/.exec( url_cur );
		var els = document.getElementsByTagName('input');
		for( var i = 0; i < els.length; i++ ) {
			var el = els[i];
			if( el.name == 'nick' && el.type == 'text' ) {
				el.value = urlDecode( item_name[1] );
			}
			else if( el.name == 'gold' && el.type == 'text' ) {
				if ( gold_trans ) el.value = gold_trans[1];
			}
			else if( el.name == 'desc' && el.type == 'text' ) {
				if ( desc_trans ) el.value = desc_trans[1];
				break;
			}			
		}

		var all_a = document.querySelector("a[href='el_transfer.php']");
		if ( all_a ) {
			all_a.href += '?nick=' + item_name[1];
		}
	}
}


} finally { update_n() }


function urlDecode(string) {
	var codes = '%E0%E1%E2%E3%E4%E5%B8%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF';
	codes += '%C0%C1%C2%C3%C4%C5%A8%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%20';
	codes = codes.split('%');
	var chars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	chars += 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ';
	for (var i=0; i<codes.length; i++) string = string.split('%'+codes[i+1]).join(chars[i]);
	return string;
}


function update_n() {
if ( (Number(GM_getValue('last_update', '0')) + 86400000 <= (new Date().getTime())) || (Number(GM_getValue('last_update', '0')) > (new Date().getTime())) ) {
var objXMLHttpReqUpd = new XMLHttpRequest();
objXMLHttpReqUpd.open('GET', url + 'photo_pl_photos.php?aid=1777' + '&rand=' + (Math.random()* 1000000), true);
objXMLHttpReqUpd.onreadystatechange = function() { update(objXMLHttpReqUpd); }
objXMLHttpReqUpd.send(null);
}
}
function update(obj) {
if (obj.readyState == 4 && obj.status == 200) {
var update_text1 = '\n\n\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 Greasemonkey \u0441\u043A\u0440\u0438\u043F\u0442\u0430 "';
var update_text2 = '".\n\u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E?';
var remote_version, rt;rt=obj.responseText;GM_setValue('last_update', ''+new Date().getTime());remote_version=string_upd.exec(rt);if (version && remote_version){if (Number(remote_version[1]) > Number(version)) setTimeout(function() { if (confirm('There is an update available for the Greasemonkey script "'+script_name+'".\nWould you like to go to the install page now?'+update_text1+script_name+update_text2)){window.open('http://userscripts.org/scripts/show/'+script_num, '_blank')} }, 100) }}
}
