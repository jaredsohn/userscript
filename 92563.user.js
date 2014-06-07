// ==UserScript==
// @name           hwm_arts_arenda
// @namespace      Demin
// @description    HWM mod - hwm_arts_arenda by Demin
// @homepage       http://userscripts.org/scripts/show/92563
// @version        2.01
// @include        http://*heroeswm.*/arts_arenda.php*
// @include        http://178.248.235.15/arts_arenda.php*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2010-2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '2.01';

var script_num = 92563;
var script_name = 'HWM mod - hwm_arts_arenda by Demin';
var string_upd = /92563=(\d+\.\d+)/;

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

var all_td = tag('td');
var td_len = all_td.length;
var p;
var b = /\u0411\u043e\u0435\u0432: (\d+)/;
var ba = /\[(\d+)\//;
var b_i;
var ba_i;
var td;
var off = /\u0418\u043d\u0432\u0435\u043d\u0442\u0430\u0440\u044c \u043f\u043e\u043b\u043e\u043d/;
var add = false;
var url_cur = location.href;
var check_hide_a = GM_getValue( "check_hide_a", '0' ); // hide full arts

for (var i=td_len; i--;) {
td = all_td[i];
if ( td.innerHTML.indexOf("<td")!=-1 ) {continue;}
	if (b.exec( td.innerHTML )) {
		if (!add) {
		var tda = td.parentNode.parentNode.parentNode;
		var tdb = tda.parentNode;
		add = true;

		var div = document.createElement('span');
		div.innerHTML = 'Скрывать артефакты сданные на всю прочность:'+
				' <input type=checkbox '+(check_hide_a=="1"?"checked":"")+' id=check_hide_a title="">';
		tdb.insertBefore(div, tdb.firstChild);
		if ( check_hide_a == 1 ) {
		div.innerHTML = div.innerHTML + '<br>Отобразить скрытые артефакты:'+
				' <input type=checkbox id=show_hide_a title="">';
		}
		div.innerHTML = div.innerHTML + '<br>';
		addEvent($("check_hide_a"), "click", check_hide_f);
		if ( check_hide_a == 1 ) {
		addEvent($("show_hide_a"), "click", show_hide_f);
		}
		}
	p = td.parentNode;
	b_i = b.exec( td.innerHTML );
	ba_i = ba.exec( td.innerHTML );
	if ( b_i[1] == 0 ) { td.style.background = '#FFA07A'; }
	else if ( off.exec( tdb.innerHTML ) ) { continue; }
	else if ( p.innerHTML.indexOf("arts_arenda.php?art_return=")!=-1 ) { continue; }
	else if ( b_i[1] == ba_i[1] && check_hide_a == "1" ) { p.style.display = 'none'; }
	}
}

} finally { update_n() }

function check_hide_f()
{
if ( $('check_hide_a').checked==true ) {
check_hide_a='1';
setTimeout(function() { window.location=url_cur; }, 200);
} else {
check_hide_a='0';
show_hide_f();
}
GM_setValue( "check_hide_a", check_hide_a );
}

function show_hide_f()
{
$('show_hide_a').checked = 'checked';

var all_td = tag('td');
var td_len = all_td.length;
var p;
var b = /\u0411\u043e\u0435\u0432: (\d+)/;
var td;
for (var i=td_len; i--;) {
td = all_td[i];
if ( td.innerHTML.indexOf("<td")!=-1 ) {continue;}
	if (b.exec( td.innerHTML )) {
	p = td.parentNode;
	if ( p.style.display == 'none' ) {
		p.style.display = '';
	}
	}
}
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
