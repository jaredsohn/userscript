// ==UserScript==
// @name           Malaysiakini
// @namespace      http://www.libcoffee.net
// @description    Automatically logs in to Malaysiakini if credentials were saved,  show all comments, hides most of the advertisements and obstructing sidebars to improve readability, and enables the Google Gears beta feature.
// @include        http://www.malaysiakini.com/news/*
// @include        http://www.malaysiakini.com/columns/*
// @author         Jerry Chong <zanglang@gmail.com>
// @version        2010-02-26
// @license        Creative Commons Attribution-Share Alike 3.0
// ==/UserScript==

(function() {
	var $ = unsafeWindow.jQuery, google = unsafeWindow.google;
	// auto login
	if ($('#LOGINFORM2').length && $('#u').val()) {
		unsafeWindow.MkiniLogin(1);
		return;
	}
	// hide junk
	$('#menubase,#col2,#col3,[id^=BANNER]').hide();
	
	// readjust widths for easier reading
	$('#col1').css('width', '100%');
	$('#body').css('width', '80%');
	unsafeWindow.adjust_font2(1);
	
	// enables hidden offline gears support - check for Gears first
	if (google && google.gears &&
		google.gears.factory.hasPermission === false)
		// force reload the enabler scripts
		$.getScript('http://www.malaysiakini.com/beta/jquery.cookie.js',
			function() {
				$.cookie('BETA-CACHE', '1');
				$.getScript('http://www.malaysiakini.com/beta/gg-inside.js');
			});
	
	// adjust comments
	unsafeWindow.viewcomment();
	$('#com_layer').css({
		border: 'none',
		width: '',
		height: ''
	});
	
	function addStyle(css) {
		$('head:eq(0)').append('<style type="text/css">' + css + '</style>');
	}
	addStyle('.kcomments li div.content {width: 100%;}');
	addStyle('.kcomments li .icon {display:none;}');
	addStyle('.kcomments li {width: 67%;border-bottom:none;margin-bottom:2em;}');
}());
