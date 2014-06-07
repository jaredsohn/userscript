// ==UserScript==
// @name        48 Comments Only
// @namespace   http://akr.tw/
// @version     1.3.10
// @description Extract comments posted by AKB48 on Google+. Feel free to enjoy the interactions between members.
// @icon        https://s3.amazonaws.com/uso_ss/icon/120097/large.png
// @author      Ming-Hsien Lin (akiratw)
// @license     MIT License
// @downloadURL https://userscripts.org/scripts/source/120097.user.js
// @updateURL   https://userscripts.org/scripts/source/120097.meta.js
// @include     https://plus.google.com/*
// @exclude     https://plus.google.com/*_/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==
var loc = window.location,
	reCheck = /^\/(?:channel|user|show)\/[A-Za-z0-9_-]*$/,
	reSearch = /^\?(?:tab|annotation_id|feature)=.*$/;

loc.search || loc.hash ? testUselessSearch() : check();

function testUselessSearch() {
	reSearch.test(loc.search) ? loc.search = "" : null;
	
	loc.search === "" ? check() : null;
}

function check() {
	loc.pathname === "/" ? loc.replace("feed/subscriptions/u") : null;
	reCheck.test(loc.pathname) ? loc.replace(loc + "/videos") : null;
}
