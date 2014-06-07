// Twitter Activity Honestifier

// ==UserScript==
// @name          Twitter Activity Honestifier
// @description   Changes Twitter brand new "Activity" tab name for what some people use it to.
// @author        David Lima Cohen
// @namespace     http://twitter.com/lima/status/144074125852418049
// @icon          http://twitter.com/favicon.ico
// @date          2011-12-5
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {
	$('.stream-tab-activity a').text('Stalk').attr('title', 'Stalk');
})();