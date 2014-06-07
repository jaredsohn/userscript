// ==UserScript==
// @name           hwm_shortcuts_to_host
// @namespace      Demin
// @description    HWM mod - Shortcuts to host (by Demin)
// @homepage       http://userscripts.org/scripts/show/123829
// @version        1.04
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.04';

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

if ( (tag('body'))[0] ) {

var check_a = 0;

var all_a = tag('a');
var a_len = all_a.length;
for (var i=0; i < a_len; i++) {
	var a_i = all_a[i];
	if ( a_i.parentNode.innerHTML.match(/class=.?pi.?/) ) {

	check_a += 1;
	if ( check_a > 20 ) { break; }

	if ( a_i.href.indexOf(url)==-1 && !a_i.href.match(/daily\.heroeswm/) && ( a_i.href.match(/heroeswm\./) || a_i.href.match(/178\.248\.235\.15/) ) ) {
	var regexp_sp = /(^http:\/\/[A-Za-z\.]+\/)/.exec(a_i.href)[1];
	all_a[i].href = a_i.href.split(regexp_sp).join(url);
}
}
}

}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }
