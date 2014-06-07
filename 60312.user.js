// ==UserScript==
// @name           TwitPic & Yfrog Previewer
// @namespace      http://twitpic.com/
// @description    reviewing twitpic.com/* and yfrog.com/* links on Twitter.
// @include        http://twitter.com/*
// ==/UserScript==
// @author         Alex Beep based on YungSang work
// @version        0.2

(function(window) {
	var jquery_js = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
	var $ = null;

log('start');

	function loadScript(url) {
		var script     = document.createElement('script');
		script.type    = 'text/javascript';
		script.charset = 'utf-8';
		script.src     = url;

		document.getElementsByTagName('head')[0].appendChild(script);
	}

	if (typeof window.jQuery == 'undefined') {
		loadScript(jquery_js);
	}

	var loadCheckTimer = setInterval(function() {
		if (typeof window.jQuery != 'undefined') {
			clearInterval(loadCheckTimer);
			$ = window.jQuery;
			setInterval(check, 1000);
		}
	}, 250);

	function check() {
		$('a[href^=http://twitpic.com]').each(function() {
			if (!this.title) resolve(this);
		});
		
		$('a[href^=http://yfrog.com]').each(function() {
			if (!this.title) resolvey(this);
		});
		
	}

function resolve(a) {
		a.title = 'resolved';
		image = a.href;
		image = image.substr(19);
		if(image!=''){
		image = 'http://twitpic.com/show/thumb/'+image;
		log(image);
		add(image, a);	
		}
}

function resolvey(a) {
		a.title = 'resolved';
		image = a.href;
		image = image+'.th.jpg';
		log(image);
		add(image, a);	
}

function add(url, pn){
	var $img = $('<img />').appendTo(pn.parentNode).attr("src",url).css({
			position: 'absolute',
			top     : '30px',
			left    : 0,
			display : 'none',
			zIndex : 20000,
			border : '3px #fff solid',
	});
	
	$img.css("-moz-box-shadow", "5px 5px 10px #333");
	
	$(pn).hover(function() {
			$img.fadeIn('fast');
		},
		function() {
			$img.fadeOut('fast');
	});

}
	
	
//--============================================================================
//-- Logger
//--============================================================================
	function log(str) {
		if (typeof console != 'undefined') console.log(str);
	}
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);