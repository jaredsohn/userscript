// ==UserScript==
// @name          hwm_forum_delete
// @namespace     Demin
// @description   HWM mod - hwm forum delete by Demin
// @homepage      http://userscripts.org/scripts/show/124578
// @version       1.03
// @include       http://*heroeswm.*/*
// @include       http://178.248.235.15/*
// @include       http://173.231.37.114/*
// @include       http://*freebsd-help.org/*
// @include       http://*heroes-wm.*/*
// @include       http://*hommkingdoms.info/*
// @include       http://*hmmkingdoms.com/*
// @include       http://*герои.рф/*
// @include       http://*lordswm.*/*
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.03';

var script_num = 124578;
var script_name = 'HWM mod - hwm forum delete by Demin';
var string_upd = /124578=(\d+\.\d+)/;

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

var check_fid = 0;

try {

// forum allow
var fids = new Array(1,14,19,20,21,22);


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

var fid = 0;
var regexp_fid = /<a href=.?forum\.php.?><font class=.{4,10}>.{6}<\/font><\/a>.{2,8}<a href=.?forum_thread\.php\?id=(\d+)/;
var regexp_forum = /forum_thread\.php\?id=(\d+)/;
var a_lenj = fids.length;

if ( (tag('body'))[0] ) {

var body = (tag('body'))[0].innerHTML;

// fid
if ( regexp_fid.exec(body) ) {
	fid = regexp_fid.exec(body)[1];
	var a_len = fids.length;
	for (var i=a_len; i--;) {
	if ( fid == fids[i] ) {
		check_fid = 1;
		break;
	}
	}
}

// menu
var all_a = tag('li');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( regexp_forum.exec(a_i.innerHTML) ) {

	fid = regexp_forum.exec(a_i.innerHTML)[1];
	var check_forum = 1;
	for (var j=a_lenj; j--;) {
	if ( fid == fids[j] ) {
		check_forum = 0;
	}
	}

	if ( check_forum == 1 ) {
		a_i.parentNode.removeChild(a_i);
	}

	}
}

// topic
if ( location.pathname=='/forum_thread.php' || location.pathname=='/forum_messages.php' ) {
if ( check_fid == 0 ) {
var all_a = tag('table');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	if ( regexp_fid.exec(all_a[i].innerHTML) ) {
	if ( !regexp_fid.exec(all_a[i+1].innerHTML) ) {
	all_a[i].style.display = 'none';
	break;
	}
	}
}
}
}

// forum.php
if ( location.pathname=='/forum.php' ) {
var all_a = tag('tr');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( regexp_forum.exec(a_i.innerHTML) ) {

	fid = regexp_forum.exec(a_i.innerHTML)[1];
	var check_forum = 1;
	for (var j=a_lenj; j--;) {
	if ( fid == fids[j] ) {
		check_forum = 0;
	}
	}

	if ( check_forum == 1 ) {
		a_i.style.display = 'none';
	}

	}
}
}

}

} finally {
if ( location.pathname=='/forum_thread.php' || location.pathname=='/forum_messages.php' ) {
if ( check_fid == 0 ) {
setTimeout(function() { window.location=url+'home.php'; }, 300);
setTimeout(function() { window.location=url+'home.php'; }, 5000);
}
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
