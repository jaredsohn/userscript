// ==UserScript==
// @name           erepublik_hide_health_kit_btn
// @description    
// @autor          Botherlong
// @include        http://www.erepublik.com/en/military/battlefield/*
// @version        0.02
// ==/UserScript==

var version = "v0.02";
var gameServer = top.location.host;
var current_url = window.location.href;
var sh = document.getElementById('header').getElementsByTagName('a')[0].getAttribute('href');

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { $j = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	setInterval(function() {
		var health_kit = document.getElementById('pvp_actions').getElementsByTagName('a');
		for(var i=0; i< health_kit.length; i++) {		
			if(health_kit[i].getAttribute('class') == 'health_kit_btn') health_kit[i].setAttribute('style','display:none');
		}
	}, 500);
}
