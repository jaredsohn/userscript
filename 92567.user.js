// ==UserScript==
// @name		hwm_map_refresh
// @namespace		Demin
// @description		HWM mod - hwm_map_refresh (by Demin)
// @homepage		http://userscripts.org/scripts/show/92567
// @version		1.04
// @include		http://*heroeswm.*/map.php*
// @include		http://178.248.235.15/map.php*
// @include		http://173.231.37.114/map.php*
// @include		http://*freebsd-help.org/map.php*
// @include		http://*heroes-wm.*/map.php*
// @include		http://*hommkingdoms.info/map.php*
// @include		http://*hmmkingdoms.com/map.php*
// @include		http://*герои.рф/map.php*
// @include		http://*.lordswm.*/map.php*
// @include		http://*.heroeswm.*/forum_thread.php?id=10
// ==/UserScript==

// (c) 2010-2011, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

// http://*.heroeswm.*/pl_info.php?*

var version = '1.04';

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';


var scripts = tag('script');
var Timeout1;
var check = 0;

for (var i=scripts.length; i--;) {
if (scripts[i].innerHTML.indexOf("setTimeout")!=-1 ) {
	if (scripts[i].innerHTML.indexOf("Delta=")!=-1 ) {
		Timeout1 = scripts[i].innerHTML.split("\n")[1].replace(/.*Delta=(\d+).*/, "$1");
		if (Timeout1 < 35) { check = 1; }
	}
	else {
	check = 1;
//	alert("hwm_map_refresh does not work on the current page!");
	}
}
}

if ( check == 0 ) {
setTimeout(function() { window.location=url_cur; }, 34000);
}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }
