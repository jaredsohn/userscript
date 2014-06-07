// ==UserScript==
// @name           hwm_destroy_green_arrow
// @namespace      Demin
// @description    HWM mod - Udalenie zelenoj strelki obuchenija na mladshih urovnjah (by Demin)
// @homepage       http://userscripts.org/scripts/show/425686
// @version        1.1
// @include        http://*heroeswm.ru/*
// @include        http://178.248.235.15/*
// @include        http://209.200.152.144/*
// @include        http://*lordswm.com/*
// ==/UserScript==

// (c) 2014, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

(function() {

var version = '1.1';


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


var script_num = 425686;
var script_name = "HWM mod - Udalenie zelenoj strelki obuchenija na mladshih urovnjah (by Demin)";
update_n(version,script_num,script_name);

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';


var hide_rep = 1;

if ( document.head && document.querySelector("div[id*='arrows_']") ) {

if ( location.pathname=='/home.php' && hide_rep == 1 ) {
	var flash_rep = document.querySelector("object > param[value*='rep'][value*='.swf']");
	if ( flash_rep ) flash_rep.parentNode.parentNode.removeChild( flash_rep.parentNode );
}

// http://www.heroeswm.ru/i/arrows_left.png http://www.heroeswm.ru/i/arrows_right.png http://www.heroeswm.ru/i/arrows_up.png http://www.heroeswm.ru/i/arrows_down.png

function inj_152() {
var divs_152 = document.querySelectorAll("div[id*='arrows_']");
var dd_152;
for ( var i=divs_152.length; i--; ) {
	if ( dd_152 = /(\d+)/.exec(divs_152[i].id) ) {
		dd_152 = dd_152[1];
		window["tutorial_arrow_Refresh"+dd_152] = function () {}
		window["tutorial_arrow_hide_show"+dd_152] = function () {}
		divs_152[i].style.background = "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==')";
		divs_152[i].style.display = "none";
	}
}
}

var elem = document.createElement('script');
elem.type = "text/javascript";
elem.innerHTML = inj_152.toString()+"inj_152()";
document.head.appendChild(elem);

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
