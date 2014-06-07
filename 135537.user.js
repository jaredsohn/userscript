// ==UserScript==
// @name           Plurk 噗通 v0.5
// @namespace      http://citytalk.tw/bbs/22156
// @downloadURL    http://citytalk.tw/compress.php?cache=t&sc=ct_plugin_putong_FFPlugin.js
// @include        http://www.plurk.com/*
// author: clark(update) Babymaple(my)(tw)	楓葉寶寶  babymaple@gmail.com  Tureki(my)(tw)  烏龜	tureki11@gmail.com 	克拉克	haubarclack@gmail.com 	
// @version        0.500
// ==/UserScript==

var timestamp = new Date().getTime();
var main = document.createElement('script');
main.type = 'text/javascript';
main.src= 'http://citytalk.tw/plugin_plurk_index.js?'+timestamp;

function GM_wait(){
	if(typeof document.getElementById("pane_plurk") == 'undefined') {
		setTimeout(GM_wait,3000);
	} else {
		document.body.appendChild(main);
	}
}

setTimeout(GM_wait,3000);