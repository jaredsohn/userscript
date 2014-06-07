// ==UserScript==
// @name           HWM_surv_delete by berkut009
// @namespace      mod by berkut009, autor Demin 
// @description    HWM mod - Удаление ссылок на защиту
// @homepage       
// @version        1.01
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://*lordswm.*/*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)



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

var dfv = '<b>Битвы</b>';
var regexp_roul = / \u0438 <a href=.?roulette\.php.?>\u0440\u0443\u043B\u0435\u0442\u043A\u0430<\/a>/;
var regexp_r = /<td bgcolor=.?#005C11.?>/;
var regexp_r2 = /\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0438\u0433\u0440\u044B/;
var regexp_r3 = /\u0418\u0433\u0440\u0430: /;
if (url.match('lordswm')) {
dfv = '<b>Battle</b>';
regexp_roul = / and <a href=.?roulette\.php.?>roulette<\/a>/;
regexp_r2 = /Last spins/;
regexp_r3 = /Last spin time: /;
}


// menu
var all_a = tag('li');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( ( a_i.innerHTML.match(/frames\.php\?room=1180/) && !a_i.innerHTML.match(/<b>/) ) || a_i.innerHTML.match(/mapwars\.php/) ) {
	a_i.parentNode.removeChild(a_i);
	}
}
var all_a = tag('a');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.href.match(/bselect\.php/) && a_i.innerHTML.match(/<b>.+<\/b>/) ) {
	a_i.href = 'bselect.php';
	a_i.innerHTML = dfv;
	}
}


}

} finally {
if ( location.pathname=='/mapwars.php' || ( location.pathname=='/frames.php' && location.search && location.search.match(/room=1180/) ) )
{
setTimeout(function() { window.location=url+'home.php'; }, 100);
setTimeout(function() { window.location=url+'home.php'; }, 100);
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
