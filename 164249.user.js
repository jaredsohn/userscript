// ==UserScript==
// @name        HQPost
// @namespace   smk
// @include     http://www.2007hq.com/showthread.php*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
(function($) {
	$('[id^=postcount]').each(function() {
		var pid = $(this).attr('id').match(/\d+$/).pop();
		var href = window.location.href.replace(/\#.+$/,'');
		var loc = href.substring(href.lastIndexOf('/')+1,href.length);
		$(this).attr('href', (href.match(/\?p\=/) ? 'showthread.php?p=' + pid : loc + '#post' + pid));
		$(this).attr('target','_self');
	});
})(jQuery);jQuery.noConflict();