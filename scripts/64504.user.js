// ==UserScript==
// @name           Plurk_to_GoogleCalendar
// @namespace      http://wiselysong.blogspot.com
// @description    Plurk_to_GoogleCalendar
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/_comet/*
// @exclude        http://www.plurk.com/User/*
// @exclude        http://www.plurk.com/i18n/*
// @exclude        http://www.plurk.com/static/*
// ==/UserScript==

// Plurk_to_GoogleCalendar ( http://userscripts.org/scripts/edit_src/64504 )
// version 0.3 
// Base on MaxChu's ( http://userscripts.org/users/maxchu ) RePlurk ( http://userscripts.org/scripts/show/39186 )
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// == History ==
// 2009-12-19 v0.3: fix details content to avoid "Request-URI Too Large" problem.
// 2009-12-19 V0.2: add keyword [P2GC] for Google Calendar search
// 2009-12-18 V0.1: first version

// == Add jquery == //
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
	}
}

GM_wait();

var uw = unsafeWindow;
var p = uw.Plurks;
var o_expand;

if(p) {
	o_expand = p.expand;
	p.expand = function(div) {
		o_expand(div);
		var ib = $('#form_holder').get(0);
		if(ib) {
			var plurk = uw.getPD(div).obj;
			var link = 'http://plurk.com/p/' + (plurk.plurk_id).toString(36);
			var raw = plurk.content_raw;
			var owner_id = plurk.owner_id;
			var posted = plurk.posted;
			var qualifier = plurk.qualifier;
			var info_box = $(uw.$dp.info_box);
			var pp = info_box.children(".perma_link");
			if(info_box.children("#to_gc").length == 0) {
				var to_google_calendar = $('<div id="to_gc">Sync to <a href="#">GCalendar</a><div>').css('float','left').css('left-padding','3px').click(function(){
					to_GC(owner_id,qualifier,raw,posted,link);
				});
				pp.after(to_google_calendar);
			}
		}
	}
}

//convert 0~9 => 00~09 
function LZ(x) {return(x<0||x>9?"":"0")+x}

//googlecalendar event publisher
function to_GC(owner_id,qualifier,raw,posted,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;
	var display_name = uw.SiteState.getUserById(owner_id).display_name;
	var datetime = posted.getUTCFullYear() + '' + LZ(posted.getUTCMonth()+1) + '' + LZ(+posted.getUTCDate()) + 'T' + LZ(posted.getUTCHours()) + '' + LZ(posted.getUTCMinutes()) + '' + LZ(posted.getUTCSeconds()) + 'Z';
    var text = encodeURIComponent( display_name + ' ' + qualifier + ': ' + raw + '') ;
	var location = link ;
	var details = encodeURIComponent( display_name + ' ( http://www.plurk.com/' + nick + ' )<br>Plurk_URL : ' + link + '<br>by [P2GC]') ;
	var url='http://www.google.com/calendar/event?action=TEMPLATE&text=' + text + '&dates=' + datetime + '/' + datetime + '&location=' + location + '&sprop=website:plurk.com&sprop=name:Plurk&details=' + details + '&trp=false';
	window.open(url);
}