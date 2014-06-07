// ==UserScript==
// @name          AutoSPNT
// @version       1.0
// @namespace     http://www.designfox.org
// @description	  Clicks Skip Pass and No Thanks on Surveys
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include       https://plus.google.com/*
// @include       http://plus.google.com/*
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// @include       https://docs.google.com/*
// @include       http://docs.google.com/*
// @include       https://picasaweb.google.com/*
// @include       http://picasaweb.google.com/*
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       http://www.google.com/calendar/*
// @include       http://*
// @include       *
// ==/UserScript==

var links = document.querySelectorAll('input[alt="Skip"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="No Thanks"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="Pass"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

}