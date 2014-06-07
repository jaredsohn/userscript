// -*- coding: utf-8 -*-

// ==UserScript==
// @name        Cybozu Schedule Exporter to Google Calendar
// @namespace   http://straitmouth.jp
// @description Cybozu Schedule Exporter to Google Calendar
// @include     */ag.cgi?page=ScheduleView*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {
    var ymdhms = function (mdhm) {
	    var ymd = [$('input[name="Year"]').val(),
		           $('input[name="Month"]').val(),
		           $('input[name="Day"]').val()];
	    for (var i=0; i<ymd.length; i++) {
	        if (parseInt(ymd[i], 10) < 10) {
		        ymd[i] = '0' + ymd[i];
	        }
	    }
	    
	    if (mdhm) {
	        var a = mdhm.match(/\d+/g);
	        for (i=0; i<a.length; i++) {
		        if (a[i] !== '00' && parseInt(a[i], 10) < 10) {
		            a[i] = '0' + parseInt(a[i], 10);
		        }
	        }
	        
	        if (a.length === 4) {
		        return (ymd.join('') + 'T' + a[2] + a[3] + '00');
	        } else if (a.length === 2) {
		        return (ymd.join('') + 'T' + a[0] + a[1] + '00');
	        } else {
	            return ymd.join('');
            }
	    } else {
	        return ymd.join('');
	    }
    };
    
    var dt = $('th:contains("\u65e5\u6642")').next().text();
    var title = $('th:contains("\u4e88\u5b9a")').next().text();
    var details = $('th:contains("\u30e1\u30e2")').next().text();
    var loc = $('th:contains("\u8a2d\u5099")').next().text();
    
    var gurl = 'http://www.google.com/calendar/event' +
	        '?action=TEMPLATE&sprop=&sprop=name' +
	        '&text=' + encodeURIComponent($.trim(title)) +
	        '&details=' + encodeURIComponent($.trim(details)) +
	        '&location=' + encodeURIComponent($.trim(loc));
    
    if (dt) {
        var spl = dt.split('\uff5e');
        if (spl.length === 2) {
	        gurl += '&dates=' + ymdhms(spl[0]) + '/' + ymdhms(spl[1]);
        } else {
	        gurl += '&dates=' + ymdhms(spl[0]) + '/' + ymdhms(spl[0]);
        }
    } else {  // all day
	    gurl += '&dates=' + ymdhms(false) + '/' + ymdhms(false);
    }
    
    $('<a target="_blank" href="' + gurl + '"><img src="http://www.google.com/calendar/images/ext/gc_button1_ja.gif" /></a>').appendTo($('div[class="menubar"] td:last'));
}());
