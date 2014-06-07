// ==UserScript==
// @name           hwm_battlelinks
// @namespace      Demin
// @description    HWM mod - battlelinks (by Demin)
// @homepage       http://userscripts.org/scripts/show/92536
// @version        2.02
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://*.lordswm.*/*
// @include        http://*герои.рф/?15091
// @exclude        */ch_box.php*
// @exclude        */chatonline.php*
// @exclude        */chat_line.php*
// @exclude        */chatpost.php*
// @exclude        */chat.php*
// @exclude        */ticker.html*
// @exclude        */auction.php*
// ==/UserScript==

// (c) 2010-2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '2.02';

var script_num = 92536;
var script_name = 'HWM mod - battlelinks (by Demin)';
var string_upd = /92536=(\d+\.\d+)/;

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

console.time(script_name);

var a = tag('a');
var a_len = a.length;
var ai;
var warid = /warid=(\d+)/;
var warid_ai;
var bt;
var url_cur = location.href;
var blank = "";

if (GM_getValue("battle_in_current_window", false) == false) { blank = ' target="_blank"'; }
if (url.indexOf('daily')!=-1) { url = 'http://www.heroeswm.ru/'; }

for (var i=a_len; i--;) {
ai = a[i];
if (ai.href.indexOf('warid')!=-1) {
warid_ai = warid.exec(ai);
if (warid_ai && warid_ai[1]) {
warid_ai = warid_ai[1];
bt = document.createElement('span');

bt.innerHTML = '&nbsp;[<a href="'+url+'war.php?lt=-1&warid='+warid_ai+'"'+blank+'>#</a>'+
'&nbsp;<a href="'+url+'battlechat.php?warid='+warid_ai+'"'+blank+'>chat</a>'+
'&nbsp;<a href="'+url+'war.php?warid='+warid_ai+'"'+blank+'>$</a>'+
'&nbsp;<a href="'+url+'battle.php?lastturn=-3&warid='+warid_ai+'"'+blank+'>E</a>]';

ai.parentNode.insertBefore(bt, ai.nextSibling);
addEvent(ai, "click", show_result);
}
}
}

if ( typeof GM_listValues == 'function' ) {
if (GM_getValue("battle_in_current_window", false) == true) {
GM_registerMenuCommand(script_name + ' - Open battle in New window', function() {
GM_setValue("battle_in_current_window", false);
window.location = url_cur;
});
} else {
GM_registerMenuCommand(script_name + ' - Open battle in Current window', function() {
GM_setValue("battle_in_current_window", true);
window.location = url_cur;
});
}
}

console.timeEnd(script_name);

loaderw = '<img border="0" src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'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'+
'fySDhGYQdDWGQyUhADs=">';

} finally { update_n() }

function show_result(event)
{
event = event || window.event;
event.preventDefault ? event.preventDefault() : (event.returnValue=false);
var ai = event.target || event.srcElement;

if ( !warid.exec(ai.href) ) { ai = ai.parentNode }
// for home page
if ( !warid.exec(ai.href) ) { ai = ai.parentNode }
// for pl_info page (in battle)
warid_ai = warid.exec(ai.href)[1];

var newdiv = $('war_result');
if (!newdiv) {
	newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'war_result');
	with (newdiv.style) {
		position = 'absolute';
		borderStyle = 'solid';
		borderColor = '#000000';
		borderWidth = '2px';
		padding = '0px';
		zIndex = '3';
	}
}

newdiv.style.left = event.pageX + 5;
newdiv.style.top = event.pageY + 5;
newdiv.innerHTML = '<table cellspacing=4 cellpadding=0 bgcolor="#f5f3ea"><tr>'+
	'<td align="left">warid: '+warid_ai+'&nbsp;&nbsp;'+

	'&nbsp;[<a href="'+url+'war.php?lt=-1&warid='+warid_ai+'"'+blank+'>#</a>'+
	'&nbsp;<a href="'+url+'battlechat.php?warid='+warid_ai+'"'+blank+'>chat</a>'+
	'&nbsp;<a href="'+url+'war.php?warid='+warid_ai+'"'+blank+'>$</a>'+
	'&nbsp;<a href="'+url+'battle.php?lastturn=-3&warid='+warid_ai+'"'+blank+'>E</a>]'+

	'</td><td width=100></td>'+
	'<td align="right" id="close_div_result" title="Close">[x]</td></tr>'+
	'<tr><td align="left" id="war_result_cont" colspan="3"><br>'+loaderw+'</td></tr>'+
	'</table>';

document.body.appendChild(newdiv);
addEvent($("close_div_result"), "click", div_close_result);

var objXMLHttpReqWid = createXMLHttpReq(Math.random()* 1000000);
objXMLHttpReqWid.open('GET', url + 'battle.php?lastturn=-2&warid=' + warid_ai, true);
//objXMLHttpReqWid.overrideMimeType("text/plain; charset=windows-1251");
objXMLHttpReqWid.onreadystatechange = function() { handleHttpResponseWid(objXMLHttpReqWid); }
objXMLHttpReqWid.send(null);
}

function div_close_result()
{
var temp_rez = $('war_result');
temp_rez.parentNode.removeChild(temp_rez);
}

function handleHttpResponseWid(obj) {
if (obj.readyState != 4 ) return;
var div = $('war_result_cont');
if (obj.status != 200) {
	div.innerHTML = "<br>http error "+String(obj.status);
	return;
}
var arr = obj.responseText.split(";/", 2);
var pos = arr[0].indexOf('f<font size="18"><b>');
if (pos == -1) {
	div.innerHTML = '<br>parse error';
	return;
}
var tmp = arr[0].substr(pos+1);
var pos2 = tmp.indexOf('|#');
div.innerHTML = '<br>'+tmp.substr(0, pos2).replace(/size="18"/g, '');
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
