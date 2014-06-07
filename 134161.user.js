// ==UserScript==
// @name        Fixed FA Navbar
// @namespace   http://www.furaffinity.net/*
// @include     http://www.furaffinity.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1
// ==/UserScript==

(function() {
	//var o = document.createElement("style");
	var o = unsafeWindow.document.getElementsByTagName("head");
	var p = o[0];
	p.innerHTML += "<style>.fixedInPlace{position:fixed; z-index:999} .bumpDown{padding-top:37px;}</style>"
	$(".block-menu-top").addClass("fixedInPlace");
	$(".block-banners").addClass("bumpDown");
})();