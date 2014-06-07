// ==UserScript==
// @name           hwm_trans_nick
// @namespace      Demin
// @description    HWM mod - Set link & nick for transfer (by Demin)
// @homepage       http://userscripts.org/scripts/show/95540
// @version        3.1
// @include        http://*heroeswm.ru/*
// @include        http://178.248.235.15/*
// @include        http://209.200.152.144/*
// @include        http://*lordswm.com/*
// ==/UserScript==

// (c) 2011-2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

(function() {

var version = '3.1';


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


var script_num = 95540;
var script_name = "HWM mod - Set link & nick for transfer (by Demin)";
update_n(version,script_num,script_name);

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';


if ( url_cur.match('pl_info.php') )
{

if ( url.match('lordswm') ) {
	var string = 'Transfer&nbsp;resources';
	var string2 = 'Transfer&nbsp;elements';
} else {
	var string = '\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c&nbsp;\u0440\u0435\u0441\u0443\u0440\u0441\u044b';
	var string2 = '\u041f\u0435\u0440\u0435\u0434\u0430\u0442\u044c&nbsp;\u044d\u043b\u0435\u043c\u0435\u043d\u0442\u044b';
}

	var el = document.querySelector("a[href^='sms-create.php?mailto=']");
	item_name = /mailto=([^&]+)/.exec( el.href );
	if ( item_name ) {
		span = document.createElement('span');
		span.innerHTML = '<br>&nbsp;&nbsp;<a href=transfer.php?nick=' + item_name[1] + ' style="text-decoration: none;">' + string + '</a>/';
		span.innerHTML += '<a href=el_transfer.php?nick=' + item_name[1] + ' style="text-decoration: none;">' + string2 + '</a>';
		el.parentNode.insertBefore( span, el.nextSibling );
	}
}


if ( url_cur.match('transfer.php') )
{
	item_name = /nick=([^&]+)/.exec( url_cur );
	if ( item_name ) {
		gold_trans = /gold=(\d+)/.exec( url_cur );
		desc_trans = /desc=([^&]+)/.exec( url_cur );
		var els = document.getElementsByTagName('input');
		for( var i = 0; i < els.length; i++ ) {
			var el = els[i];
			if( el.name == 'nick' && el.type == 'text' ) {
				el.value = urlDecode( item_name[1] );
			}
			else if( el.name == 'gold' && el.type == 'text' ) {
				if ( gold_trans ) el.value = gold_trans[1];
			}
			else if( el.name == 'desc' && el.type == 'text' ) {
				if ( desc_trans ) el.value = urlDecode( desc_trans[1] );
			}
		}

		var all_a = document.querySelector("a[href='el_transfer.php']");
		if ( all_a ) {
			all_a.href += '?nick=' + item_name[1];
		}
	}
}


function urlDecode(string) {
	var codes = '%E0%E1%E2%E3%E4%E5%B8%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF';
	codes += '%C0%C1%C2%C3%C4%C5%A8%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%20';
	codes = codes.split('%');
	var chars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	chars += 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ';
	for (var i=0; i<codes.length; i++) string = string.split('%'+codes[i+1]).join(chars[i]);
	return string;
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
