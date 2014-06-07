// ==UserScript==
// @name           hwm_ecostat_adv
// @namespace      Demin
// @description    HWM mod - Ecostat advanced by Demin
// @homepage       http://userscripts.org/scripts/show/92572
// @version        3.00
// @include        http://*heroeswm.*/map.php*
// @include        http://*heroeswm.*/ecostat*
// @include        http://*heroeswm.*/object-info.php*
// @include        http://*heroeswm.*/mercenary_guild.php*
// @include        http://178.248.235.15/map.php*
// @include        http://178.248.235.15/ecostat*
// @include        http://178.248.235.15/object-info.php*
// @include        http://178.248.235.15/mercenary_guild.php*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2009, LazyGreg  http://www.heroeswm.ru/pl_info.php?id=160839
// (c) 2010-2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '3.00';

var script_num = 92572;
var script_name = 'HWM mod - Ecostat advanced by Demin';
var string_upd = /92572=(\d+\.\d+)/;

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

// ===== ID - Location lookup table =====
var id2loc = [];
var o;
// == create objects with loc info
o = {};
o.abbr = "EmC";
o.name = "Empire Capital";
o.colr = "#000000";
o.ids = [3,4,5,6,7,8,9,10,11,12,32,34,38,165];
id2loc.push(o);
//
o = {};
o.abbr = "EsR";
o.name = "East River";
o.colr = "#000000";
o.ids = [23,24,25,26,28,33,36,75,87,89,238,258,279,300,321,342];
id2loc.push(o);
//
o = {};
o.abbr = "PoR";
o.name = "Portal's Ruins";
o.colr = "#FF0000";
o.ids = [92,93,99,100,102,118,163,211,217,228,245,266,287,308,329,350];
id2loc.push(o);
//
o = {};
o.abbr = "WoD";
o.name = "Wolf's Dale";
o.colr = "#000000";
o.ids = [43,44,45,46,47,48,74,85,86,226,241,261,282,303,324,345];
id2loc.push(o);
//
o = {};
o.abbr = "LzL";
o.name = "Lizard's Lowland";
o.colr = "#009900";
o.ids = [56,57,58,59,60,61,63,64,80,83,242,263,284,305,326,347];
id2loc.push(o);
//
o = {};
o.abbr = "GrW";
o.name = "Green Wood";
o.colr = "#009900";
o.ids = [67,68,69,70,71,72,76,77,81,88,243,264,285,306,327,348];
id2loc.push(o);
//
o = {};
o.abbr = "SnC";
o.name = "Sunny City";
o.colr = "#009900";
o.ids = [103,104,105,106,107,115,116,213,220,231,248,269,290,311,332,353];
id2loc.push(o);
//
o = {};
o.abbr = "ShS";
o.name = "Shining Spring";
o.colr = "#009900";
o.ids = [108,109,110,111,112,113,114,117,219,230,247,268,289,310,331,352];
id2loc.push(o);
//
o = {};
o.abbr = "EgN";
o.name = "Eagle's Nest";
o.colr = "#FFCC33";
o.ids = [94,95,97,98,101,119,120,139,140,227,244,265,286,307,328,349];
id2loc.push(o);
//
o = {};
o.abbr = "PcC";
o.name = "Peaceful Camp";
o.colr = "#FFCC33";
o.ids = [49,50,51,52,53,54,55,73,79,82,141,262,283,304,325,346];
id2loc.push(o);
//
o = {};
o.abbr = "TgL";
o.name = "Tiger's Lake";
o.colr = "#000000";
o.ids = [13,14,15,16,27,31,35,39,84,224,239,259,280,301,322,343];
id2loc.push(o);
//
o = {};
o.abbr = "RgW";
o.name = "Rogue's Wood";
o.colr = "#000000";
o.ids = [18,19,20,21,22,30,37,78,90,225,240,260,281,302,323,344];
id2loc.push(o);
//
//
o = {};
o.abbr = "MgM";
o.name = "Magma Mines";
o.colr = "#3300FF";
o.ids = [121,122,135,142,143,144,145,164,216,232,249,270,291,312,333,354];
id2loc.push(o);
//
o = {};
o.abbr = "BrM";
o.name = "Bear' Mountain";
o.colr = "#3300FF";
o.ids = [123,124,125,136,146,147,148,149,214,215,250,271,292,313,334,355];
id2loc.push(o);
//
o = {};
o.abbr = "FrT";
o.name = "Fairy Trees";
o.colr = "#3300FF";
o.ids = [126,127,134,150,151,152,153,212,221,233,251,272,293,314,335,356];
id2loc.push(o);
//
o = {};
o.abbr = "MfC";
o.name = "Mythril Coast";
o.colr = "#3300FF";
o.ids = [128,129,130,137,138,154,155,156,157,235,253,274,295,316,337,358];
id2loc.push(o);
//
o = {};
o.abbr = "PrC";
o.name = "Port City";
o.colr = "#3300FF";
o.ids = [131,132,133,158,159,160,161,162,222,234,252,273,294,315,336,357];
id2loc.push(o);
//
o = {};
o.abbr = "FsV";
o.name = "Fishing Village";
o.colr = "#FF0000";
o.ids = [166,174,175,196,197,198,199,200,223,236,256,277,298,319,340,361];
id2loc.push(o);
//
o = {};
o.abbr = "DrC";
o.name = "Dragons's Caves";
o.colr = "#000000";
o.ids = [167,168,169,170,171,172,209,210,218,229,246,267,288,309,330,351];
id2loc.push(o);
//
o = {};
o.abbr = "GtW";
o.name = "Great Wall";
o.colr = "#FF0000";
o.ids = [173,178,179,192,193,194,195,201,202,203,254,275,296,317,338,359];
id2loc.push(o);
//
o = {};
o.abbr = "TiV";
o.name = "Titans' Valley";
o.colr = "#FF0000";
o.ids = [176,177,187,188,189,190,191,206,207,208,255,276,297,318,339,360];
id2loc.push(o);
//
o = {};
o.abbr = "KiC";
o.name = "Kingdom Castle";
o.colr = "#FF0000";
o.ids = [180,181,182,183,184,185,186,204,205,237,257,278,299,320,341,362];
id2loc.push(o);
//
o = {};
o.abbr = "UnS";
o.name = "Ungovernable Steppe";
o.colr = "#FFCC33";
o.ids = [363,364,365,366,369,370,371,372,373,374,375,376,377,378,379,380];
id2loc.push(o);
//
o = {};
o.abbr = "CrG";
o.name = "Crystal Garden";
o.colr = "#FFCC33";
o.ids = [367,368,381,382,383,384,385,386,387,388,389,390,391,392,393,394];
id2loc.push(o);
//

if( !GM_getValue("hwm_ecost_adv_times") ) GM_setValue("hwm_ecost_adv_times", '|2000_00');
var wtime_regexp = /: (\d+):(\d+)/;
var id_regexp = /id=(\d+)/;
var isEcostat = (url_cur.indexOf("/ecostat_details.php") != -1);
var isMercenary = (url_cur.indexOf("/mercenary_guild.php") != -1);
var times_str = GM_getValue("hwm_ecost_adv_times");
var hwm_check_time = GM_getValue("hwm_check_time", '1'); // see time
var hwm_check_del = GM_getValue("hwm_check_del", '1'); // delete vladelez
var hwm_check_full = GM_getValue("hwm_check_full", '1'); // full name

var bt = document.createElement('b');
bt.innerHTML = ' &#9650;';
bt.title = "Настройки скрипта";
addEvent(bt, "click", setting_ts);

var all_a = tag('b');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.innerHTML.match(/татистика/) ) {
	if ( location.pathname=='/map.php' ) {
	a_i.parentNode.parentNode.insertBefore(bt, a_i.parentNode.nextSibling);
	} else {
	a_i.parentNode.insertBefore(bt, a_i.nextSibling);
	}
	break;
	}
}

if (url_cur.indexOf("/object-info.php")!=-1) {

var obj_id = id_regexp.exec(url_cur)[1];
var b_id = (tag('body'))[0].innerHTML;
recordWorkTime(obj_id,b_id);

} else {
makeLinks();

var d = document.createElement('iframe');
d.setAttribute( 'style' , 'position:absolute; top:0; width:100; height:30; visibility:hidden;' );
document.body.appendChild(d);
}

} finally { update_n() }

function recordWorkTime(obj_id,text)
{
times_str = GM_getValue("hwm_ecost_adv_times");
var ta = wtime_regexp.exec(text);

if (ta) {

	var new_time = obj_id+"_"+ta[2];
	if (times_str.indexOf("|"+obj_id+"_")==-1) { // very 1st visit
		times_str += "|"+new_time;
	} else {
		var vt_regexp = obj_id+"_\(\\d\{2\}\)";
		var vtR = new RegExp( vt_regexp );
		times_str = times_str.replace(vtR, new_time);
	}

} else if (times_str.indexOf("|"+obj_id+"_")!=-1) {
		var vt_regexp = "\\|"+ obj_id+"_\(\\d\{2\}\)";
		var vtR = new RegExp( vt_regexp );
		times_str = times_str.replace(vtR, "");
}

GM_setValue("hwm_ecost_adv_times", times_str);
}

function makeLinks(){
	var sa;
	var loc;
	var loc_data;
	var ts = "";
	var ids_passed_str = "";
	var my_row;
	var id_regexp = /object-info.php\?id=(\d+)/;
	var my_id;
	var target_time;
	var target_time2;

	var row_count = 0;
	var a_all = tag('a') ;
	var el;
	for (var i=0; i<a_all.length; i++) {
		el = a_all[i];
		if (el.href.indexOf('/object-info.php?')==-1) { continue; }

		ts = "_"+el.href.split('/object-info.php?')[1]+"_";
		if (ids_passed_str.indexOf(ts)!=-1) { continue; } //workaround for last cell on map page (>>>)
		ids_passed_str += ts;

		target_time = "n/a";
		my_id = id_regexp.exec(el.href)[1];

	if ( hwm_check_time==1 ) {

		target_time2 = get_time_id(my_id);
		if ( target_time2 ) target_time = target_time2;

		sa = document.createElement( 'a' );
		sa.href = el.href;
		sa.style.fontSize = "11px";
		sa.innerHTML = "&nbsp;<b>["+target_time+"]</b>";
	}

		if (isEcostat) { // add location only in Ecostat page
			if ( hwm_check_del == 1 ) {
			while (a_all[i].parentNode.childNodes[2]) a_all[i].parentNode.removeChild(a_all[i].parentNode.childNodes[2]);
			}
			loc_data = getLocData(my_id);
			loc = document.createElement( 'span' );

			if ( hwm_check_full == 1 ) {
			loc.innerHTML = ",&nbsp;<b><font color="+loc_data.colr+">"+loc_data.name+"</font></b>";
			} else {
			loc.title = loc_data.name;
			loc.innerHTML = "&nbsp;<b><font color="+loc_data.colr+">"+loc_data.abbr+"</font></b>";
			}
			el.parentNode.insertBefore(loc, el.nextSibling);
		}

		if (!isMercenary && sa) {
			el.parentNode.insertBefore(sa, el.nextSibling);
			addEvent(sa, "click", get_obj_time);
		}

		if (isMercenary) { // add location only in Mercenary Guild page
			loc_data = getLocData(my_id);
			loc = document.createElement( 'span' );
			//loc.title = loc_data.name;
			//loc.title = "Wolf's Dale";
			//loc.innerHTML = "&nbsp;&nbsp;XXX";
			loc.innerHTML = "&nbsp;<b>(&nbsp;<font color="+loc_data.colr+">"+loc_data.name+"</font>&nbsp;)</b>";
			el.parentNode.insertBefore(loc, el.nextSibling);
		}

		if (row_count%2 && isEcostat) {
			my_row = el.parentNode.parentNode;
			for(rn=0; rn<my_row.childNodes.length; rn++){
				my_row.childNodes[rn].style.backgroundColor = "#fff";
			}
		}
		row_count++;
	}
}

function getLocData(n) {
	var loc_data = {};
	loc_data.abbr = "n/a";
	loc_data.name = "New Loc?";
	loc_data.colr = "#000000";

	var o;
	var ids_str;
	for(var i=0; i<id2loc.length; i++) {
		o = id2loc[i];
		ids_str = "_" +o.ids.join("_")+ "_";
		if(ids_str.indexOf("_"+n+"_") != -1) {
			loc_data = o;
		}
	}
	return loc_data;
}

function get_obj_time(event)
{
event = event || window.event;
event.preventDefault ? event.preventDefault() : (event.returnValue=false);
var sa = event.target || event.srcElement;

if ( !sa.href ) { sa = sa.parentNode }
sa.innerHTML = loaderid();
var objXMLHttpReqFrId = createXMLHttpReq(Math.random()* 1000000);
objXMLHttpReqFrId.open('GET', sa.href + '&rand=' + (Math.random()* 1000000), true);
objXMLHttpReqFrId.onreadystatechange = function() { handleHttpResponseFrId(objXMLHttpReqFrId,sa); }
objXMLHttpReqFrId.send(null);
}

function handleHttpResponseFrId(obj,sa) {
if (obj.readyState == 4 && obj.status == 200) {
var obj_id = id_regexp.exec(sa.href)[1];
recordWorkTime(obj_id,obj.responseText);

var target_time = "n/a";
var target_time2 = get_time_id(obj_id);
if ( target_time2 ) target_time = target_time2;

sa.innerHTML = "&nbsp;<b>["+target_time+"]</b>";
}
}

function get_time_id(my_id)
{
if(times_str.indexOf("|"+my_id+"_")!=-1) {

var curDate = new Date();
var curHour = curDate.getHours();
var curMin = curDate.getMinutes();
var vt_arr = [];

var vt_regexp = my_id+ "_\(\\d\{2\}\)";
var vtR = new RegExp( vt_regexp );
vt_arr = vtR.exec(times_str);
//t_min = vt_arr.length? vtR.exec(times_str)[1] : "00"; // ?
var t_min = vt_arr.length? vt_arr[1] : "00"; // ?
//alert("t_min = "+t_min);
var target_hr = (t_min > curMin)? curHour : curHour+1;
target_hr = (target_hr==24)? "00" : target_hr;
target_time2 = target_hr +":"+ t_min;
return target_time2;
}
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
'<tr><td>Отображать время окончания смены: <input type=checkbox '+(hwm_check_time=="1"?"checked":"")+' id=hwm_check_time_id title=""></td></tr>'+
'<tr><td>Удалять владельца предприятия в экономической статистике: <input type=checkbox '+(hwm_check_del=="1"?"checked":"")+' id=hwm_check_del_id title=""></td></tr>'+
'<tr><td>Отображать полные названия секторов (иначе сокращенные): <input type=checkbox '+(hwm_check_full=="1"?"checked":"")+' id=hwm_check_full_id title=""><br><br></td></tr>'+
'<tr><td><input type="submit" id="hwm_ecost_adv_times_id" value="Стереть окончания смен" title=""></td></tr>'+
'</table></div>' ;

	addEvent($("bt_close_ts"), "click", form_close_ts);
	addEvent($("hwm_check_time_id"), "click", hwm_check_time_f);
	addEvent($("hwm_check_del_id"), "click", hwm_check_del_f);
	addEvent($("hwm_check_full_id"), "click", hwm_check_full_f);
	addEvent($("hwm_ecost_adv_times_id"), "click", hwm_ecost_adv_times_f);

var height_v = getClientHeight_ts();
if (height_v < document.body.offsetHeight) height_v = document.body.offsetHeight;

	bg.style.top = (-document.body.scrollTop)+'px';
	bg.style.height = ( height_v + document.body.scrollTop ) +'px';
	bgc.style.top = ( document.body.scrollTop + 150 ) + 'px';
	bg.style.display = bgc.style.display = 'block';
}

function hwm_check_time_f()
{
if( $('hwm_check_time_id').checked==true ) hwm_check_time='1'; else hwm_check_time='0';
GM_setValue( "hwm_check_time", hwm_check_time );
}

function hwm_check_del_f()
{
if( $('hwm_check_del_id').checked==true ) hwm_check_del='1'; else hwm_check_del='0';
GM_setValue( "hwm_check_del", hwm_check_del );
}

function hwm_check_full_f()
{
if( $('hwm_check_full_id').checked==true ) hwm_check_full='1'; else hwm_check_full='0';
GM_setValue( "hwm_check_full", hwm_check_full );
}

function hwm_ecost_adv_times_f()
{
GM_setValue("hwm_ecost_adv_times", "|2000_00");
}

function loaderid() {
return ' <img border="0" src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'AAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F'+
'VFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGs'+
'CjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAK'+
'dgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAA'+
'AAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBC'+
'AoH4gl+FmXNEUEBVAYHToJAVZK/XWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAA'+
'AAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej+Fo'+
'gNhtHyfRQFmIol5owmEta/fcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAA'+
'LAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB+si6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMgg'+
'NZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkE'+
'BQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjF'+
'SAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO'+
'0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5l'+
'UiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkE'+
'BQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjA'+
'CYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEA'+
'IfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKO'+
'DK7ZbHCoqqSjWGKI1d2kRp+RAWGyHg+DQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIh'+
'ACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFM'+
'ogo/J0lgqEpHgoO2+GIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4Obwsi'+
'dEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgY'+
'ETCCcrB4OBWwQsGHEhQatVFhB/mNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZ'+
'MAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRk'+
'IoYyBRk4BQlHo3FIOQmvAEGBMpYSop/IgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVM'+
'IgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw+ELC85hCIAq3Am0U6JUK'+
'jkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE/5EqIHBjOgyRQELCBB7EAQH'+
'fySDhGYQdDWGQyUhADs=">';
}

function getClientHeight_ts()
{
return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
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
