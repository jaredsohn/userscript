// ==UserScript==
// @name	Ukryj reklamy - napisy24
// @namespace	http://userscripts.org/scripts/show/115807
// @author	kasper93
// @description	Usuwa reklamy z serwisu napisy24.pl
// @include	http://*napisy24.pl/*
// @require	http://code.jquery.com/jquery.min.js
// @downloadURL	https://userscripts.org/scripts/source/115807.user.js
// @updateURL	https://userscripts.org/scripts/source/115807.meta.js
// @grant	none
// @version	1.1.1
// ==/UserScript==

$("div[class=button] a:contains('sklepjubilerski.com')").closest('div.button').remove();
// $("div[class*=button] a:contains('Premium')").closest('div.button').remove();
$("div[class=title]:contains('sklepjubilerski.com')").closest('div.header_210').remove();
$('A[target="external"][href="http://sklepjubilerski.com/"]').closest('div.lightBlueBox_210').remove(); 
$("div[class=title]:contains('irj.pl')").closest('div.header_210').remove();
$('img[alt="irj.pl"]').closest('div.lightBlueBox_210').remove(); 
$("div[class=title]:contains('Premiery')").closest('div.header_210').next().remove();
$("div[class=title]:contains('Premiery')").closest('div.header_210').remove();
$('div[id=baner_300_250]').closest('div.whiteBox_367').remove();
$('ul#irj').remove();
$('div[id=billboard_728_90]').remove();
$('#container > center').remove();
$('#dotacjeBox').remove();
$('div[id=billboard_700_250]').remove();

// Niewielkie "ścisnięcie" layoutu... Dla chętnych :)
/* 
$('#topLevel').height(135);
$('.podzialStron').css('margin', '0px 0');
$('.podzialStron').children('.innerFooter').css('margin', '0px 0');
$('.padding').css('padding', '10px');
$('#mainLevel > br').remove(); 
*/

// Strasznie wolne i nie potrzebne jak mamy adblocka.
$('div[id*=bmone2]').remove();

// Małe czyszczenie źródła. Nic nie zmienia, ale lepiej się przegląda źródło bez śmieci. 
$('div#navigationLevel > div[style]').remove();
$('script[src*=bbelements]').remove();
$('script[src*=gemius]').remove();
$('style[media=screen]').remove();
