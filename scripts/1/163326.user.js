// ==UserScript==
// @name 			Eksisozluk "herzamanki gorunum" 2014.
// @description 	Herzamanki gorunum tusuna sizin yerinize tıklar..
// @copyright 		2013+, Volkan K.
// @require 		http://code.jquery.com/jquery-latest.min.js
// @include 		http://sourtimes.org/*
// @include 		http://*.sourtimes.org/*
// @include 		http://eksisozluk.com/*
// @include 		http://*.eksisozluk.com/*
// @include 		http://sourtimes.org.nyud.net/*
// @include 		http://*.sourtimes.org.nyud.net/*
// @include 		http://eksisozluk.com.nyud.net/*
// @include 		http://*.eksisozluk.com.nyud.net/*
// @include 		https://sourtimes.org/*
// @include 		https://*.sourtimes.org/*
// @include 		https://eksisozluk.com/*
// @include 		https://*.eksisozluk.com/*
// @include 		https://sourtimes.org.nyud.net/*
// @include 		https://*.sourtimes.org.nyud.net/*
// @include 		https://eksisozluk.com.nyud.net/*
// @include 		https://*.eksisozluk.com.nyud.net/*
// @version			1.3
// @run-at 			document-end
// ==/UserScript==

if (document.getElementById('return-to-innocence')) {
	setTimeout(function(){document.getElementById('return-to-innocence').click();},1000)
}

this.$ = this.jQuery = jQuery.noConflict(true);

var remove_list=".ad-medyanet, .ad-bannerside300, .ads, .ad-theme-visual-inner, .sponsored, .reklamac, *[id*='admedia'], *[id*='medyanet'], *[src*='admedia'], *[src*='medyanet'], *[src*='/ads/']";
parent_suspects=jQuery(remove_list).parent();
jQuery(remove_list).remove();
parent_suspects.filter(":empty").remove();
