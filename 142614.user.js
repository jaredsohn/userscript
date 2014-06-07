// ==UserScript==
// @name           hwm_tavern_delete
// @namespace      Demin
// @description    HWM mod - Tavern delete by Demin
// @homepage       http://userscripts.org/scripts/show/142614
// @version        1.00
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://*lordswm.*/*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.00';

var script_num = 142614;
var script_name = 'HWM mod - Tavern delete by Demin';
var string_upd = /142614=(\d+\.\d+)/;

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

var dfv = '<b>\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436</b>';
var regexp_r = /\u0422\u0430\u0432\u0435\u0440\u043d\u0430\./;
var regexp_r2 = /\u0422\u0435\u043a\u0443\u0449\u0438\u0435 \u0438\u0433\u0440\u044b/;
var regexp_r3 = /\d\d-\d\d-\d\d /;
var regexp_r4 = /cards\.gif/;
if (url.match('lordswm')) {
dfv = '<b>Character</b>';
regexp_r = /Tavern\./;
regexp_r2 = /Current games/;
}

// chat
if ( location.pathname=='/chat_line.php' ) {
var all_a = tag('option');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.innerHTML.match(/\u0422\u0430\u0432\u0435\u0440\u043d\u0430/) || a_i.innerHTML.match(/Tavern/) ) {
	a_i.parentNode.removeChild(a_i);
	}
}
}

// menu
var all_a = tag('li');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.innerHTML.match(/frames\.php\?room=5/) && !a_i.innerHTML.match(/<b>/) ) {
	a_i.parentNode.removeChild(a_i);
	}
}
var all_a = tag('a');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.href.match(/tavern\.php/) && a_i.innerHTML.match(/<b>.+<\/b>/) ) {
	a_i.href = 'home.php';
	a_i.innerHTML = dfv;
	}
}
var all_a = tag('td');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	if ( all_a[i].innerHTML.indexOf("<td")!=-1 ) {continue;}
	if ( regexp_r4.exec(all_a[i].innerHTML) ) {
	all_a[i].style.display = 'none';
	break;
}
}

// tavern
if ( location.pathname=='/tavern.php' ) {
var all_a = tag('table');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	if ( regexp_r.exec(all_a[i].innerHTML) ) {
	if ( !regexp_r.exec(all_a[i+1].innerHTML) ) {
	all_a[i-1].style.display = 'none';
	break;
	}
	}
}
}
if ( location.pathname=='/tavern_games.php' ) {
var all_a = tag('table');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	if ( regexp_r2.exec(all_a[i].innerHTML) ) {
	if ( !regexp_r2.exec(all_a[i+1].innerHTML) ) {
	all_a[i-1].style.display = 'none';
	break;
	}
	}
}
}
if ( location.pathname=='/cgame.php' ) {
var all_a = tag('html');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	all_a[i].style.display = 'none';
	break;
}
}
if ( location.pathname=='/arc_tour_hist.php' ) {
var all_a = tag('table');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	if ( regexp_r3.exec(all_a[i].innerHTML) ) {
	if ( !regexp_r3.exec(all_a[i+1].innerHTML) ) {
	all_a[i-1].style.display = 'none';
	break;
	}
	}
}
}

}

} finally {
if ( location.pathname=='/tavern.php' || location.pathname=='/tavern_games.php' || location.pathname=='/cgame.php' || location.pathname=='/arc_tour_hist.php' || ( location.pathname=='/frames.php' && location.search && location.search.match(/room=5/) ) )
{
setTimeout(function() { window.location=url+'home.php'; }, 300);
setTimeout(function() { window.location=url+'home.php'; }, 5000);
}

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
