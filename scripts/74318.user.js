// nicoscroll2
// auto scroll to the player object in nicovideo.jp
// -------------------------------------------------------------------
// Version 1.07 (2011-06-20)
// Copyright (c) 2009-2011, itmst
// Contact itmst71@gmail.com
// -------------------------------------------------------------------
// Tested on:
//    Firefox 5.0 + Greasemonkey 0.9.5
//    Firefox 4.0.1 + Greasemonkey 0.9.5
//    Firefox 3.6.17 + Greasemonkey 0.9.5
//    Opera 11.11
//    Google Chrome 12.0.742.100
//    Safari 5.0.5 + SIMBL 0.9.8d + GreaseKit 1.7
//    Safari 5.0.5 + NinjaKit 0.8
//    Sleipnir 2.9.7 + Seahorse 1.1.2
//    Internet Explorer 9.0.8112.16421 + Trixie 0.2.3
//    Internet Explorer 9.0.8112.16421 + IE7Pro 2.5.1
//    Internet Explorer 8.0.6001.18702 + Trixie 0.2.3
//    Internet Explorer 8.0.6001.18702 + IE7Pro 2.5.1
//    Internet Explorer 7.0.5730.13 + Trixie 0.2.3
//    Internet Explorer 7.0.5730.13 + IE7Pro 2.5.1
//    Internet Explorer 6.0.2900.5512 + Trixie 0.2.3
//    Internet Explorer 6.0.2900.5512 + IE7Pro 2.5.1 
// -------------------------------------------------------------------
// ==UserScript==
// @name           nicoscroll2
// @namespace      http://itmst.blog71.fc2.com/nicoscroll2.user.js
// @description    auto scroll to the player object in nicovideo.jp
// @include        http://live.nicovideo.jp/watch/*
// @include        http://www.nicovideo.jp/watch/*
// @version        1.07
// ==/UserScript==

(function(){
	try{
		var
		W = window,
		D = document,
		E = D.documentElement,
		$ = function(x){return D.getElementById(x)},
		P = $("flvplayer_container"),
		F = /^f|2$/.test(D.body.className),
		L = /^l/.test(D.domain),
		I = W.attachEvent && !W.opera,
		t = "offsetTop",
		H = ($("header") || $("PAGEHEADER")).offsetHeight,
		C = ($("all") || $("PAGECONTAINER"))[t],
		T = H + (F ? 0 : C) + (L ? 15 : 0),
		B = ($("WATCHFOOTER") || $("player_btm"))[t] + (I ? C + (L ? H : 0) : 0) - E.clientHeight,
		Y = B < T ? T : B,
		X = E.clientWidth < P.offsetWidth ? P.offsetLeft : 0,
		x = 0,
		y = 0;
		W.scrollTo(X + x, Y + y);
	}catch(e){}
})();