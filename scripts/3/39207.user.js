// facebook-no-ads: a greasemonkey script that removes ads from facebook.
// Copyright (C) 2008-2009  Giacomo Ritucci
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   1. Redistributions of source code must retain the above copyright notice,
//      this list of conditions and the following disclaimer.
//   2. Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
// OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

// CHANGELOG
//
// version: 0.3.1
// 04/04/2009
// * fix home sponsor div id, changed with the new facebook home.
//
// version: 0.3
// 19/01/2009
// * stretch inbox entries
// * almost complete rewrite using jquery
//
// version: 0.2bis.1
// 30/12/2008
// * remove sponsor box from home page.
//
// version: 0.2bis
// 28/12/2008
// * almost complete rewrite: inspect the inserted node only and not the whole
//   dom.
// * fix ads not removed from error pages.
//
// version: 0.2
// 26/12/2008
// * fix ads not removed from wall-to-wall pages.
//
// version: 0.1
// 25/12/2008


// ==UserScript==
// @name          facebook-no-ads
// @namespace     http://github.com/rjack/facebook-no-ads
// @description   Remove ads from facebook - v0.3.1
// @include       http://*.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==


var f = {
	RUN_DELAY : 1000,
	clock : new Date (),
	context_url : null,
	ads_width : 0,
	content : null,
	touch_string : "touched_lol_83475",

	ads_select : '.profile_sidebar_ads, div.UIStandardFrame_SidebarAds, div.UIWashFrame_SidebarAds, div.UICompatibilityFrame_SidebarAds',
	content_select : '#right_column, div.UIStandardFrame_Content, div.UIWashFrame_Content',
	remove_select : '#home_sponsor_nile',
	timeout : null,


	clear_data : function () {
		this.ads_width = 0;
		this.content = null;
	},


	log : function (msg) {
		if (this.debug)
			GM_log (msg);
	}
}


jQuery.fn.touch = function () {
	return this.each (
		function (i, dom_el) {
			$(this).addClass (f.touch_string);
		});
}


jQuery.fn.touched = function () {
	var almost_one_touched = false;
	this.each (
		function (i, dom_el) {
			if ($(this).is ('.' + f.touch_string)) {
				almost_one_touched = true;
				return false;     // break iteration
			}
		});
	return almost_one_touched;
}



jQuery.fn.stretch = function (increment, property) {
	return this.each (
		function (i, dom_el) {
			var jq = $(dom_el);

			if (!jq.touched ()) {
				var new_prop;
				var old_prop;
				old_prop = jq.css (property);
				if (property == 'background-position') {
					var props = old_prop.split (" ");
					var x = props[0];
					var y = props[1];
					new_prop = (parseInt (x) + parseInt (increment) + 'px');
					new_prop += " " + y;
				} else
					new_prop = (parseInt (old_prop)
						+ parseInt (increment)) + 'px';
				jq.css (property, new_prop);
			}
		})
		.touch();
}



function clean_up (node) {
	var body = $(document.body);

	var ads = null;

	// Visiting new page.
	if (window.location.href != f.context_url) {
		f.context_url = window.location.href;
		f.clear_data ();
	}

	/*
	 * Sidebar ads.
	 */
	ads = node.find (f.ads_select);
	if (ads.length) {
		f.ads_width = ads.css ('width');
		ads.remove ();

		if (f.content && f.content.length)
			f.content.stretch(f.ads_width, 'width');
	}

	/*
	 * Main content.
	 */
	f.content = node.find (f.content_select);
	if (f.content.length && f.ads_width)
		f.content.stretch (f.ads_width, 'width');

	/*
	 * Other elements that must be removed.
	 */
	node.find(f.remove_select).remove();

	/*
	 * Page-specific fixes.
	 */
	if (!f.ads_width)
		return;

	else if (body.is ('.inbox')) {
		$('.subject_wrap, .main_column, .notifications .body, .s_message .s_message_header')
			.stretch (f.ads_width, 'width');
		$('.notifications, .updates_all').stretch (f.ads_width, 'background-position');
	}

	else if (body.is ('.thread'))
		$('.message .body .text, #compose_message .attached_item, .message .attached_item')
			.stretch (f.ads_width, 'width');

	else if (body.is ('.wall'))
		$('#wall, #wall_text').stretch (f.ads_width, 'width');
}


/************************************************************
		      SCRIPT BEGINS HERE
************************************************************/

function run () {
	clean_up ($(document.body));
	document.addEventListener ("DOMNodeInserted",
			function (evt) {
				clean_up ($(evt.relatedNode));
			}, true);
}


function recentlyExecuted () {
	var executed = parseInt (GM_getValue ('executed', '0'));
	var now = f.clock.getTime ();

	if ((executed == undefined)
	    || ((now - executed) > f.RUN_DELAY))
		return false;
	return true;
}


function setRecentlyExecuted () {
	GM_setValue ('executed', String (f.clock.getTime ()));
}


if (!recentlyExecuted ()) {
	setRecentlyExecuted ();
	run ();
}
