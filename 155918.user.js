// ==UserScript==
// @name           FetLife Event to Google Calendar
// @namespace      scruffynerf
// @description    Adds an export to Google Calendar link to Fetlife event pages.
// @include        http://fetlife.com/events/*
// @include        https://fetlife.com/events/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @version        1.0
// ==/UserScript==
// original author: drtalon.wordpress.com
// 2013.01.07 uploaded working version to share with FL friends, includes my timezone bugfix.
// 2012.04.01 cleaned up errors in location handling
// 2012.03.31 initial version
// Parts of Fetlife event versions handling thanks to http://userscripts.org/scripts/review/105867
var loc = '', add = '';
var lo = $('[itemprop=location]')[0];
if ( lo ) {
    loc = lo.textContent.replace(/^\s+|\s+$/g,'');
    if ( $(lo).parents().children('span') 
      && $(lo).parents().children('span')[1] ) {
        add = $(lo).parents().children('span')[1].textContent.split("\n")[1].replace(/^\s+|\s+$/g, '');
    }
}
var ev = {};
ev.start = formatDateV2( $('[itemprop=startDate]').attr('content') );
ev.end = formatDateV2( $('[itemprop=endDate]').attr('content') );
ev.name = $('[itemprop=name]')[0].textContent;
ev.location = [loc, add].join(', ');
ev.details = window.location.href;
var btn = '<a class="xs q tdn" href=' + formatGoogleURL(ev) + ' target="_blank">Add to Google Calendar</a>';
$(btn).insertAfter($('[itemprop=startDate]').parent());
function formatDateV2(dt) {
    return new Date( Date.parse(dt.replace(' ','T').replace('Z','')) );
}
function formatGoogleDate(d) {
    function pad(n){return n<10 ? '0'+n : n}
	return '' + d.getUTCFullYear() 
	          + pad(d.getUTCMonth() + 1) 
		  + pad(d.getUTCDate()) 
		  + 'T' 
		  + pad(d.getUTCHours()) 
		  + pad(d.getUTCMinutes()) 
		  + '00';
}
function formatGoogleURL(ev) {
    return 'http://www.google.com/calendar/event?action=TEMPLATE&dates=' 
         + formatGoogleDate(ev.start) + '/' + formatGoogleDate(ev.end)
	 + '&text=' + encodeURIComponent(ev.name)
	 + (ev.details ? '&details=' + encodeURIComponent(ev.details) : '')
	 + (ev.location ? '&location=' + encodeURIComponent(ev.location) : '')
	 + '&sprop=website:fetlife.com';
}