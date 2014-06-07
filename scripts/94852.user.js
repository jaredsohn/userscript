// ==UserScript==
// @name           hwm_photo_pl_albums
// @namespace      Demin
// @description    HWM mod - hwm_photo_pl_albums by Demin
// @homepage       http://userscripts.org/scripts/show/94852
// @version        2.00
// @include        http://*heroeswm.*/photo_pl_albums.php*
// @include        http://178.248.235.15/photo_pl_albums.php*
// @include        http://*.lordswm.*/photo_pl_albums.php*
// @include        http://*heroeswm.*/pl_info.php*
// @include        http://178.248.235.15/pl_info.php*
// @include        http://*.lordswm.*/pl_info.php*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2011-2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '2.00';

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

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

if ( location.pathname=='/photo_pl_albums.php' ) {

var all_tr = tag('tr');
var tr_len = all_tr.length;
var tr;
var aid = /photo_pl_photos.php\?aid=(\d+)/;
var foto = /(\d+) \u0444\u043e\u0442\u043e/;
if (url.match('lordswm')) { foto = /(\d+) photo/; }

for (var i=tr_len; i--;) {
tr = all_tr[i];
if ( tr.innerHTML.indexOf("<tr")!=-1 ) {continue;}
	if ( foto.exec(tr.innerHTML) && foto.exec(tr.innerHTML)[1]==0 ) {
	if ( aid.exec(tr.innerHTML) ) {
	tr.style.display = 'none';
	}
	}
}

}

if ( location.pathname=='/pl_info.php' ) {

if ( (tag('body'))[0] ) {
var b = (tag('body'))[0];
var block = 'заблокирован';
if (url.match('lordswm')) { block = 'blocked'; }
var pl_id = /pl_info.php\?id=(\d+)/;
var title = 'Фотоальбомы';
if (url.match('lordswm')) { title = 'Photoalbums'; }

if ( b.innerHTML.indexOf(block)!=-1 && b.innerHTML.indexOf('photo_pl_albums.php')==-1 ) {
var all_a = tag('td');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.innerHTML.indexOf("<td")!=-1 ) {continue;}
	if ( a_i.innerHTML.indexOf("male.gif")!=-1 ) {
	var id = pl_id.exec(url_cur)[1];
	var div = document.createElement('td');
	div.innerHTML = '<a href="photo_pl_albums.php?id='+id+'"><img border=0 src="i/photos.gif" border=0 title="'+title+'" align=right></a>';
	a_i.parentNode.insertBefore(div, a_i);
	break;
	}
}
}
}

}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }
