// ==UserScript==
// @name			NoBrighter
// @description		Change element's background color that is too bright to a light green.
// @author			henix
// @version			20140512-1
// @include			http://*
// @include			https://*
// @exclude			http://boards.4chan.org/*
// @exclude			https://boards.4chan.org/*
// @updateURL		http://userscripts.org/scripts/source/138275.user.js
// @license			MIT License
// @grant			none
// ==/UserScript==

/**
 * ChangeLog:
 *
 * see https://github.com/henix/userjs/commits/master/NoBrighter.js
 *
 * 2013-12-4	henix
 * 		changeTransparent should be called on <html> tag, because it can set background-color. fix #1
 * 		Provided other colors, you can uncomment them to use. The number after them is brightness.
 *
 * 2013-6-17	henix
 * 		The latest version of TamperMonkey don't support "*", change to "http://*" and "https://*"
 *
 * 2012-8-16	henix
 * 		Change transparent body only when in top frame.
 *
 * 		There could be a transparent iframe in a dark parent frame, in which case the old logic will do wrong.
 *
 * 2012-7-19	henix
 * 		Remove prependSheet because it may clash with <body bgcolor="XX">
 *
 * 2012-7-15	henix
 *		Exclude boards.4chan.org
 *
 *		Because users could choose their own style from 4chan which loads after NoBrighter
 *
 * 2012-7-14	henix
 * 		Add changeTransparent()
 *
 * 2012-7-14	henix
 * 		Use css stylesheet to set body's default background-color
 *
 * 2012-7-12	henix
 * 		Version 0.1
 */

// ========== Config ========== //

// Uncomment to use, number after is its brightness

/* Green */
// var targetColor = '#C7EDCC'; // 93
var targetColor = '#C1E6C6'; // 90

/* Wheat */
// var targetColor = '#E6D6B8'; // 90
// var targetColor = '#E3E1D1'; // 89

var Brightness_Threshold = 0.94; // a number between 0 and 1

// For websites updating their contents via ajax, NoBrighter can run in background and convert background color periodically.
var longRunSites = [
	'mail.google.com',
	'docs.google.com',

	'twitter.com',
	'github.com',

	'www.coursera.org',
	'class.coursera.org',

	'weibo.com',
	'www.weibo.com',
	'www.renren.com',

	'feedly.com',
	'reader.aol.com',
];

// ========== End of config ========== //

/**
 * String -> Bool
 */
function isTransparent(color) {
    return color === 'transparent' || color.replace(/ /g, '') === 'rgba(0,0,0,0)';
}

function changeBgcolor(elem) {
	if (elem.nodeType !== Node.ELEMENT_NODE) {
		return;
	}
	var bgcolor = window.getComputedStyle(elem, null).backgroundColor;
	if (bgcolor && !isTransparent(bgcolor)) {
		var arRGB = bgcolor.match(/\d+/g);
		var r = parseInt(arRGB[0], 10);
		var g = parseInt(arRGB[1], 10);
		var b = parseInt(arRGB[2], 10);

		// we adopt HSL's lightness definition, see http://en.wikipedia.org/wiki/HSL_and_HSV
		var brightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 255 / 2;

		if (brightness > Brightness_Threshold) {
			elem.style.backgroundColor = targetColor;
		}
		return true;
	} else {
		return false;
	}
}

function changeTransparent(elem) {
	var bgcolor = window.getComputedStyle(elem, null).backgroundColor;
	if (!bgcolor || isTransparent(bgcolor)) {
		elem.style.backgroundColor = targetColor;
	}
}

var alltags = document.getElementsByTagName("*");

var bodyChanged = false;

function changeAll() {
	var len = alltags.length;
	for (var i = 0; i < len; i++) {
		var changed = changeBgcolor(alltags[i]);
		var tagName = alltags[i].tagName.toUpperCase();
		if (changed && (tagName === "BODY" || tagName === "HTML")) {
			bodyChanged = true;
		}
	}
}
changeAll();

if (window.top == window) {
	// change transparent only when in top frame
	if (!bodyChanged) {
		changeTransparent(document.body.parentNode);
	}
}

for (var i = 0; i < longRunSites.length; i++) {
	if (location.hostname === longRunSites[i]) {
		console.info('make NoBrighter runs forever...');
		setInterval(changeAll, 2000); // convert every 2s
		break;
	}
}

/*document.body.addEventListener('DOMNodeInserted', function(e) {
	changeBgcolor(e.target);
}, false);*/
