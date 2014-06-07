// ==UserScript==
// @name           hwm_clan_statistics
// @namespace      Demin
// @description    HWM mod - Statistika po klanu (by Demin)
// @homepage       http://userscripts.org/scripts/show/167973
// @version        1.3
// @include        http://*heroeswm.ru/clan_info.php*
// @include        http://178.248.235.15/clan_info.php*
// @include        http://209.200.152.144/clan_info.php*
// @include        http://*lordswm.com/clan_info.php*
// ==/UserScript==

// (c) 2013-2014, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

(function() {

var version = '1.3';


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


var script_num = 167973;
var script_name = "HWM mod - Statistika po klanu (by Demin)";
update_n(version,script_num,script_name);

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';


var clan_online = document.querySelectorAll("img[src$='clans/online.gif']");
var clan_offline = document.querySelectorAll("img[src$='clans/offline.gif']");
var clan_battle = document.querySelectorAll("img[src$='clans/battle.gif']");
var clan_arcomag = document.querySelectorAll("img[src$='clans/arcomag.gif']");

if ( clan_offline[0] ) {
	var clan_table = clan_offline[0].parentNode;
	var img_link = /(\S*\/)i\//.exec(clan_offline[0].src)[1];
} else if ( clan_online[0] ) {
	var clan_table = clan_online[0].parentNode;
	var img_link = /(\S*\/)i\//.exec(clan_online[0].src)[1];
}

if ( clan_table ) {

var hwm_clan_statistics = GM_getValue( "hwm_clan_statistics" , '0' );

while ( clan_table.tagName != 'TR' ) { clan_table = clan_table.parentNode; }
clan_table = clan_table.parentNode.childNodes;

var add_table_parent = document.querySelector("a[href^='clan_log.php?id']");
while ( add_table_parent.tagName != 'TR' ) { add_table_parent = add_table_parent.parentNode; }

var add_table = document.createElement('tr');
add_table.setAttribute('id', 'clan_statistics');

var add_hide_parent = add_table_parent.previousSibling.firstChild;
var add_hide = document.createElement('span');
add_hide.setAttribute('id', 'clan_statistics_hide');
add_hide.innerHTML = '&nbsp;&nbsp;&nbsp;[<<]';

add_hide_parent.appendChild(add_hide);
add_table_parent.parentNode.insertBefore(add_table, add_table_parent);

addEvent($("clan_statistics_hide"), "click", clan_statistics_hide_f);

if ( hwm_clan_statistics == '1' ) { hwm_clan_statistics = '0'; clan_statistics_hide_f(); }
	else { main_statistics(); }

}

function main_statistics()
{

if ( location.hostname.match('lordswm') ) {
var text_all = 'All';
var text_online = 'Online';
var text_sr_level = 'The average level of heroes';
var text_level = ' level';
var st_author = 'Script writer';
} else {
var text_all = '\u0412\u0441\u0435\u0433\u043E';
var text_online = '\u0412 \u0441\u0435\u0442\u0438';
var text_sr_level = '\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u0435\u0432';
var text_level = ' \u0443\u0440\u043E\u0432\u043D\u0435\u0439';
var st_author = '\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0440\u0438\u043F\u0442\u0430';
}

var frak_mass = [];
var frak_mass_name = [];
var frak_mass_title = [];
var frak_i, frak_i_title;

var ur_mass = [];
var ur_mass_n = [];

var clan_table_length = clan_table.length;

for ( var i=clan_table_length; i--; )
{
	frak_i = clan_table[i].childNodes[2].querySelector("img[src*='i/r'][src$='.gif']");
	frak_i_title = frak_i.title;
	frak_i = /i\/r(\d+)\.gif/.exec( frak_i.src )[1];
	if ( !frak_mass_name[frak_i] ) {
		frak_mass.push( frak_i );
		frak_mass_name[frak_i] = 1;
		frak_mass_title[frak_i] = frak_i_title;
	} else {
		frak_mass_name[frak_i]++;
	}

	frak_i = Number(clan_table[i].childNodes[3].innerHTML);
	if ( !ur_mass_n[frak_i] ) {
		ur_mass.push( frak_i );
		ur_mass_n[frak_i] = 1;
	} else {
		ur_mass_n[frak_i]++;
	}
}

//frak_mass.sort( function(a, b) { return b - a; } );
frak_mass.sort( function(a, b) { return b.replace(/(\d*)(\d)/, '$2.$1') - a.replace(/(\d*)(\d)/, '$2.$1'); } );
ur_mass.sort( function(a, b) { return a - b; } );

var add_table_html = '<td colspan="2" class="wbwhite"><table width="100%" height="100%"><tr><td width="60%" valign="top" style="border-right:1px #5D413A solid;">';
add_table_html += '<table width="100%" cellpadding="5"><tr><td align="center">';

add_table_html += '<b>'+text_all+':</b> '+clan_table_length+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>'+text_online+':</b> '+(clan_table_length-clan_offline.length);
add_table_html += ' (' + Math.round((clan_table_length-clan_offline.length)/clan_table_length*100) + '%)';

add_table_html += '</td></tr><tr><td align="center" style="white-space:nowrap">';

if ( clan_online[0] ) add_table_html += '<img src="'+img_link+'i/clans/online.gif" align="absmiddle" border="0" height="15" width="15"> <b>' + clan_online[0].title + ':</b> ' + clan_online.length + '&nbsp;&nbsp;&nbsp;';
if ( clan_battle[0] ) add_table_html += '<img src="'+img_link+'i/clans/battle.gif" align="absmiddle" border="0" height="15" width="15"> <b>' + clan_battle[0].title + ':</b> ' + clan_battle.length + '&nbsp;&nbsp;&nbsp;';
if ( clan_arcomag[0] ) add_table_html += '<img src="'+img_link+'i/clans/arcomag.gif" align="absmiddle" border="0" height="15" width="15"> <b>' + clan_arcomag[0].title + ':</b> ' + clan_arcomag.length + '&nbsp;&nbsp;&nbsp;';
if ( clan_offline[0] ) add_table_html += '<img src="'+img_link+'i/clans/offline.gif" align="absmiddle" border="0" height="15" width="15"> <b>' + clan_offline[0].title + ':</b> ' + clan_offline.length;

add_table_html += '</td></tr><tr><td>';

for ( var i=frak_mass.length; i--; )
{
	frak_i = frak_mass[i];
	add_table_html += '<img src="'+img_link+'i/r' + frak_i + '.gif" align="absmiddle" border="0" height="15" width="15"> <b>' + frak_mass_title[frak_i] + ':</b> ' + frak_mass_name[frak_i];
	add_table_html += ' (' + Math.round(frak_mass_name[frak_i]/clan_table_length*100) + '%)<br>';
}

add_table_html += '</td></tr></table>';
add_table_html += '</td><td valign="top" height="100%">';

add_table_html += '<table width="100%" height="100%" cellpadding="5"><tr><td align="center">';

var ur_sredn = 0;

for ( var i=ur_mass.length; i--; )
{
	frak_i = ur_mass[i];
	ur_sredn += Number(frak_i) * Number(ur_mass_n[frak_i]);
}

add_table_html += '<b>'+text_sr_level+':</b> ' + Math.round(ur_sredn/clan_table_length*10)/10;
add_table_html += '</td></tr><tr><td height="100%" valign="middle">';

for ( var i=ur_mass.length; i--; )
{
	frak_i = ur_mass[i];
	add_table_html += '<b>' + frak_i + text_level + ':</b> ' + ur_mass_n[frak_i];
	add_table_html += ' (' + Math.round(ur_mass_n[frak_i]/clan_table_length*100) + '%)<br>';
}

add_table_html += '</td></tr><tr><td align="right" valign="bottom">';

add_table_html += st_author+': <a href="pl_info.php?id=15091">Demin</a>';

add_table_html += '</td></tr></table></td></tr></table></td>';

add_table.innerHTML = add_table_html;

}

function clan_statistics_hide_f()
{
var add_hide_html = '&nbsp;&nbsp;&nbsp;';
if ( hwm_clan_statistics == '0' ) {
	hwm_clan_statistics = '1';
	$("clan_statistics").style.display = 'none';
	if ( clan_online[0] ) add_hide_html += '<img src="'+img_link+'i/clans/online.gif" align="absmiddle" border="0" height="15" width="15"> <b>' + clan_online[0].title + ':</b> ' + clan_online.length + '&nbsp;&nbsp;&nbsp;';
	if ( clan_battle[0] ) add_hide_html += '<img src="'+img_link+'i/clans/battle.gif" align="absmiddle" border="0" height="15" width="15"> <b>' + clan_battle[0].title + ':</b> ' + clan_battle.length + '&nbsp;&nbsp;&nbsp;';
	if ( clan_arcomag[0] ) add_hide_html += '<img src="'+img_link+'i/clans/arcomag.gif" align="absmiddle" border="0" height="15" width="15"> <b>' + clan_arcomag[0].title + ':</b> ' + clan_arcomag.length + '&nbsp;&nbsp;&nbsp;';
	add_hide_html += '[>>]';
} else {
	hwm_clan_statistics = '0';
	$("clan_statistics").style.display = '';
	add_hide_html += '[<<]';
	main_statistics();
}
GM_setValue( "hwm_clan_statistics" , hwm_clan_statistics );
$("clan_statistics_hide").innerHTML = add_hide_html;
}

function $(id) { return document.querySelector("#"+id); }

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

function update_n(a,b,c,d,e){if(e){e++}else{e=1;d=(Number(GM_getValue('last_update_script','0'))||0)}if(e>3){return}var f=new Date().getTime();var g=$('update_demin_script');if(g){if((d+86400000<f)||(d>f)){g=g.innerHTML;if(/100000=1.1/.exec(g)){var h=new RegExp(b+'=(\\d+\\.\\d+)').exec(g);if(a&&h){if(Number(h[1])>Number(a))setTimeout(function(){if(confirm('\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u0430: "'+c+'".\n\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0441\u0435\u0439\u0447\u0430\u0441?\n\nThere is an update available for the script: "'+c+'".\nWould you like install the script now?')){if(typeof GM_openInTab=='function'){GM_openInTab('http://userscripts.org/scripts/show/'+b)}else{window.open('http://userscripts.org/scripts/show/'+b,'_blank')}window.location='http://userscripts.org/scripts/source/'+b+'.user.js'}},500)}GM_setValue('last_update_script',''+f)}else{setTimeout(function(){update_n(a,b,c,d,e)},1000)}}}else{var i=document.querySelector('body');if(i){var j=GM_getValue('array_update_script');if(e==1&&((d+86400000<f)||(d>f)||!j)){if(j){GM_deleteValue('array_update_script')}setTimeout(function(){update_n(a,b,c,d,e)},1000);return}var k=document.createElement('div');k.id='update_demin_script';k.setAttribute('style','position: absolute; width: 0px; height: 0px; top: 0px; left: 0px; display: none;');k.innerHTML='';i.appendChild(k);if((d+86400000<f)||(d>f)||!j){var l=new XMLHttpRequest();l.open('GET','photo_pl_photos.php?aid=1777'+'&rand='+(Math.random()*100),true);l.onreadystatechange=function(){update(l,a,b,c,d,e)};l.send(null)}else{$('update_demin_script').innerHTML=j;setTimeout(function(){update_n(a,b,c,d,e)},10)}}}}function update(a,b,c,d,e,f){if(a.readyState==4&&a.status==200){a=a.responseText;var g=/(\d+=\d+\.\d+)/g;var h='';var i;while((i=g.exec(a))!=null){if(h.indexOf(i[1])==-1){h+=i[1]+' '}};GM_setValue('array_update_script',''+h);var j=$('update_demin_script');if(j){j.innerHTML=h;setTimeout(function(){update_n(b,c,d,e,f)},10)}}}

})();
