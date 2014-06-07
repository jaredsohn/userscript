// ==UserScript==
// @name           Anti "like to show"
// @namespace      http://tothimre.homelinux.net/svn
// @description    "Oszd meg a linket Facebookon, hogy láthasd a képet" c. faszságok eltüntetése
// @author         Tóth Imre
// @copyright      (C) 2013  Tóth Imre
// @include        http://szilvasbukta.com/post/*
// @include        http://napivicc.com/*-kepek/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version        1.2
// @svn-id         $Id: Anti like to show.user.js 5 2013-02-05 16:12:13Z tothimre $
// ==/UserScript==

var loc = window.location.href;

if (loc.match(/szilvasbukta\.com\/post/)) {
	$("#mutat").remove();
	$("#rejtett").show();
	$("#slider").remove();	// beúszó reklám
	$('img[src$="facebook_fekvo.png"]').parent().parent().remove();	// Csatlakozz hozzánk Facebook-on
} else if (loc.match(/napivicc.com\/.+-kepek/)) {
	if ($("meta[http-equiv=refresh]").length)	// meta refresh ellen
		$(window).bind("beforeunload", function() { return "Kattints a maradás az oldalon gombra!"; });
	var div = $("div[id^=post-] div.entry");
	div.find("> a:first").remove();
	div.find("div[id^=div]").show();
	$("#browseratfooter_background").remove();	// alsó ad
}
