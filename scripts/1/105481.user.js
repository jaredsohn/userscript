// ==UserScript==
// @name           hwm_map_upgrade
// @namespace      Demin
// @description    HWM mod - Avtosdacha zadanij GN, tajmer perehoda, skrytie karty (by Demin)
// @homepage       http://userscripts.org/scripts/show/105481
// @version        3.1
// @include        http://*heroeswm.ru/*
// @include        http://178.248.235.15/*
// @include        http://209.200.152.144/*
// @include        http://*lordswm.com/*
// ==/UserScript==

// (c) 2011-2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

var version = '3.1';

var script_num = 105481;
var script_name = 'HWM mod - Avtosdacha zadanij GN, tajmer perehoda, skrytie karty (by Demin)';
var string_upd = /105481=(\d+\.\d+)/;

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


var flash_map = document.querySelector("object > param[value*='map.swf']");
if ( flash_map ) flash_map = flash_map.parentNode.querySelector("param[name='FlashVars']");

if ( document.querySelector("body") && flash_map ) {

var place_map =  flash_map.value.split('=')[1].split(':');
place_map[0] = /(\d+)/.exec( place_map[0] )[1];

if ( !GM_getValue("hwm_map_checkgn") ) GM_setValue( "hwm_map_checkgn", "1" );
if ( !GM_getValue("hwm_map_move_hide") ) GM_setValue( "hwm_map_move_hide", "1" );
if ( !GM_getValue("hwm_map_hide_gv") ) GM_setValue( "hwm_map_hide_gv", "1" );
if ( !GM_getValue("hwm_map_hide_map") ) GM_setValue( "hwm_map_hide_map", "0" );

add(place_map, flash_map);
hidemap(place_map, flash_map);
init(place_map);

}

} finally { update_n() }


function hidemap(place_map, flash_map)
{

if ( url.match('lordswm') ) {
var text_show_map = ' display map';
} else {
var text_show_map = ' \u043E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443';
}

if( place_map[14]==0 ) {
	if ( document.querySelector("a[href^='thief_ambush_cancel.php']") && ( GM_getValue( "hwm_map_hide_gv" )=="1" ) ) {
		flash_map.parentNode.style.display = 'none';
		$('id_check_map2').innerHTML = text_show_map;
		$('id_check_map_one2').style.display = '';
		$('id_check_map3').style.display = 'none';
	}
	else if ( GM_getValue( "hwm_map_hide_map" )=="1" && ( place_map[0]==place_map[1] || $("div_left") ) )
	{
		flash_map.parentNode.style.display = 'none';
		$('id_check_map2').innerHTML = text_show_map;
		$('id_check_map_one2').style.display = '';
	}
}
else if ( GM_getValue( "hwm_map_move_hide" )=="1" )
{
	flash_map.parentNode.style.display = 'none';
}

}

function add(place_map, flash_map)
{

var parent = flash_map.parentNode;
while ( parent.tagName.toLowerCase()!='table' ) { parent = parent.parentNode; }
parent.setAttribute("cellspacing", "0");

if( place_map[14]==0 ) {

parent = parent.parentNode;
while ( parent.tagName.toLowerCase()!='table' ) { parent = parent.parentNode; }
parent.setAttribute("cellspacing", "0");

if ( url.match('lordswm') ) {

var text_gn = ' complete objectives MG';
var text_hide_move = ' hide map on going';
var text_hide_gv = ' hide map in ambush TG';
var text_hide_map = ' hide map';
var text_show_map1 = ' display map once';

} else {

var text_gn = ' \u0441\u0434\u0430\u0432\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u0413\u041D';
var text_hide_move = ' \u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0435';
var text_hide_gv = ' \u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438 \u0437\u0430\u0441\u0430\u0434\u0435 \u0413\u0412';
var text_hide_map = ' \u0441\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u0443';
var text_show_map1 = ' \u043E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443 \u043E\u0434\u043D\u043E\u043A\u0440\u0430\u0442\u043D\u043E';

}

var dm = document.createElement('table');
dm.style.width = "452";
dm.setAttribute("cellspacing", "0");
dm.setAttribute("cellpadding", "0");
dm.innerHTML = '<tr><td><br><input type="checkbox" '+( GM_getValue( "hwm_map_checkgn" )=="1" ?"checked":"")+' id="map_check_gn"><label for="map_check_gn" style="cursor:pointer;">' + text_gn + '</lable></td></tr>' +
'<tr><td><input type="checkbox" '+( GM_getValue( "hwm_map_move_hide" )=="1" ?"checked":"")+' id="map_check_move"><label for="map_check_move" style="cursor:pointer;">' + text_hide_move + '</lable></td></tr>' +
'<tr><td><input type="checkbox" '+( GM_getValue( "hwm_map_hide_gv" )=="1" ?"checked":"")+' id="map_check_gv"><label for="map_check_gv" style="cursor:pointer;">' + text_hide_gv + '</lable></td></tr>' +
'<tr><td id="id_check_map3"><input type="checkbox" id="id_check_map"><label for="id_check_map" style="cursor:pointer;"><span id="id_check_map2">' + text_hide_map + '</span></lable></td></tr>' +
'<tr><td id="id_check_map_one2" style="display:none"><input type="checkbox" id="id_check_map_one"><label for="id_check_map_one" style="cursor:pointer;">' + text_show_map1 + '</lable></td></tr>';
parent.parentNode.appendChild(dm);

addEvent( $("map_check_gn"), "click", app_filter );
addEvent( $("map_check_move"), "click", app_filter );
addEvent( $("map_check_gv"), "click", app_filter );
addEvent( $('id_check_map'), "click", app_hide );
addEvent( $('id_check_map_one'), "click", app_show_one );

}

}

function init(place_map) {

/*
0 - cur place
1 - view place
2-10 - have move
11 - GO
12 - GV
13 - GN
14 - loc from move (only move)
15 - last time move (only move)
16 - all time move (only move)
17 - ?
18 - clan id
19 - ?
20 - ?
*/

if ( place_map[14]>0 )
{
	update_title(new Date().getTime(), document.title, place_map);
}
else if ( place_map[13]==-1 && ( place_map[0]==2 || place_map[0]==6 || place_map[0]==16 || place_map[0]==21 ) && ( GM_getValue( "hwm_map_checkgn" )=="1" ) )
{
	setTimeout(function() { window.location = url + 'mercenary_guild.php'; }, 300);
}

}

function update_title(time_begin_b, title_b, place_map) {
	var ct = place_map[15] - Math.floor( ( new Date().getTime() - time_begin_b ) / 1000 );
	var dm = Math.floor( ct / 60 ) % 60;
	var ds = ct % 60;

	document.title = dm + ':' + ( (ds < 10) ? '0' : '' ) + ds + ' ' + title_b;
	if ( ct > 0 ) setTimeout(function() { update_title(time_begin_b, title_b, place_map); }, 999);
}

function app_filter() {
if ( $('map_check_gn').checked==true ) GM_setValue( "hwm_map_checkgn", "1" ); else GM_setValue( "hwm_map_checkgn", "0" );
if ( $('map_check_move').checked==true ) GM_setValue( "hwm_map_move_hide", "1" ); else GM_setValue( "hwm_map_move_hide", "0" );
if ( $('map_check_gv').checked==true ) GM_setValue( "hwm_map_hide_gv", "1" ); else GM_setValue( "hwm_map_hide_gv", "0" );
}

function app_hide() {

if ( url.match('lordswm') ) {
var text_show_map = ' display map';
var text_hide_map = ' hide map';
} else {
var text_show_map = ' \u043E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443';
var text_hide_map = ' \u0441\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u0443';
}

if ( $('id_check_map2').innerHTML == text_show_map ) {
	GM_setValue( "hwm_map_hide_map", "0" );
	flash_map.parentNode.style.display = '';
	$('id_check_map2').innerHTML = text_hide_map;
	$('id_check_map_one2').style.display = 'none';
} else {
	GM_setValue( "hwm_map_hide_map", "1" );
	flash_map.parentNode.style.display = 'none';
	$('id_check_map2').innerHTML = text_show_map;
	$('id_check_map_one2').style.display = '';
}

$('id_check_map').checked = '';

}

function app_show_one()
{
flash_map.parentNode.style.display = '';
$('id_check_map_one2').style.display = 'none';
$('id_check_map3').style.display = 'none';
}


function $( id ) { return document.querySelector("#"+id); }

function addEvent(elem, evType, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(evType, fn, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent("on" + evType, fn);
	}
	else {
		elem["on" + evType] = fn;
	}
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
