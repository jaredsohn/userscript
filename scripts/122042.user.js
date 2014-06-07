// ==UserScript==
// @name          Postillon-HMNW-Filter
// @version       0.3.1
// @namespace     http://userscripts.org/scripts/show/122042
// @description   Filtert die nervigen HMNW-Kommentare aus den Postillion-Kommentaren raus ;D
// @include       http://www.der-postillon.com/*
// @scriptsource  http://userscripts.org/scripts/source/122042.user.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
/**
 * Postillon-HMNW-Filter
 * by Klamann
 * 
 * released under a Creative Commons License: CC BY-SA 3.0
 * see https://creativecommons.org/licenses/by-sa/3.0/
 * 
 * Changelog
 * http://userscripts.org/topics/97975
 * 
 * If you like this script, please leave a comment at
 * http://userscripts.org/scripts/show/122042
 */

/** This regex is used to filter the text contents */
var regex = new RegExp("((man|ihr|h(ä|ae)tte).*(man|ihr|redaktion|schreiber|hmnw|h(ä|ae)tte).*(warten|aushalten) (k(oe|ö)nnen))|((er weniger)|((geschmack|piet(ae|ä)ts)los|tsch(ue|ü)ss).*(weniger|mehr))|(bis.*(to(t|d)|verwest|storben) (bi(n|st)|ist|sind|seid|war|gewesen))","i");

/** Some CSS, used by the HMNW-Filter-Notification */
var globalcss = "div.hmnw-sign{border:1px solid black;margin:9px 3px;padding:9px;line-height:1;border-radius:10px 5px 10px 5px;box-shadow:1px 1px 2px rgba(0,0,0,0.4);background:#f6f6f6;background:-moz-linear-gradient(20deg,#f6f6f6,#eee);font-size:10pt;font-family:sans-serif;}div.hmnw-sign>p{display:inline;vertical-align:middle;}a.close,a.toggle{float:right;width:18px;height:18px;text-align:center;text-decoration:none;font-weight:bold;font-size:12pt;color:white;background:#f7634d;background:-moz-linear-gradient(20deg,#f77b68,#f7634d);border:1px solid black;border-radius:3px;margin-right:3px;margin-top:-2px;}";

/** Launcher */
$(document).ready(function() {
	initcss();
	filtercomments();
});

/**
 * Write the global css contents into the document header.
 */
function initcss() {
	var css = document.createElement('style');
	css.type = 'text/css';
	css.textContent = globalcss;
	document.getElementsByTagName("head")[0].appendChild(css);
}

/**
 * Crawl all comments and filter those matching the regex.
 * Each filtered comment will be replaced by a notification-bar,
 * indication that the comment has been filtered, with buttons
 * to view the filtered comment and to hide it entirely (at least
 * until the next reload)
 */
function filtercomments() {
	
	var comments = $('div.comment-thread');
	
	$("div.avatar-image-container", comments).each( function(i) {
		
		var text = $('p.comment-content:first', $(this).next()).text();
		
		if((text.length < 500) && regex.test(text)) {
			
			// hmnwsign
			$(this).before('<div class="hmnw-sign"><p>Dieser Post wurde ausgeblendet durch den <a href="http://userscripts.org/scripts/show/122042">HMNW-Filter</a>.</p> <a class="close" href="#" onclick="return false;" title="Post verstecken">×</a> <a class="toggle" href="#" onclick="return false;" title="Post einblenden">▼</a>');
			
			// variables
			var li = $(this).parent();
			var avatar = $(this);
			var message = $(avatar).next();
			var hmnwSign = $('div.hmnw-sign', li);
			var toggleButton = $('a.toggle', hmnwSign);
			
			// initial changes
			avatar.hide();
			message.hide();
			li.css({"margin-bottom":"0", "padding":"0"});
			li.prev().css({"margin-bottom":"0", "padding-bottom":"0"});
			
			// show/hide
			$('a.toggle', hmnwSign).click(function () {
				if(avatar.is(":visible")) {
					li.css({"margin-bottom":"0"});
					toggleButton.text("▼");
					toggleButton.prop('title', 'Post einblenden');
				} else {
					li.css({"margin-bottom":"30px"});
					toggleButton.text("▲");
					toggleButton.prop('title', 'Post ausblenden');
				}
				avatar.slideToggle(300);
				message.slideToggle(300);
			});
			
			// "remove" post
			$('a.close', hmnwSign).click(function () {
				hmnwSign.fadeOut();
				avatar.fadeOut();
				message.fadeOut();
			});
		}
	});
	
}