// ==UserScript==
// @name           hwm_adv_dd_menu
// @namespace      Demin
// @description    HWM mod - Rasshirennoe vypadajushhee menju (by Demin)
// @homepage       http://userscripts.org/scripts/show/172172
// @version        1.2
// @include        http://*heroeswm.ru/*
// @include        http://178.248.235.15/*
// @include        http://209.200.152.144/*
// @include        http://*lordswm.com/*
// @exclude        */rightcol.php*
// @exclude        */ch_box.php*
// @exclude        */chat*
// @exclude        */ticker.html*
// @exclude        */frames*
// @exclude        */brd.php*
// ==/UserScript==

// (c) 2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )
// (c) 2008, LazyGreg

(function() {

var version = '1.2';


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


var script_num = 172172;
var script_name = "HWM mod - Rasshirennoe vypadajushhee menju (by Demin)";
update_n(version,script_num,script_name);


var pers_id = document.querySelector("li * a[href^='pl_hunter_stat.php?id=']");
if ( pers_id ) {
pers_id = /id=(\d+)/.exec( pers_id )[1];


// ============== PERSONAL LINKS (replaces Chat menu) ================

var replace_chat = false;
//replace_chat = true; // uncomment this line to have chat replaced

var map_change = document.querySelector("li * a[href='map.php']")
//if ( map_change ) { setTimeout(function() { map_change.href = 'map.php?st=sh'; }, 500) } // uncomment this line to have map link replaced

var my_links = []; // REPLACE CHAT MENU
// Insert ANY number of your links below
// better to write them in english or in "translit"
// russian letters must be converted to unicode codes. Here's an utility: 
// http://static.bobrdobr.ru/store/spuntik/cache/1785ad2ca55f214df4bb297318b250bd.html

my_links.push('<a href="pl_info.php?id=15091">Link_1</a>');
my_links.push('<a href="pl_info.php?id=15091">Link_2</a>');
my_links.push('<a href="pl_info.php?id=15091">Link_3</a>');
// etc.

// ===================================================================


if ( location.hostname.match('lordswm') ) {
	var market_wood = 'Wood';
	var market_ore = 'Ore';
	var market_mercury = 'Mercury';
	var market_sulfur = 'Sulfur';
	var market_crystals = 'Crystals';
	var market_gems = 'Gems';
	var market_ecostat = 'Economic statistics';
	var market_lease = 'Artifacts at lease';

	var pers_el_transfer = 'Transfer elements';
	var pers_pl_info = 'Character';
	var pers_pl_transfers = 'Transfer log';
	var pers_pl_warlog = 'Combat log';
	var pers_pl_cardlog = 'Game log';
	var pers_friends = 'Your friends';
	var pers_ephoto_albums = 'Your photos';
	var pers_logout = 'Logout';

	var forum_smiths = 'Smiths and Ench. services';
	var forum_smiths_id = '121';

	var hwm_daily = 'HWM Daily ENG';
	var hwm_daily_href = 'http://daily.heroeswm.ru/newscom.php';
} else {
	var market_wood = '\u0414\u0440\u0435\u0432\u0435\u0441\u0438\u043D\u0430';
	var market_ore = '\u0420\u0443\u0434\u0430';
	var market_mercury = '\u0420\u0442\u0443\u0442\u044C';
	var market_sulfur = '\u0421\u0435\u0440\u0430';
	var market_crystals = '\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B\u044B';
	var market_gems = '\u0421\u0430\u043C\u043E\u0446\u0432\u0435\u0442\u044B';
	var market_ecostat = '\u042D\u043A\u043E\u043D\u043E\u043C. \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430';
	var market_lease = '\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B \u0432 \u0430\u0440\u0435\u043D\u0434\u0435';

	var pers_el_transfer = '\u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432';
	var pers_pl_info = '\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436';
	var pers_pl_transfers = '\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u043F\u0435\u0440\u0435\u0434\u0430\u0447';
	var pers_pl_warlog = '\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0431\u043E\u0435\u0432';
	var pers_pl_cardlog = '\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0438\u0433\u0440';
	var pers_friends = '\u0412\u0430\u0448\u0438 \u0434\u0440\u0443\u0437\u044C\u044F';
	var pers_ephoto_albums = '\u0412\u0430\u0448 \u0444\u043E\u0442\u043E\u0430\u043B\u044C\u0431\u043E\u043C';
	var pers_logout = '\u0412\u044B\u0445\u043E\u0434';

	var forum_smiths = '\u0423\u0441\u043B\u0443\u0433\u0438 \u043A\u0443\u0437\u043D\u0435\u0446\u043E\u0432 \u0438 \u043E\u0440\u0443\u0436.';
	var forum_smiths_id = '22';

	var hwm_daily = '\u0413\u0435\u0440\u043E\u0439\u0441\u043A\u0430\u044F \u043B\u0435\u043D\u0442\u0430';
	var hwm_daily_href = 'http://daily.heroeswm.ru/';
}


// =================== USER VARIABLES ================================

var pers_market = []; // insert after Market in Pers
pers_market.push('<a href="auction.php?cat=res&sort=0&type=1">&nbsp;&nbsp;' + market_wood + '</a>');
pers_market.push('<a href="auction.php?cat=res&sort=0&type=2">&nbsp;&nbsp;' + market_ore + '</a>');
pers_market.push('<a href="auction.php?cat=res&sort=0&type=3">&nbsp;&nbsp;' + market_mercury + '</a>');
pers_market.push('<a href="auction.php?cat=res&sort=0&type=4">&nbsp;&nbsp;' + market_sulfur + '</a>');
pers_market.push('<a href="auction.php?cat=res&sort=0&type=5">&nbsp;&nbsp;' + market_crystals + '</a>');
pers_market.push('<a href="auction.php?cat=res&sort=0&type=6">&nbsp;&nbsp;' + market_gems + '</a>');
pers_market.push('<a href="ecostat.php">' + market_ecostat + '</a>');
pers_market.push('<a href="arts_arenda.php">' + market_lease + '</a>');

var pers_last = []; // insert after ALL in Pers
pers_last.push('<a href="el_transfer.php">' + pers_el_transfer + '</a>');
pers_last.push('<hr>');
pers_last.push('<a href="pl_info.php?id=' + pers_id + '">' + pers_pl_info + '</a>');
pers_last.push('<a href="pl_transfers.php?id=' + pers_id + '">' + pers_pl_transfers + '</a>');
pers_last.push('<a href="pl_warlog.php?id=' + pers_id + '">' + pers_pl_warlog + '</a>');
pers_last.push('<a href="pl_cardlog.php?id=' + pers_id + '">' + pers_pl_cardlog + '</a>');
pers_last.push('<a href="friends.php">' + pers_friends + '</a>');
pers_last.push('<a href="ephoto_albums.php">' + pers_ephoto_albums + '</a>');
pers_last.push('<hr>');
pers_last.push('<a href="logout.php?' + Math.round( Math.random()* 100000 ) + '">' + pers_logout + '</a>');

var map_last = [];
map_last.push('<hr>');
map_last.push('<a href="ecostat.php">' + market_ecostat + '</a>');
//map_last.push('<a href="house_info.php?id=222">\u0414\u043E\u043C</a>');

var forum_sect = []; // insert after existing forum sections
forum_sect.push('<a href="forum_thread.php?id=' + forum_smiths_id + '">' + forum_smiths + '</a>');
//forum_sect.push('<a href="forum_thread.php?id=3">\u0418\u0434\u0435\u0438 \u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F</a>');
//forum_sect.push('<a href="forum_thread.php?id=16">\u0422\u0432\u043E\u0440\u0447\u0435\u0441\u0442\u0432\u043E</a>');
forum_sect.push('<hr>');
forum_sect.push('<a href="' + hwm_daily_href + '">' + hwm_daily + '</a>');

// ===================================================================


var all_li_subnav, elm, par, next_elm, timer;

// pers - market
all_li_subnav = document.querySelector("li * a[href='auction.php']");
if ( all_li_subnav ) {

addEvent( all_li_subnav, "mouseover", function() { if ( timer != false ) timer = setTimeout(function() {
	timer = false;
	all_li_subnav = document.querySelector("li * a[href='auction.php']");
	par = all_li_subnav.parentNode;
	next_elm = all_li_subnav.nextSibling;

	for ( var i=0; i<pers_market.length; i++ ) {
		elm = document.createElement('li');
		elm.innerHTML = pers_market[i];
		par.insertBefore(elm, next_elm);
	}
}, 500) } );

addEvent( all_li_subnav, "mouseout", function() { if ( timer ) clearTimeout(timer); } );

}

// pers - last
all_li_subnav = document.querySelector("li * a[href='transfer.php']");
if ( all_li_subnav ) {
par = all_li_subnav.parentNode;
next_elm = all_li_subnav.nextSibling;

for ( var i=0; i<pers_last.length; i++ ) {
	elm = document.createElement('li');
	elm.innerHTML = pers_last[i];
	par.insertBefore(elm, next_elm);
}
}

// map - last
all_li_subnav = document.querySelector("li * a[href^='map.php?'][href*='st=hs']");
if ( all_li_subnav ) {
par = all_li_subnav.parentNode;
next_elm = all_li_subnav.nextSibling;

for ( var i=0; i<map_last.length; i++ ) {
	elm = document.createElement('li');
	elm.innerHTML = map_last[i];
	par.insertBefore(elm, next_elm);
}
}

// forum_sect
all_li_subnav = document.querySelector("li * a[href='forum.php#t1']");
if ( all_li_subnav ) {
par = all_li_subnav.parentNode;
next_elm = all_li_subnav.nextSibling;

for ( var i=0; i<forum_sect.length; i++ ) {
	elm = document.createElement('li');
	elm.innerHTML = forum_sect[i];
	par.insertBefore(elm, next_elm);
}
}


// replaceChatMenu - my_links
if ( replace_chat && my_links.length>0 ) {

	all_li_subnav = document.querySelector("li * a[href='frames.php']");
	if ( all_li_subnav ) {
		all_li_subnav.parentNode.innerHTML = '<font color="f5c137">&nbsp;<b>Links</b>&nbsp;</font>';

		all_li_subnav = document.querySelectorAll("li * a[href^='frames.php']");
		for ( var i=1; i<all_li_subnav.length; i++ ) {
			par = all_li_subnav[i].parentNode;
			par.parentNode.removeChild(par);
		}

		var remove_par = all_li_subnav[0].parentNode;

		par = remove_par.parentNode;
		next_elm = remove_par.nextSibling;

		for ( var i=0; i<my_links.length; i++ ) {
			elm = document.createElement('li');
			elm.innerHTML = my_links[i];
			par.insertBefore(elm, next_elm);
		}

		remove_par.parentNode.removeChild(remove_par);
	}
}


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

function update_n(a,b,c,d,e){if(e){e++}else{e=1;d=(Number(GM_getValue('last_update_script','0'))||0)}if(e>3){return}var f=new Date().getTime();var g=$('update_demin_script');if(g){if((d+86400000<f)||(d>f)){g=g.innerHTML;if(/100000=1.1/.exec(g)){var h=new RegExp(b+'=(\\d+\\.\\d+)').exec(g);if(a&&h){if(Number(h[1])>Number(a))setTimeout(function(){if(confirm('\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u0430: "'+c+'".\n\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0441\u0435\u0439\u0447\u0430\u0441?\n\nThere is an update available for the script: "'+c+'".\nWould you like install the script now?')){window.open('http://userscripts.org/scripts/show/'+b,'_blank');window.location='http://userscripts.org/scripts/source/'+b+'.user.js'}},500)}GM_setValue('last_update_script',''+f)}else{setTimeout(function(){update_n(a,b,c,d,e)},1000)}}}else{var i=document.querySelector('body');if(i){var j=GM_getValue('array_update_script');if(e==1&&((d+86400000<f)||(d>f)||!j)){if(j){GM_deleteValue('array_update_script')}setTimeout(function(){update_n(a,b,c,d,e)},1000);return}var k=document.createElement('div');k.id='update_demin_script';k.setAttribute('style','position: absolute; width: 0px; height: 0px; top: 0px; left: 0px; display: none;');k.innerHTML='';i.appendChild(k);if((d+86400000<f)||(d>f)||!j){var l=new XMLHttpRequest();l.open('GET','photo_pl_photos.php?aid=1777'+'&rand='+(Math.random()*100),true);l.onreadystatechange=function(){update(l,a,b,c,d,e)};l.send(null)}else{$('update_demin_script').innerHTML=j;setTimeout(function(){update_n(a,b,c,d,e)},10)}}}}function update(a,b,c,d,e,f){if(a.readyState==4&&a.status==200){a=a.responseText;var g=/(\d+=\d+\.\d+)/g;var h='';var i;while((i=g.exec(a))!=null){if(h.indexOf(i[1])==-1){h+=i[1]+' '}};GM_setValue('array_update_script',''+h);var j=$('update_demin_script');if(j){j.innerHTML=h;setTimeout(function(){update_n(b,c,d,e,f)},10)}}}

})();
