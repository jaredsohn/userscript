// ==UserScript==
// @name          Geocaching.com easy logging smileys
// @namespace     Zentriple
// @description	  The script makes it much easier to add smileys to your logs on geocaching.com
// @include       http://geocaching.com/seek/log*
// @include       http://www.geocaching.com/seek/log*
// @grant         none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://rangyinputs.googlecode.com/svn/trunk/jquery_plugin.js
// @downloadURL   https://userscripts.org/scripts/source/160910.user.js
// @updateURL     https://userscripts.org/scripts/source/160910.meta.js
// @version       2013.3.6
// ==/UserScript==

(function() {

	// CSS (jQuery) selector
	var textarea_element = $('.PostLogList #ctl00_ContentBody_LogBookPanel1_uxLogInfo');

	$(textarea_element).after('<div id="easy_logging_smileys">\
	\
	<span><img alt="[:)]" src="http://www.geocaching.com/images/icons/icon_smile.gif"> smile</span>\
	<span><img alt="[:(]" src="http://www.geocaching.com/images/icons/icon_smile_sad.gif"> frown</span>\
	<span><img alt="[:D]" src="http://www.geocaching.com/images/icons/icon_smile_big.gif"> big smile</span>\
	<span><img alt="[8)]" src="http://www.geocaching.com/images/icons/icon_smile_shy.gif"> shy</span>\
	<span><img alt="[8D]" src="http://www.geocaching.com/images/icons/icon_smile_cool.gif"> cool</span>\
	<span><img alt="[:O]" src="http://www.geocaching.com/images/icons/icon_smile_shock.gif"> shocked</span>\
	<span><img alt="[:I]" src="http://www.geocaching.com/images/icons/icon_smile_blush.gif"> blush</span>\
	<span><img alt="[:(!]" src="http://www.geocaching.com/images/icons/icon_smile_angry.gif"> angry</span>\
	<span><img alt="[:P]" src="http://www.geocaching.com/images/icons/icon_smile_tongue.gif"> tongue</span>\
	<span><img alt="[xx(]" src="http://www.geocaching.com/images/icons/icon_smile_dead.gif"> dead</span>\
	<span><img alt="[}:)]" src="http://www.geocaching.com/images/icons/icon_smile_evil.gif"> evil</span>\
	<span><img alt="[|)]" src="http://www.geocaching.com/images/icons/icon_smile_sleepy.gif"> sleepy</span>\
	<span><img alt="[;)]" src="http://www.geocaching.com/images/icons/icon_smile_wink.gif"> wink</span>\
	<span><img alt="[:X]" src="http://www.geocaching.com/images/icons/icon_smile_kisses.gif"> kisses</span>\
	<span><img alt="[:o)]" src="http://www.geocaching.com/images/icons/icon_smile_clown.gif"> clown</span>\
	<span><img alt="[^]" src="http://www.geocaching.com/images/icons/icon_smile_approve.gif"> approve</span>\
	<span><img alt="[B)]" src="http://www.geocaching.com/images/icons/icon_smile_blackeye.gif"> black eye</span>\
	<span><img alt="[V]" src="http://www.geocaching.com/images/icons/icon_smile_dissapprove.gif"> disapprove</span>\
	<span><img alt="[8]" src="http://www.geocaching.com/images/icons/icon_smile_8ball.gif"> eightball</span>\
	<span><img alt="[?]" src="http://www.geocaching.com/images/icons/icon_smile_question.gif"> question</span>\
	\
	</div>');

	$("#easy_logging_smileys span").css({
		'display'  : 'inline-block',
		'overflow' : 'hidden',
		'width'    : '95px',
		'height'   : '18px',
		'cursor'   : 'pointer'
	}).click(function() {
		$(textarea_element).replaceSelectedText( $(this).children("img").attr("alt") );
		$(textarea_element).focus();
		$(this).fadeOut(0);
		$(this).fadeIn(800);
	});

	// Hide the old "Insert smilie" link
	$(".PostLogList dt small.NoBolding a").hide();

})();
