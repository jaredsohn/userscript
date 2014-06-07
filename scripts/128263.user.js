// ==UserScript==
// @name        Lotro RU website for Linux
// @description Lotro RU website repair in linux-based browsers
// @author      VeleslaV
// @version     1.3
// @homepage    http://userscripts.org/scripts/show/128263
// @updateURL   https://userscripts.org/scripts/source/128263.meta.js
// @include     http://www.lotro-russia.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

// ============================================================================

$(document).ready(function(){
	$('.portal-headline').css({'display': 'none'});
	$('td.leftmenu_submenu div.left_submenu table td a').css({'font-size': '10px'});
});
