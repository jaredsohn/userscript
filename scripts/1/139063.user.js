// ==UserScript==
// @name        Cleanup From Hell
// @description Removes the productivity destroying links to older posts from posts as well as fixes some usability annoyances.
// @author      raina
// @updateURL   https://userscripts.org/scripts/source/139063.meta.js
// @downloadURL https://userscripts.org/scripts/source/139063.user.js
// @namespace   http://userscripts.org/users/315152
// @include     http://clientsfromhell.net/*
// @version     1.3.1
// @released    2012-11-27
// @grant       none
// @icon data:image/png;base64,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
// ==/UserScript==

// The site uses jQuery, so we might as well
var main = function () {
	// This is the original productivity increase hack. Remove links to old posts I've already
	// read but can still waste a whole day of work on.
	$('.post-content > p a').each(function() {
		$(this).replaceWith($(this).html());
	});
	
	// Buh-bye Hellobar! Taking up vertical screen estate on a laptop screen is one thing but
	// drawing attention to yourself with animation after I minimize you, unforgivable.
	// This one doesn't currently seem to be active. Left here for historic purposes and future paranoia.
	$('#hellobar-wrapper').remove();
	
	// A timed newsletter popup every visit, really? No means no. And no, your cookie check
	// is obviously not a) enough, b) working.
	$('.fancybox').remove();
	$('.fancybox-wrap').remove();
	$('#fancybox-overlay').remove();
	$('#psdisaster').remove();
};

// Inject main function as a script block on the page,
// as stackoverflow.com user fudgey taught us.
// http://stackoverflow.com/a/8890387
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
