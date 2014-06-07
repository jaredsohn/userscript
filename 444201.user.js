// ==UserScript==
// @name 		   maa social playdom
// @version        1.0
// @description	   ?
// @compability    ?
// @author		   ?
// @require        http://code.jquery.com/jquery-latest.min.js
// @include        http://actiongames.playdom.com/games/avengers/*
// @grant          GM_addStyle
// @grant          GM_getResourceText
// @grant          GM_setValue
// @grant          GM_getValue
// @run-at		   document-end
// ==/UserScript==


$j=jQuery.noConflict();

$j(document).ready(function($){
	var simClick = function(e) {
	  var evt = document.createEvent("MouseEvents");
  		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  		e.dispatchEvent(evt);      
	} ;
	var actionClick = function() {
		$.each($('div[class*="unclicked"] a[class*="action-link"]'), function(i, e) {
			setTimeout(function() {
				simClick(e);
			}, 200 + 1000*i) ;
		}) ;	
	} ;
	
	setInterval(actionClick , 10000);
}) ;

