// ==UserScript==
// @name           hwm_map_wars_stat
// @namespace      Demin
// @description    HWM mod - Statistika po zashhitam zemel' (by Demin)
// @homepage       http://userscripts.org/users/263230/scripts
// @version        2.6
// @include        http://*heroeswm.ru/clan_log.php*
// @include        http://178.248.235.15/clan_log.php*
// @include        http://209.200.152.144/clan_log.php*
// @include        http://*lordswm.com/clan_log.php*
// ==/UserScript==

// (c) 2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

var version = '2.6';

var script_num = 170820;
var script_name = "HWM mod - Statistika po zashhitam zemel' (by Demin)";
var string_upd = /170820=(\d+\.\d+)/;

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
if (!this.GM_addStyle || (this.GM_addStyle.toString && this.GM_addStyle.toString().indexOf("not supported")>-1)) {
	this.GM_addStyle=function (key) {
		var style = document.createElement('style');
		style.textContent = key;
		document.querySelector("head").appendChild(style);
	}
}


var parent_add = document.querySelector("a[href^='clan_info.php?id=']");
if ( parent_add ) {

var temp_date = new Date();

var add_table = document.createElement('div');
add_table.id = "map_wars_div";
add_table.setAttribute("style", "position: absolute; width: 900px; height: 540px; background: #DDD9CD; border: 2px #5D413A solid; margin: 43px 0px 0px 0px; display: none;");

add_table.innerHTML = '<table width="100%" cellpadding="5"><tr><td width="53%" valign="top">'+

'<span>\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0440\u0438\u043F\u0442\u0430: <a href="pl_info.php?id=15091">Demin</a> <a href="#" id="open_transfer_id_mapw" onclick="return false;">?</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" id="get_stats" value="Get statistics">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" id="get_map_w2" value="Show object stat" disabled="true"></span><br><br>'+

'<span><i>\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u043A\u043B\u0430\u043D\u0430 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0441 \u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0439 \u0434\u0430\u0442\u043E\u0439.</i></span><br>'+

'<span><i>\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u0430\u044F</i> \u0434\u0430\u0442\u0430, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, 14-06-13: <input id="map_wars_day" value="' + (temp_date.getDate()) + '-' + ( (temp_date.getMonth()+1)>6 ? (temp_date.getMonth()+1) : "0"+(temp_date.getMonth()+1) ) + '-13" size="6" maxlength="8"> \u0438 <input id="map_wars_days" value="1" size="1" maxlength="2"> \u0441\u0443\u0442\u043A\u0438</span><br>'+

'<span>\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u043E\u0442 \u043D\u0430\u043F\u0430\u0434\u0435\u043D\u0438\u0439, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, 5 \u0443\u0442\u0440\u0430: <input id="map_wars_hours" value="5" size="1" maxlength="2"></span><br>'+

'<span>Bonus \u0433\u0435\u0440\u043E\u044F\u043C \u0437\u0430 \u0437\u0430\u0449\u0438\u0442\u0443: 90%: <input id="map_wars_premiya" value="100" size="1" maxlength="3"> \u0438\u043B\u0438 1000*win <input id="map_wars_premiya2" value="1000" size="3" maxlength="4"></span><br><br>'+

'<span><b>LOG:</b></span><div id="map_wars_log" style="width: 100%; height: 295px; overflow: scroll; overflow-x: hidden; border: 1px #5D413A solid;"></div>'+
'<span id="map_wars_stat_zashity"></span>'+
'</td>'+
'<td width="47%" valign="top"><div id="map_wars_heroes" style="height: 40px;"></div><div style="width: 100%; height: 486px; overflow: scroll; overflow-x: hidden;"><table width="100%" id="map_wars_statistics" cellpadding="0" cellspacing="0" border="0" class="sortable" style="padding-right:2px"></table></div></td>'+
'</tr></table>';

parent_add.parentNode.appendChild(add_table);

if ( GM_getValue("action_stat") ) GM_deleteValue("action_stat");
var map_date, map_date2, log_table_html, temp4;
var log_table = "";
var page_num = /page=(\d+)/.exec( location.href );
if ( page_num ) page_num = Number( page_num[1] ); else page_num = 0;

addEvent( $("get_stats"), "click", function() { get_stats_f(map_date, map_date2, log_table, log_table_html, page_num, temp4) } );
addEvent( $("open_transfer_id_mapw"), "click", open_transfer_f );

var add_button = document.createElement('span');
add_button.innerHTML = '&nbsp;&nbsp;<input type="submit" id="get_map_w" value="Show map wars stat">';
parent_add.parentNode.appendChild(add_button);

addEvent( $("get_map_w"), "click", show_clan_stat );

GM_addStyle('\
.sortable {width:100%}\
.sortable th {background:rgb(200,200,200); text-align:left; color:#cfdce7; border:1px solid #000; border-right:none; font-size:12px; padding:1px 1px 1px; color: #000000; cursor:pointer;}\
.sortable td {padding:1px 1px 1px; border-bottom:1px solid #000; border-left:1px solid #000}\
\
.sortable .desc, .sortable .asc {background: rgb(180, 180, 180)}\
.sortable .desc h3 {cursor:pointer;}\
.sortable .asc h3 {cursor:pointer;}\
.sortable .head:hover, .sortable .desc:hover, .sortable .asc:hover {color:#fff}\
.sortable .evenrow td {background:rgb(255, 255, 255)}\
.sortable .oddrow td {background:rgb(236, 242, 246)}\
.sortable td.evenselected {background:rgb(236, 242, 246)}\
.sortable td.oddselected {background:rgb(220, 230, 238)}\
');

var add_table2 = document.createElement('div');
add_table2.id = "map_wars_div2";
add_table2.setAttribute("style", "position: absolute; width: 876px; height: 475px; background: #DDD9CD; border: 2px #5D413A solid; margin: -494px 0px 0px 5px; display: none; padding: 5px;");

add_table2.innerHTML = '<div id="map_object_statistics2" style="height: 22px;"></div><div style="width: 100%; height: 453px; overflow: scroll; overflow-x: hidden;"><table width="100%" id="map_object_statistics" cellpadding="0" cellspacing="0" border="0" class="sortable" style="padding-right:2px"></table></div>';

add_table.appendChild(add_table2);

addEvent( $("get_map_w2"), "click", show_object_stat );

}

} finally { update_n() }


/////////////////////////////////////////////////////////////////////////////////////////////////


function parse_log_table(map_date, map_date2, log_table, log_table_html, page_num, temp4) {

if ( /"<br>"/.test( log_table ) ) var temp_log_table = log_table.split("<br>");
	else var temp_log_table = log_table.split("<BR>");

var log_table_length = temp_log_table.length;
var log_table_i, map_date_now, check_date, link_map_now;
var page_num_temp = /page=(\d+)/.exec( location.href );
if ( page_num_temp ) page_num_temp = Number( page_num_temp[1] ); else page_num_temp = 0;

if ( page_num_temp > 0 ) {
for ( var i=0; i<log_table_length; i++ ) {
if ( GM_getValue("action_stat") ) {

	log_table_i = temp_log_table[i];
	map_date_now = /(\d+)-(\d+)-(\d+) (\d+):(\d+)/.exec( log_table_i );
	if ( !map_date_now ) continue;

	if ( location.hostname.match('lordswm') ) {
		check_date = new Date( Number( map_date_now[1] ), Number( map_date_now[2] ) - 1, Number( map_date_now[3] ), map_date_now[4], map_date_now[5] );
	} else {
		check_date = new Date( Number( map_date_now[3] ) + 2000, Number( map_date_now[2] ) - 1, Number( map_date_now[1] ), map_date_now[4], map_date_now[5] );
	}

	if ( check_date<map_date2 ) {
		$("map_wars_log").innerHTML += "<br>\u041A\u043E\u043D\u0435\u0447\u043D\u0430\u044F \u0434\u0430\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430 - Err3";
		$("map_wars_log").innerHTML += "<br><br><b>STOPPED</b>";
		GM_deleteValue("action_stat"); $("get_stats").disabled = "true"; $("map_wars_log").scrollTop = 200;
		return;
	}
	break;
}
}
}

var check_prot_date = false;

if ( page_num-page_num_temp == 1 ) {

for ( var i=0; i<log_table_length; i++ ) {
if ( GM_getValue("action_stat") ) {

	log_table_i = temp_log_table[i];
	map_date_now = /(\d+)-(\d+)-(\d+) (\d+):(\d+)/.exec( log_table_i );
	if ( !map_date_now ) continue;

	if ( location.hostname.match('lordswm') ) {
		check_date = new Date( Number( map_date_now[1] ), Number( map_date_now[2] ) - 1, Number( map_date_now[3] ), map_date_now[4], map_date_now[5] );
	} else {
		check_date = new Date( Number( map_date_now[3] ) + 2000, Number( map_date_now[2] ) - 1, Number( map_date_now[1] ), map_date_now[4], map_date_now[5] );
	}

	if ( check_date>map_date && check_date<map_date2 ) {
		check_prot_date = true;
		break;
	}
}
}

if ( !check_prot_date ) {
	$("map_wars_log").innerHTML += "<br>\u041A\u043E\u043D\u0435\u0447\u043D\u0430\u044F \u0434\u0430\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430 - Err4";
	$("map_wars_log").innerHTML += "<br><br><b>STOPPED</b>";
	GM_deleteValue("action_stat"); $("get_stats").disabled = "true"; $("map_wars_log").scrollTop = 200;
	return;
}

}

log_table_html = "";

for ( var i=log_table_length; i--; ) {
if ( GM_getValue("action_stat") ) {

	log_table_i = temp_log_table[i];
	map_date_now = /(\d+)-(\d+)-(\d+) (\d+):(\d+)/.exec( log_table_i );
	if ( !map_date_now ) continue;

	if ( location.hostname.match('lordswm') ) {
		check_date = new Date( Number( map_date_now[1] ), Number( map_date_now[2] ) - 1, Number( map_date_now[3] ), map_date_now[4], map_date_now[5] );
	} else {
		check_date = new Date( Number( map_date_now[3] ) + 2000, Number( map_date_now[2] ) - 1, Number( map_date_now[1] ), map_date_now[4], map_date_now[5] );
	}

	if ( check_date>map_date ) {
		page_num++;
		$("map_wars_log").innerHTML += "<br>\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430 #" + (page_num+1);
		load_page_log(map_date, map_date2, log_table, log_table_html, page_num, temp4);
		return;
	}
	break;
}
}

if ( !GM_getValue("action_stat") ) { return; }

$("map_wars_log").innerHTML += "<br>\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430 \u043A\u043B\u0430\u043D\u0430 \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0430";

log_table = "";

var links_mass = [];
var link_num = 0;
var stat_html3 = "";
stat_html3 += "<thead><tr><th style='display:none;'></th><th>Date</th><th>Time</th><th>ID</th><th>Name</th><th>Region</th><th>Gold &sum;</th><th style='border-right:1px solid #000'>Loss &sum;</th></tr></thead><tbody>";
var id_regexp = /#(\d+) ([^<\/]+)/;
var region_regexp = /(map\.php[^"'>]+)[^>]?>([^<\/]+)<b>(.)<\/b>(.)/;
var loss_regexp = /<b>(\d+)%<\/b>/;
var gold_regexp = /<b>\d+%<\/b>[^<]+<b>(\d+)<\/b>/;
var id_mapwars, region_mapwars, loss_mapwars, gold_mapwars;
var gold_summ2 = 0;

for ( var i=log_table_length; i--; ) {
if ( GM_getValue("action_stat") ) {

	log_table_i = temp_log_table[i];
	map_date_now = /(\d+)-(\d+)-(\d+) (\d+):(\d+)/.exec( log_table_i );
	if ( !map_date_now ) continue;

	if ( location.hostname.match('lordswm') ) {
		check_date = new Date( Number( map_date_now[1] ), Number( map_date_now[2] ) - 1, Number( map_date_now[3] ), map_date_now[4], map_date_now[5] );
	} else {
		check_date = new Date( Number( map_date_now[3] ) + 2000, Number( map_date_now[2] ) - 1, Number( map_date_now[1] ), map_date_now[4], map_date_now[5] );
	}

	if ( check_date>map_date && check_date<=map_date2 ) {
		link_map_now = /(clan_mwlog.php\?key=\d+&clan_id=\d+)/.exec( log_table_i ) || /(clan_mwlog.php\?key=\d+\&amp\;clan_id=\d+)/.exec( log_table_i );
		if ( link_map_now ) {
			links_mass.push( link_map_now[1] );

///////////////////////////////////////////////////////////////////

id_mapwars = id_regexp.exec( log_table_i );
region_mapwars = region_regexp.exec( log_table_i );
loss_mapwars = loss_regexp.exec( log_table_i );
gold_mapwars = gold_regexp.exec( log_table_i );

//if ( !$(id_mapwars) ) {

stat_html3 += "<tr id='" + id_mapwars[1] + "mapwars'><td style='display:none;'></td><td>" + ":" + map_date_now[1] + "-" + map_date_now[2] + "-" + map_date_now[3] + " " + map_date_now[4] + ":" + map_date_now[5] + "</td>";
stat_html3 += "<td><a href='" + link_map_now[1] + "' target='_blank' style='text-decoration: none;'>" + ":" + map_date_now[4] + ":" + map_date_now[5] + "</a></td>";
stat_html3 += "<td>" + id_mapwars[1] + "</td>";
stat_html3 += "<td><a href='object-info.php?id=" + id_mapwars[1] + "' target='_blank' style='text-decoration: none;'>" + id_mapwars[2] + "</a></td>";
stat_html3 += "<td><a href='" + region_mapwars[1] + "' target='_blank' style='text-decoration: none;'>" + region_mapwars[2] + region_mapwars[3] + region_mapwars[4] + "</a></td>";
if ( gold_mapwars ) {
	stat_html3 += "<td>" + gold_mapwars[1] + "</td>";
	gold_summ2 += Number( gold_mapwars[1] );
} else {
	stat_html3 += "<td>...</td>";
}
stat_html3 += "<td style='border-right:1px solid #000'><a href='" + link_map_now[1] + "' target='_blank' style='text-decoration: none;'>" + loss_mapwars[1] + "</a></td></tr>";

//} else {}

///////////////////////////////////////////////////////////////////

		}
	}
}
}

stat_html3 += "</tbody>";
$("map_object_statistics").innerHTML = stat_html3;

$("map_object_statistics2").innerHTML = "\u0412\u0441\u0435\u0433\u043E \u043D\u0430\u043F\u0430\u0434\u0435\u043D\u0438\u0439 \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434: <b>" + links_mass.length + "</b>. \u0412\u0441\u0435\u0433\u043E \u0437\u043E\u043B\u043E\u0442\u0430: " + gold_summ2 + ".";

var script = document.createElement('script');
script.src = "data:text/javascript;base64,dmFyIFRJTlk9e307DQoNCmZ1bmN0aW9uIFQkKGkpe3JldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpKX0NCmZ1bmN0aW9uIFQkJChlLHApe3JldHVybiBwLmdldEVsZW1lbnRzQnlUYWdOYW1lKGUpfQ0KDQpUSU5ZLnRhYmxlPWZ1bmN0aW9uKCl7DQoJZnVuY3Rpb24gc29ydGVyKG4pe3RoaXMubj1uOyB0aGlzLnBhZ2VzaXplPTIwOyB0aGlzLnBhZ2luYXRlPTB9DQoJc29ydGVyLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKGUsZil7DQoJCXZhciB0PWdlKGUpLCBpPTA7IHRoaXMuZT1lOyB0aGlzLmw9dC5yLmxlbmd0aDsgdC5hPVtdOw0KCQl0Lmg9VCQkKCd0aGVhZCcsVCQoZSkpWzBdLnJvd3NbMF07IHQudz10LmguY2VsbHMubGVuZ3RoOw0KCQlmb3IoaTtpPHQudztpKyspew0KCQkJdmFyIGM9dC5oLmNlbGxzW2ldOw0KCQkJaWYoYy5jbGFzc05hbWUhPSdub3NvcnQnKXsNCgkJCQljLmNsYXNzTmFtZT10aGlzLmhlYWQ7IGMub25jbGljaz1uZXcgRnVuY3Rpb24odGhpcy5uKycud2sodGhpcy5jZWxsSW5kZXgpJykNCgkJCX0NCgkJfQ0KCQlmb3IoaT0wO2k8dGhpcy5sO2krKyl7dC5hW2ldPXt9fQ0KCQlpZihmIT1udWxsKXt2YXIgYT1uZXcgRnVuY3Rpb24odGhpcy5uKycud2soJytmKycpJyk7IGEoKX0NCgkJaWYodGhpcy5wYWdpbmF0ZSl7dGhpcy5nPTE7IHRoaXMucGFnZXMoKX0NCgl9Ow0KCXNvcnRlci5wcm90b3R5cGUud2s9ZnVuY3Rpb24oeSl7DQoJCXZhciB0PWdlKHRoaXMuZSksIHg9dC5oLmNlbGxzW3ldLCBpPTA7DQoJCWZvcihpO2k8dGhpcy5sO2krKyl7DQogICAgICB0LmFbaV0ubz1pOyB2YXIgdj10LnJbaV0uY2VsbHNbeV07IHQucltpXS5zdHlsZS5kaXNwbGF5PScnOw0KICAgICAgd2hpbGUodi5oYXNDaGlsZE5vZGVzKCkpe3Y9di5maXJzdENoaWxkfQ0KICAgICAgdC5hW2ldLnY9di5ub2RlVmFsdWU/di5ub2RlVmFsdWU6JycNCiAgICB9DQoJCWZvcihpPTA7aTx0Lnc7aSsrKXt2YXIgYz10LmguY2VsbHNbaV07IGlmKGMuY2xhc3NOYW1lIT0nbm9zb3J0Jyl7Yy5jbGFzc05hbWU9dGhpcy5oZWFkfX0NCgkJaWYodC5wICYmIHQucD09eSl7dC5hLnJldmVyc2UoKTsgeC5jbGFzc05hbWU9dC5kP3RoaXMuYXNjOnRoaXMuZGVzYzsgdC5kPXQuZD8wOjF9DQoJCWVsc2V7dC5wPXk7IHQuYS5zb3J0KGNwKTsgdC5kPTA7IHguY2xhc3NOYW1lPXRoaXMuYXNjfQ0KCQl2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpOw0KCQlmb3IoaT0wO2k8dGhpcy5sO2krKyl7DQoJCQl2YXIgcj10LnJbdC5hW2ldLm9dLmNsb25lTm9kZSh0cnVlKTsgDQoJCQlyLmNlbGxzWzBdLmlubmVySFRNTCA9IHQucltpXS5jZWxsc1swXS5pbm5lckhUTUw7DQoJCQluLmFwcGVuZENoaWxkKHIpOw0KCQkJci5jbGFzc05hbWU9aSUyPT0wP3RoaXMuZXZlbjp0aGlzLm9kZDsgdmFyIGNlbGxzPVQkJCgndGQnLHIpOw0KCQkJZm9yKHZhciB6PTA7ejx0Lnc7eisrKXtjZWxsc1t6XS5jbGFzc05hbWU9eT09ej9pJTI9PTA/dGhpcy5ldmVuc2VsOnRoaXMub2Rkc2VsOicnfQ0KCQl9DQoJCXQucmVwbGFjZUNoaWxkKG4sdC5iKTsgaWYodGhpcy5wYWdpbmF0ZSl7dGhpcy5zaXplKHRoaXMucGFnZXNpemUpfQ0KCX07DQoJc29ydGVyLnByb3RvdHlwZS5wYWdlPWZ1bmN0aW9uKHMpew0KCS8vCXZhciB0PWdlKHRoaXMuZSks"+
"IGk9MCwgbD1zK3BhcnNlSW50KHRoaXMucGFnZXNpemUpOw0KCS8vCWlmKHRoaXMuY3VycmVudGlkJiZ0aGlzLmxpbWl0aWQpe1QkKHRoaXMuY3VycmVudGlkKS5pbm5lckhUTUw9dGhpcy5nfQ0KCS8vCWZvcihpO2k8dGhpcy5sO2krKyl7dC5yW2ldLnN0eWxlLmRpc3BsYXk9aT49cyYmaTxsPycnOidub25lJ30NCgl9Ow0KCXNvcnRlci5wcm90b3R5cGUubW92ZT1mdW5jdGlvbihkLG0pew0KCS8vCXZhciBzPWQ9PTE/KG0/dGhpcy5kOnRoaXMuZysxKToobT8xOnRoaXMuZy0xKTsNCgkvLwlpZihzPD10aGlzLmQmJnM+MCl7dGhpcy5nPXM7IHRoaXMucGFnZSgocy0xKSp0aGlzLnBhZ2VzaXplKX0NCgl9Ow0KCXNvcnRlci5wcm90b3R5cGUuc2l6ZT1mdW5jdGlvbihzKXsNCgkvLwl0aGlzLnBhZ2VzaXplPXM7IHRoaXMuZz0xOyB0aGlzLnBhZ2VzKCk7IHRoaXMucGFnZSgwKTsNCgkvLwlpZih0aGlzLmN1cnJlbnRpZCYmdGhpcy5saW1pdGlkKXtUJCh0aGlzLmxpbWl0aWQpLmlubmVySFRNTD10aGlzLmR9DQoJfTsNCglzb3J0ZXIucHJvdG90eXBlLnBhZ2VzPWZ1bmN0aW9uKCl7dGhpcy5kPU1hdGguY2VpbCh0aGlzLmwvdGhpcy5wYWdlc2l6ZSl9Ow0KCWZ1bmN0aW9uIGdlKGUpe3ZhciB0PVQkKGUpOyB0LmI9VCQkKCd0Ym9keScsdClbMF07IHQucj10LmIucm93czsgcmV0dXJuIHR9Ow0KCWZ1bmN0aW9uIGNwKGYsYyl7DQoJCXZhciBnLGg7IGY9Zz1mLnYudG9Mb3dlckNhc2UoKSwgYz1oPWMudi50b0xvd2VyQ2FzZSgpOw0KCQl2YXIgaT1wYXJzZUZsb2F0KGYucmVwbGFjZSgvKFwkfFwsKS9nLCcnKSksIG49cGFyc2VGbG9hdChjLnJlcGxhY2UoLyhcJHxcLCkvZywnJykpOw0KCQlpZighaXNOYU4oaSkmJiFpc05hTihuKSl7Zz1pLGg9bn0NCgkJaT1EYXRlLnBhcnNlKGYpOyBuPURhdGUucGFyc2UoYyk7DQoJCWlmKCFpc05hTihpKSYmIWlzTmFOKG4pKXtnPWk7IGg9bn0NCgkJcmV0dXJuIGc8aD8xOihnPmg/LTE6MCkNCgl9Ow0KCXJldHVybntzb3J0ZXI6c29ydGVyfQ0KfSgpOw0KDQp2YXIgc29ydGVyID0gbmV3IFRJTlkudGFibGUuc29ydGVyKCJzb3J0ZXIiKTsNCnNvcnRlci5oZWFkID0gImhlYWQiOw0Kc29ydGVyLmFzYyA9ICJhc2MiOw0Kc29ydGVyLmRlc2MgPSAiZGVzYyI7DQpzb3J0ZXIuZXZlbiA9ICJldmVucm93IjsNCnNvcnRlci5vZGQgPSAib2Rkcm93IjsNCnNvcnRlci5ldmVuc2VsID0gImV2ZW5zZWxlY3RlZCI7DQpzb3J0ZXIub2Rkc2VsID0gIm9kZHNlbGVjdGVkIjsNCnNvcnRlci5wYWdpbmF0ZSA9IHRydWU7DQpzb3J0ZXIuY3VycmVudGlkID0gImN1cnJlbnRwYWdlIjsNCnNvcnRlci5saW1pdGlkID0gInBhZ2VsaW1pdCI7DQpzb3J0ZXIuaW5pdCgibWFwX29iamVjdF9zdGF0aXN0aWNzIiw3KTs=";
document.querySelector("head").appendChild(script);


if ( !GM_getValue("action_stat") ) { return; }

$("map_wars_log").innerHTML += "<br>\u041D\u0430\u0439\u0434\u0435\u043D\u043E <b>" + links_mass.length + "</b> \u0438\u0441\u0442\u043E\u0440\u0438\u0439";

if ( links_mass.length>0 ) {

var temp_textarea = "";
for ( var i=0; i<links_mass.length; i++ ) {
	temp_textarea += "\n" + links_mass[i];
}

$("map_wars_log").innerHTML += "<br><textarea cols='3' style='width: 95%; resize: none; margin:0; padding:0;'>" + temp_textarea + "</textarea>";

$("map_wars_log").innerHTML += '<br><br><input type="submit" id="start_load_histories" value="\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0438\u0441\u0442\u043E\u0440\u0438\u0439">';

$("map_wars_log").scrollTop = 200;

addEvent( $("start_load_histories"), "click",
function() {

if ( links_mass.length<20 || confirm('\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B?\n\n2.2. \u0417\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F, \u0432\u0435\u0434\u0443\u0449\u0438\u0435 \u043A \u0437\u0430\u0432\u044B\u0448\u0435\u043D\u043D\u043E\u043C\u0443 \u0442\u0440\u0430\u0444\u0438\u043A\u0443 \u0438\u043B\u0438 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u043C\u0443 \u0443\u0432\u0435\u043B\u0438\u0447\u0435\u043D\u0438\u044E \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u0412 \u0447\u0430\u0441\u0442\u043D\u043E\u0441\u0442\u0438, \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043B\u0443\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u044E\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u043B\u0438 \u043F\u0440\u0438\u0432\u043E\u0434\u044F\u0442 \u0432 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0438\u0433\u0440\u043E\u0432\u044B\u0435 \u043C\u0435\u0445\u0430\u043D\u0438\u0437\u043C\u044B.\n\n2.2. Any actions leading to traffic increase or considerable server overload are forbidden. In particular, automatic and semi-automatic scripts referring to the database or running game mechanisms are forbidden.') ) {

$("start_load_histories").parentNode.removeChild( $("start_load_histories") );

$("map_wars_log").innerHTML += "<b>\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043E \u0434\u043B\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438</b>";

$("map_wars_log").innerHTML += "<br><span id='map_wars_log2'>&nbsp;</span>";

 $("map_wars_log").scrollTop = 200;

var stat_mass_id = [];
var stat_mass = [];
var defense = 0;
var stat_mass_battle = [0, 0, 0, 0, 0, 0, 0];
var html_stat, temp7;

get_stat_link(link_num, links_mass, stat_mass_id, stat_mass, defense, html_stat, stat_mass_battle, temp7);

}

});

$("get_map_w2").disabled = "";
show_object_stat();

} else {
	$("map_wars_log").innerHTML += "<br><br><b>STOPPED</b>";
	GM_deleteValue("action_stat"); $("get_stats").disabled = "true"; $("map_wars_log").scrollTop = 200;
}

}


function load_page_log(map_date, map_date2, log_table, log_table_html, page_num, temp4) {
if ( GM_getValue("action_stat") ) {
var objXMLHttpReqLog = new XMLHttpRequest();
var id_now = /id=(\d+)/.exec( location.href )[1];
objXMLHttpReqLog.open('GET', 'clan_log.php?id=' + id_now + '&page=' + page_num, true);
objXMLHttpReqLog.overrideMimeType("text/plain; charset=windows-1251");
objXMLHttpReqLog.onreadystatechange = function() { handleHttpResponseLog(map_date, map_date2, log_table, objXMLHttpReqLog, page_num, temp4); }
objXMLHttpReqLog.send(null);
}
}


function handleHttpResponseLog(map_date, map_date2, log_table, log_table_html, page_num, temp4) {
if (log_table_html.readyState == 4 ) {
if (log_table_html.status == 200) {
log_table_html = log_table_html.responseText;
if ( GM_getValue("action_stat") ) {
	if ( /clan_log.php\?id=/.test( log_table_html ) ) {
		log_table_html = log_table_html.split("clan_log.php?id=");
		log_table_html = log_table_html[log_table_html.length-1].split("</td>")[0];

		log_table += "<br>" + log_table_html;
		parse_log_table(map_date, map_date2, log_table, log_table_html, page_num, temp4);
	} else {
		$("map_wars_log").innerHTML += "<br><b>\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430 \u043A\u043B\u0430\u043D\u0430 - Err2</b>";
		$("map_wars_log").innerHTML += "<br><br><b>STOPPED</b>";
		GM_deleteValue("action_stat"); $("get_stats").disabled = "true"; $("map_wars_log").scrollTop = 200;
		return;
	}
}
} else {
	$("map_wars_log").innerHTML += "<br><b>\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430 \u043A\u043B\u0430\u043D\u0430 - Err1</b>";
	$("map_wars_log").innerHTML += "<br><br><b>STOPPED</b>";
	GM_deleteValue("action_stat"); $("get_stats").disabled = "true"; $("map_wars_log").scrollTop = 200;
	return;
}
}

}


function get_stats_f(map_date, map_date2, log_table, log_table_html, page_num, temp4) {

if ( $("get_stats").value == "Get statistics" ) {
	var map_wars_hours = Number( $("map_wars_hours").value );
	var map_wars_day = $("map_wars_day").value;
	var map_wars_day_reg = false;

	var map_wars_premiya = Number( $("map_wars_premiya").value );
	if ( map_wars_premiya ) { $("map_wars_premiya2").value=""; } else { map_wars_premiya = Number( $("map_wars_premiya2").value ); $("map_wars_premiya").value=""; }

	var map_wars_days = Number( $("map_wars_days").value );

	if ( map_wars_hours && map_wars_day && map_wars_day.length==8 && map_wars_premiya && map_wars_days && ( map_wars_day_reg = /(\d+)-(\d+)-(\d+)/.exec( map_wars_day ) ) ) {

		$("map_wars_premiya").disabled = "true";
		$("map_wars_premiya2").disabled = "true";
		$("map_wars_day").disabled = "true";
		$("map_wars_days").disabled = "true";
		$("map_wars_hours").disabled = "true";

		map_date = new Date( Number( map_wars_day_reg[3] ) + 2000, Number( map_wars_day_reg[2] ) - 1, Number( map_wars_day_reg[1] ), map_wars_hours );
		map_date2 = new Date( Date.parse( map_date ) + map_wars_days * 86400000 );
		GM_setValue("action_stat", "1");
		$("get_stats").value = "STOP";
		$("map_wars_log").innerHTML = "\u0412\u044B\u0431\u0440\u0430\u043D \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0434\u0430\u0442 ( \u0441 \\ \u043F\u043E ):" + "<br>" + map_date + "<br>" + map_date2;

		$("map_wars_log").innerHTML += "<br><br><b>\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430 \u043A\u043B\u0430\u043D\u0430</b>";
		load_page_log(map_date, map_date2, log_table, log_table_html, page_num, temp4);

	} else {
		$("map_wars_log").innerHTML = "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
	}
} else {

	$("get_stats").value = "Get statistics";
	$("map_wars_log").innerHTML += "<br><br><b>STOPPED</b>";
	GM_deleteValue("action_stat"); $("get_stats").disabled = "true"; $("map_wars_log").scrollTop = 200;
	if ( $("start_load_histories") ) { $("start_load_histories").disabled = "true"; }
}
}


function show_clan_stat() {

if ( $("get_map_w").value == "Show map wars stat" ) {
	$("get_map_w").value = "Hide map wars stat";
	$("map_wars_div").style.display = "";
} else {
	$("get_map_w").value = "Show map wars stat";
	$("map_wars_div").style.display = "none";
}
}

function show_object_stat() {

if ( $("get_map_w2").value == "Show object stat" ) {
	$("get_map_w2").value = "Hide object stat";
	$("map_wars_div2").style.display = "";
} else {
	$("get_map_w2").value = "Show object stat";
	$("map_wars_div2").style.display = "none";
}
}


/////////////////////////////////////////////////////////////////////////////////////////////////


function show_stat(link_num, links_mass, stat_mass_id, stat_mass, defense, html_stat, stat_mass_battle, temp7) {
var stat_mass_id_length = stat_mass_id.length;
var stat_mass_id_now;
var stat_html = "";
var stat2_html = "";
var gold_all = 0;
var pers_2_battle = 0;
var map_wars_premiya = Number( $("map_wars_premiya").value ) || Number( $("map_wars_premiya2").value );
var map_wars_premiya_check = Number( $("map_wars_premiya").value );
var bonus_temp;
var bonus_full = 0;

	stat_html += "<thead><tr><th style='display:none;'></th><th>Nick</th><th>lvl</th><th>Win</th><th>all</th><th>Gold</th><th>Bonus</th><th>&nbsp;</th><th style='border-right:1px solid #000'>%</th></tr></thead><tbody>";

for ( var i=0; i<stat_mass_id_length; i++ ) {
	stat_mass_id_now = stat_mass_id[i];
	stat_mass_id_now = stat_mass[stat_mass_id_now];
	stat_html += "<tr><td style='display:none;'></td><td><a href='pl_info.php?id=" + stat_mass_id[i] + "' target='_blank' style='text-decoration: none;'>" + stat_mass_id_now[0] + "</a></td>";
	stat_html += "<td>" + stat_mass_id_now[1] + "</td>";
	stat_html += "<td>" + stat_mass_id_now[2] + "</td>";
	stat_html += "<td>" + stat_mass_id_now[3] + "</td>";
	stat_html += "<td>" + stat_mass_id_now[4] + "</td>";

	if ( map_wars_premiya_check ) bonus_temp = Math.round( stat_mass_id_now[4] * map_wars_premiya / 100 ); else bonus_temp = map_wars_premiya * stat_mass_id_now[2];

	stat_html += "<td>" + bonus_temp + "</td><td align='center'><a href='transfer.php?gold=" + bonus_temp + "&nick=" + stat_mass_id_now[0] + "' target='_blank' onclick='this.parentNode.style.background=\"blue\";'><img src='i/top/line/pismo.gif' align='absmiddle' border='0' height='12' width='12'></a></td>";
	stat_html += "<td style='border-right:1px solid #000'>" + stat_mass_id_now[5] + "</td></tr>";

	bonus_full += bonus_temp;
	gold_all += stat_mass_id_now[4];
	if ( stat_mass_id_now[3] > 1 ) pers_2_battle++;
}

	stat_html += "</tbody>";

$("map_wars_statistics").innerHTML = stat_html;

stat2_html += "<br><b>\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0449\u0438\u0442: " + stat_mass_battle[0] + ".";
if ( stat_mass_battle[1] > 0 ) stat2_html += " \u0418\u0434\u0435\u0442 \u0437\u0430\u0449\u0438\u0442: " + stat_mass_battle[1] + ".";
stat2_html += "<br>\u041F\u043E\u0431\u0435\u0434\u043D\u044B\u0445 \u0437\u0430\u044F\u0432\u043E\u043A: " + stat_mass_battle[2] + "; \u0441\u043B\u0438\u0442\u044B\u0445: " + stat_mass_battle[3] + "</b>, \u0432 \u0442\u043E\u043C \u0447\u0438\u0441\u043B\u0435:";
stat2_html += "<br>\u043F\u0440\u043E\u0438\u0433\u0440\u0430\u043D\u043D\u044B\u0445: " + stat_mass_battle[4] + ", \u043D\u0435 \u043F\u043E\u043B\u043D\u0430\u044F \u0442\u0440\u043E\u0439\u043A\u0430: " + stat_mass_battle[5] + ", \u043D\u0435 \u0432\u044B\u0448\u043B\u0438 \u043D\u0430 \u0437\u0430\u0449\u0438\u0442\u0443: " + stat_mass_battle[6] + ".";

$("map_wars_stat_zashity").innerHTML = stat2_html;

$("map_wars_heroes").innerHTML = "<b>\u0423\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u043B\u043E " + stat_mass_id_length + " \u0433\u0435\u0440\u043E\u0435\u0432,</b> \u0438\u0437 \u043D\u0438\u0445 " + pers_2_battle + " \u043F\u0440\u043E\u0432\u0435\u043B\u0438 2+ \u0431\u043E\u0435\u0432.<br>\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E " + gold_all + " \u043C\u043E\u043D\u0435\u0442, \u0432 \u0442\u043E\u043C \u0447\u0438\u0441\u043B\u0435 bonus " + bonus_full + ".";

link_num++;

if ( link_num < links_mass.length ) {

	get_stat_link(link_num, links_mass, stat_mass_id, stat_mass, defense, html_stat, stat_mass_battle, temp7);

} else {

	if ( defense>0 ) $("map_wars_log").innerHTML += "<br><br><font color='red'><b>\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! \u0415\u0449\u0435 \u0438\u0434\u0435\u0442 " + defense + " \u0437\u0430\u0449\u0438\u0442. \u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043D\u0435 \u043F\u043E\u043B\u043D\u0430\u044F.</b></font>";

	$("map_wars_log").innerHTML += "<br><br><b>Complited!</b>";
	GM_deleteValue("action_stat"); $("get_stats").disabled = "true";


var script = document.createElement('script');
script.src = "data:text/javascript;base64,dmFyIHNvcnRlcjIgPSBuZXcgVElOWS50YWJsZS5zb3J0ZXIoInNvcnRlcjIiKTsNCnNvcnRlcjIuaGVhZCA9ICJoZWFkIjsNCnNvcnRlcjIuYXNjID0gImFzYyI7DQpzb3J0ZXIyLmRlc2MgPSAiZGVzYyI7DQpzb3J0ZXIyLmV2ZW4gPSAiZXZlbnJvdyI7DQpzb3J0ZXIyLm9kZCA9ICJvZGRyb3ciOw0Kc29ydGVyMi5ldmVuc2VsID0gImV2ZW5zZWxlY3RlZCI7DQpzb3J0ZXIyLm9kZHNlbCA9ICJvZGRzZWxlY3RlZCI7DQpzb3J0ZXIyLnBhZ2luYXRlID0gdHJ1ZTsNCnNvcnRlcjIuY3VycmVudGlkID0gImN1cnJlbnRwYWdlIjsNCnNvcnRlcjIubGltaXRpZCA9ICJwYWdlbGltaXQiOw0Kc29ydGVyMi5pbml0KCJtYXBfd2Fyc19zdGF0aXN0aWNzIiw1KTs=";
document.querySelector("head").appendChild(script);

}

}


function get_stat(link_num, links_mass, stat_mass_id, stat_mass, defense, html_stat, stat_mass_battle, temp7) {

//stat_mass_battle[kol-vo zashit, idet zashit, kol-vo pobed, kol-vo porazenii:, proigrali, vyshli ne polnoi 3, ne vyshli vovse]

var win, html_i, pers_id, pers_nick, pers_lvl, pers_gold, pers_lost, pers_v_zayavke;
for ( var i=0; i<html_stat.length; i++ ) {
	html_i = html_stat[i];

	if ( !/pl_info.php/.test( html_i ) ) {
		if ( /\%/.test( html_i ) && /\d\)/.test( html_i ) ) {
			stat_mass_battle[0]++;
			stat_mass_battle[3]++;
			stat_mass_battle[6]++;
		}
		continue;
	}

	if ( /\.\.\./.test( html_i ) && /\d\)/.test( html_i ) ) {
		defense++;
		stat_mass_battle[0]++;
		stat_mass_battle[1]++;
		continue;
	}

	stat_mass_battle[0]++;

	win = ( !/\%/.test( html_i ) ) ? 1 : 0;
	if ( win==1 ) { stat_mass_battle[2]++; pers_lost = 0; }
		else { stat_mass_battle[3]++; pers_lost = Number( /(\d+)\%/.exec( html_i )[1] ); }

	html_i = html_i.split("<a");
	pers_v_zayavke = 0;

	for ( var j=0; j<html_i.length; j++ ) {
		if ( !/pl_info.php/.test( html_i[j] ) ) continue;
		pers_id = /id=(\d+)/.exec( html_i[j] )[1];
		pers_nick = />([^<]+)/.exec( html_i[j] )[1];
		pers_lvl = Number( /\[(\d+)\]/.exec( html_i[j] )[1] );
		pers_v_zayavke++;
		if ( win==1 ) { pers_gold = pers_lvl * 100; }
			else { pers_gold = 0; }

		if ( !stat_mass[pers_id] ) {
			stat_mass_id.push( pers_id );
			stat_mass[pers_id] = [pers_nick, pers_lvl, win, 1, pers_gold, pers_lost];
		} else {
			stat_mass[pers_id][2] += win;
			stat_mass[pers_id][3]++;
			stat_mass[pers_id][4] += pers_gold;
			stat_mass[pers_id][5] += pers_lost;
		}

	}
	if ( win==0 ) {
		if ( pers_v_zayavke==3 ) stat_mass_battle[4]++; else stat_mass_battle[5]++;
	}
}

show_stat(link_num, links_mass, stat_mass_id, stat_mass, defense, html_stat, stat_mass_battle, temp7);
}


function get_stat_link(link_num, links_mass, stat_mass_id, stat_mass, defense, html_stat, stat_mass_battle, temp7) {
if ( GM_getValue("action_stat") ) {
$("map_wars_log2").innerHTML = "\u041E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u044E \u0438\u0441\u0442\u043E\u0440\u0438\u044E #" + (link_num+1) + " \u0438\u0437 " + links_mass.length;

var objXMLHttpReqWars = new XMLHttpRequest();
objXMLHttpReqWars.open('GET', links_mass[link_num], true);
objXMLHttpReqWars.overrideMimeType("text/plain; charset=windows-1251");
objXMLHttpReqWars.onreadystatechange = function() { handleHttpResponseWars(link_num, links_mass, stat_mass_id, stat_mass, defense, objXMLHttpReqWars, stat_mass_battle, temp7); }
objXMLHttpReqWars.send(null);
}
}


function handleHttpResponseWars(link_num, links_mass, stat_mass_id, stat_mass, defense, html_stat, stat_mass_battle, temp7) {
if (html_stat.readyState == 4 ) {
if (html_stat.status == 200) {
html_stat = html_stat.responseText;
if ( GM_getValue("action_stat") ) {
	if ( /clan_log.php\?id=/.test( html_stat ) ) {
		html_stat = html_stat.split("1)");
		html_stat = "1)" + html_stat[html_stat.length-1];
		html_stat = html_stat.split("</td>")[0];
		if ( /"<br>"/.test( html_stat ) ) html_stat = html_stat.split("<br>");
			else html_stat = html_stat.split("<BR>");

		get_stat(link_num, links_mass, stat_mass_id, stat_mass, defense, html_stat, stat_mass_battle, temp7);

	} else {
		$("map_wars_log").innerHTML += "<br><b>\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0437\u0430\u0449\u0438\u0442\u044B - Err6</b>";
		$("map_wars_log").innerHTML += "<br><br><b>STOPPED</b>";
		GM_deleteValue("action_stat"); $("get_stats").disabled = "true"; $("map_wars_log").scrollTop = 200;
		return;
	}
}
} else {
	$("map_wars_log").innerHTML += "<br><b>\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0437\u0430\u0449\u0438\u0442\u044B - Err5</b>";
	$("map_wars_log").innerHTML += "<br><br><b>STOPPED</b>";
	GM_deleteValue("action_stat"); $("get_stats").disabled = "true"; $("map_wars_log").scrollTop = 200;
	return;
}
}

}


function open_transfer_f()
{
	if ( location.href.match('lordswm') )
	{
		window.location = "transfer.php?nick=demin&shortcomment=Transferred 10000 Gold 5 Diamonds";
	} else {
		window.location = "transfer.php?nick=demin&shortcomment=%CF%E5%F0%E5%E4%E0%ED%EE%2010000%20%C7%EE%EB%EE%F2%EE%205%20%C1%F0%E8%EB%EB%E8%E0%ED%F2%FB";
	}
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
