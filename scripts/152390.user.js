// ==UserScript==
// @name           hwm_delete_runet
// @namespace      Demin
// @description    HWM mod - Delete runet (by Demin)
// @homepage       http://userscripts.org/scripts/show/152390
// @version        1.00
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// ==/UserScript==

// (c) 2011, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.00';

var script_num = 152390;
var script_name = 'HWM mod - Delete runet (by Demin)';
var string_upd = /152390=(\d+\.\d+)/;

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

var all_td = document.getElementsByTagName( 'td' );
var td_len = all_td.length;
var td;

if ( url_cur.indexOf('home.php')>-1 && getI( "//embed[@name='runet']" ).snapshotItem(0) ) {
var ems = getI( "//embed[@name='runet']" ).snapshotItem(0);
var src =  ems.getAttribute( 'src' );

//if ( src.indexOf("witch.swf")!=-1 || src.indexOf("barby.swf")!=-1 || src.indexOf("elf.swf")!=-1 || src.indexOf("mag.swf")!=-1 || src.indexOf("succub.swf")!=-1 || src.indexOf("sprite.swf")!=-1 || src.indexOf("fury.swf")!=-1 ) {
ems.style.display = 'none';
//}
}

if ( url_cur.indexOf('object-info.php')>-1 ) {
for (var i=td_len; i--;) {
td = all_td[i];
if ( td.innerHTML.indexOf("<td")!=-1 ) {continue;}

if ( td.innerHTML.indexOf("runet=yes")!=-1 && td.innerHTML.indexOf("premiaruneta")!=-1 ) {
//alert(all_td[i-2].innerHTML);
//alert(td.parentNode.parentNode.parentNode.parentNode.innerHTML);
	if ( all_td[i-2].parentNode.innerHTML.indexOf("width=\"120\"")!=-1 ) {
	all_td[i-2].width = '100%';
	}
	td.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
}

}
}


for (var i=td_len; i--;) {
td = all_td[i];
if ( td.innerHTML.indexOf("<td")!=-1 ) {continue;}

if ( td.innerHTML.indexOf("2narod\.php")!=-1 ) {
//alert(td.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML);
	td.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
}
}

}

} finally { update_n() }

function getI( xpath ) { return document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); }

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
