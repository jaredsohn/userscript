// ==UserScript==
// @name           hwm_time_seconds
// @namespace      Demin
// @description    HWM mod - Time seconds (by Demin)
// @homepage       http://userscripts.org/scripts/show/95725
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
// ==/UserScript==

// (c) 2011-2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '2.02';

var script_num = 95725;
var script_name = 'HWM mod - Time seconds (by Demin)';
var string_upd = /95725=(\d+\.\d+)/;

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

if ((tag('body'))[0]) {

if( !GM_getValue("hwm_time_sec_add") ) GM_setValue("hwm_time_sec_add" , '3');

var body = (tag('body'))[0].innerHTML;
var string = /now (\d+)/;
var time_sec_gm = 'hwm_time_sec';
var last_synch_gm = 'hwm_last_synch';
var time_error_gm = 'hwm_time_error';
var time_error2_gm = 'hwm_time_error2';

if (url.match('lordswm')) {
time_sec_gm = 'com_hwm_time_sec';
last_synch_gm = 'com_hwm_last_synch';
time_error_gm = 'com_hwm_time_error';
time_error2_gm = 'com_hwm_time_error2';
}

if( !GM_getValue(time_error_gm) ) GM_setValue(time_error_gm, '0');
if( !GM_getValue(time_error2_gm) ) GM_setValue(time_error2_gm, '0');
if( !GM_getValue(last_synch_gm) ) GM_setValue(last_synch_gm, '1318000000000');

var time_serv = /([^,]*)(, \d+ online.*)/;
var time_top = /(\d+):(\d+), \d+ online/;
var all_td = tag('td');
var td_len = all_td.length;
var td_i;
var td_ih;
var time_sec;
var online;
var hm;

for (var i=0; i<td_len; i++) {
td_i = all_td[i];
td_ih = td_i.innerHTML;
if (td_ih.indexOf("<td")!=-1) {continue;}
if (td_ih.search(time_top)!=-1) {
online = (time_serv.exec(td_ih))[2];
hm = time_top.exec(td_ih);

td_add = document.createElement( 'td' );
td_add.setAttribute('align', 'right');
td_add.setAttribute('id', 'jsset_ts');
td_add.setAttribute('valign', 'bottom');
td_add.setAttribute('width', '60');
td_add.innerHTML="";
td_i.parentNode.insertBefore(td_add, td_i);
addEvent($("jsset_ts"), "click", setting_ts);

if (parseInt(GM_getValue(last_synch_gm, '0')) + 21600000 < (new Date().getTime())) { get_time(); }
	else if ( GM_getValue(time_sec_gm) ) { show_time(); }
		else { get_time(); }

break;
}
}

}

} finally { update_n() }

function show_time() {
time_sec = parseInt(GM_getValue(time_sec_gm));

// true time
ct = Math.round( ((new Date().getTime())-time_sec)/1000 );
dd = Math.floor( ct / 86400 );
dh = Math.floor( ( ct - dd * 86400 ) / 3600 );
dm = Math.floor( ( ct - dd * 86400 - dh * 3600 ) / 60 );
ds = ct % 60;

if ( (dh!=hm[1]) || (dm-hm[2])>1 || hm[2]>dm ) {
if ( (dh-hm[1]==1 || hm[1]-dh==23) && (hm[2]-dm==59) ) { showtop(td_i); }
	else {
	GM_setValue(time_sec_gm, '');
	var err4 = parseInt(GM_getValue(time_error2_gm))+1;
	GM_setValue(time_error2_gm, ''+err4);
	//alert(hm[1]+':'+hm[2]+' - '+dh+':'+dm+':'+ds);
	get_time();
	}
}
else { GM_setValue(time_error2_gm, '0'); showtop(td_i); }
}

function get_time() {
if ( parseInt(GM_getValue(time_error_gm))<4 && parseInt(GM_getValue(time_error2_gm))<4 ) {
if ( parseInt(GM_getValue(last_synch_gm, '0')) + 60000 < (new Date().getTime()) ) {
GM_setValue(last_synch_gm, ''+(new Date().getTime()));
var objXMLHttpReqTime = createXMLHttpReq(Math.random()* 1000000);
objXMLHttpReqTime.open('GET', url + 'time.php' + '?rand=' + (Math.random()* 1000000), true);
objXMLHttpReqTime.onreadystatechange = function() { handleHttpResponseTime(objXMLHttpReqTime); }
objXMLHttpReqTime.send(null);
} else {
setTimeout(function() { get_time(); }, 60000);
}
}
}

function handleHttpResponseTime(obj) {
if (obj.readyState == 4 && obj.status == 200) {
if (string.exec(obj.responseText)) {
var sec_serv = string.exec(obj.responseText);
// 1318550400000  72000000
sec_serv = parseInt(sec_serv[1])*1000+parseInt(GM_getValue("hwm_time_sec_add"))*1000-1318622400000;
if (url.match('lordswm')) { sec_serv = sec_serv-14400000 }
sec_serv = (new Date().getTime())-sec_serv;
GM_setValue(time_sec_gm, ''+sec_serv);
GM_setValue(time_error_gm, '0');
show_time();
}
	else {
	var err3 = parseInt(GM_getValue(time_error_gm))+1;
	GM_setValue(time_error_gm, ''+err3);
	setTimeout(function() { get_time(); }, 60000);
	}
}
}

function showtop(td_i) {
ct = Math.round( ((new Date().getTime())-time_sec)/1000 );
dd = Math.floor( ct / 86400 );
dh = Math.floor( ( ct - dd * 86400 ) / 3600 );
dm = Math.floor( ( ct - dd * 86400 - dh * 3600 ) / 60 );
ds = ct % 60;
td_i.innerHTML = dh + ':' + ( (dm < 10) ? '0' : '' ) + dm + ':' + ( (ds < 10) ? '0' : '') + ds + online;
setTimeout(function() {showtop(td_i)}, 1000);
}

function form_close_ts()
{
	bg = $('bgOverlay');
	bgc = $('bgCenter');
	if( bg )
	{
		bg.style.display = bgc.style.display = 'none';
	}
}

function setting_ts()
{
	bg = $('bgOverlay');
	bgc = $('bgCenter');
	if( !bg )
	{
		bg = document.createElement('div') ;
		bg.id = 'bgOverlay' ;
		document.body.appendChild( bg );
		bg.style.position = 'absolute' ;
		bg.style.left = '0';
		bg.style.width = '100%';
		bg.style.background = "#000000";
		bg.style.opacity = "0.5";
		addEvent(bg, "click", form_close_ts);

		bgc = document.createElement('div') ;
		bgc.id = 'bgCenter' ;
		document.body.appendChild( bgc );
		bgc.style.position = 'absolute' ;
		bgc.style.width = '650px';
		bgc.style.background = "#F6F3EA";
		bgc.style.left = ( ( document.body.offsetWidth - 650 ) / 2 ) + 'px';
	}

	bgc.innerHTML = '<div style="border:1px solid #abc;padding:5px;margin:2px;"><div style="float:right;border:1px solid #abc;width:15px;height:15px;text-align:center;cursor:pointer;" id="bt_close_ts" title="Close">x</div><table>'+
'<tr><td>Добавлять <input id="hwm_time_add" value="'+
GM_getValue("hwm_time_sec_add")+
'" size="1" maxlength="2"> секунд(ы) на синхронизацию (время загрузки страницы с сервера) <input type="submit" id="hwm_time_add_ok" value="ok"></td></tr>'+
'<tr><td><input type="submit" id="ref48" value="Перезапустить скрипт"></td></tr>'+
'</table></div>' ;

	addEvent($("bt_close_ts"), "click", form_close_ts);
	addEvent($("hwm_time_add_ok"), "click", hwm_time_add_f);
	addEvent($("ref48"), "click", ref48_f);

var height_v = getClientHeight_ts();
if (height_v < document.body.offsetHeight) height_v = document.body.offsetHeight;

	bg.style.top = (-document.body.scrollTop)+'px';
	bg.style.height = ( height_v + document.body.scrollTop ) +'px';
	bgc.style.top = ( document.body.scrollTop + 150 ) + 'px';
	bg.style.display = bgc.style.display = 'block';
}

function getClientHeight_ts()
{
return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}

function hwm_time_add_f()
{
if (Number($("hwm_time_add").value)>=1) {
GM_setValue( "hwm_time_sec_add" , '' + $("hwm_time_add").value )
}
}

function ref48_f()
{
GM_setValue(time_error_gm, '0');
GM_setValue(time_error2_gm, '0');
GM_setValue(time_sec_gm, '');
GM_setValue(last_synch_gm, '');
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
