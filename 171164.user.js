// ==UserScript==
// @name            hwm_trans_nick [updated]
// @namespace        Demin
// @description    HWM mod - set link & nick for transfer (by Demin)
// @homepage       http://userscripts.org/scripts/show/95540
// @version        2.0
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://173.231.37.114/*
// @include        http://*freebsd-help.org/*
// @include        http://*heroes-wm.*/*
// @include        http://*hommkingdoms.info/*
// @include        http://*hmmkingdoms.com/*
// @include        http://*герои.рф/*
// @include        http://*.lordswm.*/*
// ==/UserScript==

// (c) 2011, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '2.0';

var script_num = 170820;
var script_name = "HWM mod - Statistika po peredelu zemel' (by Demin)";
var string_upd = /170820=(\d+\.\d+)/;

var url_cur = location.href;
var url = 'https://adf.ly/3966902/http://'+location.hostname+'/';


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


var string = '\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c&nbsp;\u0440\u0435\u0441\u0443\u0440\u0441\u044b';
var string2 = '\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c&nbsp;\u044d\u043b\u0435\u043c\u0435\u043d\u0442\u044b';

if (url.match('lordswm')) {
string = 'Transfer&nbsp;resources';
string2 = 'Transfer&nbsp;elements';
}

if( url_cur.indexOf('pl-info.php') )
{
  var els = document.getElementsByTagName('a');
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.href.match('sms-create.php?') )
    {
      itemname_r = /mailto=(.+)/ ;
      item_name = itemname_r.exec( el.href ) ;
if (item_name && item_name[1]) {
	a1 = document.createElement( 'a' );
	a1.href = url+'transfer.php?nick='+item_name[1];
	a1.innerHTML = string;
	a1.style.textDecoration = 'none';
	a2 = document.createElement( 'a' );
	a2.href = url+'el_transfer.php?nick='+item_name[1];
	a2.innerHTML = string2;
	a2.style.textDecoration = 'none';
	span = document.createElement( 'span' );
	span.innerHTML = '<br>&nbsp;&nbsp;';
	el.parentNode.insertBefore( a2 , el.nextSibling ) ;
	el.parentNode.insertBefore( document.createTextNode( '/' ) , el.nextSibling ) ;
	el.parentNode.insertBefore( a1 , el.nextSibling ) ;
	el.parentNode.insertBefore( span , el.nextSibling ) ;
}
      break;
    }
  }
}


if( url_cur.indexOf('transfer.php') )
{
	item_name = /nick=([^&]+)/.exec( url_cur );
	gold_trans = /gold=(\d+)/.exec( url_cur );
if ( item_name ) {
  var els = document.getElementsByTagName('input');
  for( var i = 0; i < els.length; i++ )
  {
    var el = els[i];
    if( el.name == 'nick' && el.type == 'text' )
    {
      el.value = urlDecode( item_name[1] );
    }
    else if( el.name == 'gold' && el.type == 'text' )
    {
	if ( gold_trans ) el.value = gold_trans[1];
	break;
    }
  }
var all_a = document.getElementsByTagName( 'a' );
var a_len = all_a.length;
var a_i;
for (var i=a_len; i--;) {
if (i<10) {break;}
a_i = all_a[i];
if (a_i.href.indexOf('el_transfer')!=-1) {
a_i.href += '?nick=' + item_name[1] ;
break;
}
}
}
}


} finally { update_n() }


function urlDecode(string) {
	var codes = '%E0%E1%E2%E3%E4%E5%B8%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF';
	codes += '%C0%C1%C2%C3%C4%C5%A8%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF';
	codes = codes.split('%');
	var chars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	chars += 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
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
var remote_version, rt;rt=obj.responseText;GM_setValue('last_update', ''+new Date().getTime());remote_version=string_upd.exec(rt);if (version && remote_version){if (Number(remote_version[1]) > Number(version)) setTimeout(function() { if (confirm('There is an update available for the Greasemonkey script "'+script_name+'".\nWould you like to go to the install page now?'+update_text1+script_name+update_text2)){window.open('https://adf.ly/3966902/http://userscripts.org/scripts/show/'+script_num, '_blank')} }, 100) }}
}