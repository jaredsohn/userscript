// ==UserScript==
// @name           Force language (english) on android market
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @namespace      doo
// @include        https://market.android.com/*
// @include        http://market.android.com/*
// ==/UserScript==

var forcedLanguage = "en";

if ($("#user-locale").length != 0 && $("#user-locale option:selected").val() != forcedLanguage && window.location.href.indexOf("hl="+forcedLanguage) == -1){
	var newLoc = window.location.href.replace(/&?hl=../, "");
	newLoc += (newLoc.indexOf("?") != -1 ? "&" : "?") + "hl="+forcedLanguage;

	window.location = newLoc;
}