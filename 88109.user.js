// ==UserScript==
// @name           GoDaddy Auto "No Thanks!" for Renewals
// @namespace      com.godaddy.nothanks
// @include        https://www.godaddy.com/*
// @include        http://www.godaddy.com/*
// ==/UserScript==

// ==/UserScript==
// Add jQuery
var gmjq;
var jQuery;

function startCheck() {
	if (typeof unsafeWindow.jQuery == 'undefined') {

		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
		GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://code.jquery.com/jquery-1.4.2.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
		//GM_Head.insertBefore(css, GM_Head.firstChild);
	}
	GM_wait();
}


function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		unsafeWindow.$ = gmjq = unsafeWindow.jQuery.noConflict();
		var loc = String(document.location);
		runThatShit();
	}
}

function runThatShit() {
	gmjq("body").hide();
	var l = gmjq("a img").filter(function() {
		var ret = false;
		ret = (/no thanks/i).test( gmjq(this).attr('title') );
		if(ret==false) ret = (/no thanks/i).test( gmjq(this).attr('alt') );
		return ret;

	});

	if(l.length>0) {
		var o1 = gmjq(l[0]);
		var o2 = o1.parent();
		o2.css("background-color","#f00");
		var ahref = o2.attr("href");

		if(ahref.indexOf("http")>-1) {

			document.location = ahref;
		} else {
			o2.click();
		}
	} else {

		gmjq("body").each(function(){
			gmjq(this).show();
		});

	}
}

(function(){ setTimeout(startCheck,10); })();