// ==UserScript==
// @name	Draugiem.lv Bez reklāmām (Uzlabots)
// @namespace      Draugiem Ads Free
// @author	Steven Seagal
// @version	1.0
// @include	http://*draugiem.lv/*
// @include	http://*frype.com/*
// @require 	http://ifrype.com//js/jsbase-1.0.0.min.js
// ==/UserScript==

(function() { 

	$('*[class*="adv"]', 'body').remove();
	$('*[class*="Ads"]', 'body').remove();
	$('*[id*="adv"]', 'body').remove();
	$('*[id*="Ads"]', 'body').remove();	
	$('#firstpage_musicbox', 'body').remove();
	$('#lt1 .bx:last-child', 'body').remove();
	$('#hallo24', 'body').remove();
	$('#marquee', 'body').remove();   


}());