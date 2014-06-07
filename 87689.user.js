// ==UserScript==
// @name           Autoscroll
// @namespace      http://xaviesteve.com
// @description    Scrolls the page automatically
// @include        http*://*
// @version        1.0
// ==/UserScript==


GM_registerMenuCommand("Autoscroll", function() {

	speed = prompt("Select speed (10 fast, 2000 slow)", "100");


	t_on = function() {t_out = setTimeout(t_exe, speed);}
	t_off = function() {clearTimeout(t_out);}
	t_exe = function() {
		window.scrollBy(0,1);
		t_on();
	}
	
	t_on();
	
});