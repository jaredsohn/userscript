// slashdot-more-readable.user.js
// Release 0.0.8 - using newest jQuery (1.7.1), simplified jQuery code
// Release 0.0.7 - restricted to slashdot.org/story/*, last statement / jquery chain less aggressive
// Release 0.0.6 - pretty-printed, +1 include 
// Release 0.0.5 - agressively try to delete all parts of comment threads/trees that contain no funny or interesting scores (>= 4 )
// Release 0.0.4 - Regexes as vars; only highlight Informative comments if score >= 4
// Release 0.0.3 - hide() span elements more radically
// Release 0.0.2 - no $ var
// Release 0.0.1 - adapted jquery init code from other userscripts
// 
// $Id: slashdot-more-readable.user.js 125 2011-12-04 17:03:50Z knut $
// Copyright 2010 knb
//
// ==UserScript==
// @name          SlashdotMoreReadable
// @namespace     knbknb.greasemonkey.org/
// @description   Make some slashdot comments more readable... by giving "scored" comment-labels a custom background-color, e.g. Funny => red, Insightful => limegreen. Delete lots of unfunny/uninteresting comment text.
// @include       http://*.slashdot.org/story/*
// @include       http://slashdot.org/story/*
// ==/UserScript==
var jQy;
// Add jQuery
function importJs(url) {
	var script = document.createElement('script');
	script.src = url;
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
}
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');

// Check if jQuery is loaded
function jQueryWait() {
	if (typeof unsafeWindow.jQuery === 'undefined') {
		window.setTimeout(jQueryWait, 100);
	} else {
		// some other userscript may manipulate slashdot page with jQuery,
		// so assign to this global var instead of $ variable

		jQy = unsafeWindow.jQuery;

		main();

	}
}
jQueryWait();

// Here comes the main function, called by jQueryWait ;-)
function main() {
	// aggressively delete all spans that are not comment-scores
	// jQy("span").not(jQy("[id^=comment_score]")).hide();

	// set bgcolors of funny comments or comments with score labels >= 4,
	// and give thema new class named "notewo", noteworthy
	var funny = new RegExp("Funny");
	var minscore = new RegExp("4|5");
	var qualif = new RegExp('Informative|Insightful|Interesting');

	var spans = jQy("span.score"); // .has("span.opt");

	spans.filter(function() {
		return minscore.exec(jQy(this).text())
	}).filter(function() {
		return qualif.exec(jQy(this).text())
	}).css('background-color', 'limegreen');
	spans.filter(function() {
		return funny.exec(jQy(this).text())
	}).css('background-color', 'tomato');

	// agressively remove text from all div and p elements that are NOT
	// noteworthy
	// might fail at the end of long threads.

	/*
	 * jQy("*[id^='commtree']")
	 * .find("p[id^=comment_body_],div[id^=comment_body_]") .not(".notewo")
	 * .css('display', "none");
	 */
}
