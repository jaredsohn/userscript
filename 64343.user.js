// ==UserScript==
// @name           Narod.Disk no captcha
// @description    Get direct links wihtout captcha
// @namespace      http://nobodyzzz.dontexist.org/
// @include        http://narod.ru/disk/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @version        0.0.1
// ==/UserScript==

$(document).ready(function() {
	//hide ads
	$("div.b-banner-up").hide();
	//hide captcha
	$("div.b-get-link").hide();
	$.ajaxSetup({
		beforeSend: function(req) {
			req.setRequestHeader("User-Agent", "Firefox/3.5.1 YB/4.2.0")
		}
	});
	$("div.b-download-info").load(window.location.toString() + " p.direct-link-");

});

