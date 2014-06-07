// ==UserScript==
// @name           BigFarm
// @namespace      http://horror-of-darkness.com/happyfarm.htm
// @description    BigFarm (Version 0.1.0)
// @include        http://fbfarm*.elex-tech.us/myfarm/facebook*
// @include        http://apps.facebook.com/farmgame_tw/*
// @include        http://apps.facebook.com/happyharvest/*
// @exclude        http://apps.facebook.com/*?mod=*
// @version        0.1.0
// ==/UserScript==

// == History ==
// 2009-10-30 V0.1.0 add game menu and facebook bottom bar
// 2009-10-28 V0.0.3 add shortcut icon
// 2009-10-26 V0.0.1~V0.0.2 first version

// == Add jquery == //

if (typeof contentWindow != 'undefined') {
	unsafeWindow = contentWindow; // google chrome
} else if (typeof unsafeWindow != 'undefined') {
	// firefox
} else {
	unsafeWindow = window; // opera + safari?
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict( true );
		letsJQuery();
	}
}

GM_wait();

function letsJQuery() {
	if ( /apps.facebook.com/i.test(window.location) ) {
		// fading Effect
		var fadingIn = function() {
			$(this).fadeTo("fast", 1);
		};

		var fadingOut = function() {
			$(this).fadeTo("normal", 0);
		}

		// Replace Top Menu
		var menuCss = {
			position: 'fixed',
			top: 0,
			left: 0,
			'z-index': 1
		};
		$('.toggle_tabs')
		.css(menuCss)
			
		.fadeTo("normal", 0)
		.hover( fadingIn , fadingOut )

		.prepend('<li><a href="http://www.facebook.com/">Facebook</a></li>')

		$('#fb_menu_logout')
		.appendTo('.toggle_tabs')
		.removeClass()
		$('#menubar_container').empty();

		// Make bottom bar auto hide
		$('#presence')
		.fadeTo("normal", 0)
		.hover( fadingIn , fadingOut )

		// Resize and reposition iframe
		var ifmCss = {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		}

		$('iframe').filter(function(index) {
			return $(this).get(0).offsetHeight > 300 && $(this).get(0).offsetWidth > 300;
		})
		.css(ifmCss)
			.parents().css('overflow', 'hidden')
		.end();
	} else {
		// Remove Advertisements.
		$('p').css('margin', 0);
		$('img').css('display', 'none');

		// Resize Boxes
		var cssObj = {
			'width' : '100%',
			'height' : '100%',
			'overflow' : 'hidden'
		};

		if ($.browser.mozilla) {
			// For Firefox
			$('object, embed').parents().andSelf().css(cssObj);
			$("param[name='wmode']").val('Opaque');
			$('embed').attr('wmode', 'Opaque');
		} else {
			// Chrome, Opera
			var flashvars = unsafeWindow.flashvars;
			var params = unsafeWindow.params;
			var attributes = unsafeWindow.attributes;
			$(params).attr('wmode', 'Opaque');

			unsafeWindow.swfobject.embedSWF("http://img.harvest.6waves.com/farmgame_tw/static/v7/facebook_tw.swf?6.2", "myfarm", "100%", "100%", "9.0.46", null, flashvars, params, attributes);
			$('object, embed').parents().css(cssObj);
		}

		// Title & Shortcut Icon
		//document.title = "Happy Harvest";
		//$('head').append('<link rel="shortcut icon" href="http://photos-d.ak.fbcdn.net/photos-ak-sf2p/v43/231/82716374139/app_2_82716374139_4443.gif" />');
	}
}
