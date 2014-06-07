// ==UserScript==
// @name           GuideToJapanese Ruby Converter
// @namespace      http://wiiaboo.com/
// @include        http://www.guidetojapanese.org/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  //$(".popup").each(function () {$(this).replaceWith("<ruby><rbc><rb>" + $(this).text() + "</rb></rbc><rtc><rt>" + $(this).attr("title").split(" - ")[0] + "</rt></rtc><rtc><rt>" + $(this).attr("title").split(" - ")[1] + "</rt></rtc></ruby>");})
  $(".popup").each(function () {$(this).replaceWith("<ruby><rb>" + $(this).text() + "</rb><rp>(</rp><rt>" + $(this).attr("title").split(" - ")[0] + "</rt><rp>)</rp></ruby>");})
}