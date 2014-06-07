// ==UserScript==
// @name           hwm_add_diamond
// @namespace      Demin
// @description    HWM mod - Add diamond by Demin
// @homepage       http://userscripts.org/users/263230/scripts
// @version        1.00
// @include        http://*heroeswm.*/*
// @include        http://178.248.235.15/*
// @include        http://*lordswm.*/*
// @include        http://*герои.рф/?15091
// @exclude        http://daily.heroeswm.ru/*
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.00';

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

var diamond = "100,500";

var title = "\u0411\u0440\u0438\u043b\u043b\u0438\u0430\u043d\u0442\u044b";
if (url.match('lordswm')) { title = "Diamonds"; }

if ( tag('body')[0] ) {

var els = tag('embed');
var nick = "";
for( var i = 0; i < els.length; i++ ) {
var el = els[i];
if( el.src.match( /heart.swf/ ) ) {
var vs = el.getAttribute( "FlashVars" ).split('|');
if (vs[3]) { nick=vs[3]; break; }
}
}

if ( nick!="" ) {

var all_a = tag('td');
var a_len = all_a.length;
for (var i=0; i<a_len; i++) {
	if ( all_a[i].innerHTML.indexOf("<td")!=-1 ) {continue;}
	if ( all_a[i].innerHTML.indexOf("gem.gif")!=-1 ) {
	if ( all_a[i+2].innerHTML.indexOf("diamond.gif")!=-1 ) {

all_a[i+3].innerHTML = diamond;

	} else {

var diamond_td = document.createElement('td');
diamond_td.setAttribute('height', '24');
diamond_td.setAttribute('width', '24');
diamond_td.innerHTML = '<img border=0 width=24 height=24 alt="" src="i/diamond.gif" title="'+title+'">';
all_a[i].parentNode.appendChild(diamond_td);
var diamond_td2 = document.createElement('td');
diamond_td2.innerHTML = diamond;
all_a[i].parentNode.appendChild(diamond_td2);

	}
	break;
	}
}

}
}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }
