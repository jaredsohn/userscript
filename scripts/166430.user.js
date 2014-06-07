// ==UserScript==
// @name           hwm_battle_time
// @namespace      Demin
// @description    HWM mod - Prodolzhitel'nost' bitvy i kartochnoj igry (by Demin)
// @homepage       http://userscripts.org/users/263230/scripts
// @version        1.2
// @include        http://*heroeswm.ru/war*
// @include        http://*heroeswm.ru/cgame*
// @include        http://178.248.235.15/war*
// @include        http://178.248.235.15/cgame*
// @include        http://209.200.152.144/war*
// @include        http://209.200.152.144/cgame*
// @include        http://*lordswm.com/war*
// @include        http://*lordswm.com/cgame*
// ==/UserScript==

// (c) 2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

var version = '1.2';


var time_begin_b = new Date().getTime();
var title_b = document.title;

update_title(time_begin_b, title_b);

function update_title(time_begin_b, title_b) {
	var ct = Math.floor( ( new Date().getTime() - time_begin_b ) / 1000 );
	var dh = Math.floor( ct / 3600 ) % 24;
	var dm = Math.floor( ct / 60 ) % 60;
	var ds = ct % 60;

	document.title = ( (dh > 0) ? dh+':' : '' ) + ( (dh > 0 && dm < 10) ? '0' : '' ) + dm + ':' + ( (ds < 10) ? '0' : '' ) + ds + ' ' + title_b;

	setTimeout(function() { update_title(time_begin_b, title_b); }, 999);
}
