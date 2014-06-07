// ==UserScript==
// @name			Planetside 2 thread corrector
// @namespace		http://enclaveoilrig.com
// @description		Makes reading the PS2 thread on SA tolerable, sort of
// @version			0.6
// @include			http://forums.somethingawful.com/showthread.php?*
// @include			http://forums.somethingawful.com/newreply.php?*
// @require			http://code.jquery.com/jquery-latest.js
// @require			https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// ==/UserScript==

$(".postbody, textarea").each(function() {
	$(this).replaceText(/esf/gi, "MPAC");
	$(this).replaceText(/magrider/gi, "maglev autism chariot");
	$(this).replaceText(/annihilator/gi, "autism chariot murdering tube");
	$(this).replaceText(/sunderer/gi, "peasant wagon");
	$(this).replaceText(/sundy/gi, "peasant wagon");
	$(this).replaceText(/burster maxes/gi, "angry laborers");
	$(this).replaceText(/ a burster max/gi, " an angry laborer");
	$(this).replaceText(/burster max/gi, "angry laborer");
});
