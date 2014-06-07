// monkeyFly for Greasemonkey
// release 10-8-8 19:05:40
// 2009-10-10 first release
// author egoing, @egoing, egoing.net
// addon GUID 03b2b49d-07cc-415e-8ed7-1cbaf4c9092b
// ==UserScript==
// @name monkeyfly
// @namespace http://monkeyfly.egoing.net/
// @description Tuning your Twitter
// @include http://twitter.com/*
// @include https://twitter.com/*
// @exclude http://twitter.com/login
// @exclude https://twitter.com/login
// @exclude https://twitter.com/signup
// @exclude http://twitter.com/signup
// @exclude http://twitter.com/invitations
// @exclude https://twitter.com/invitations
// @exclude http://twitter.com/settings
// @exclude https://twitter.com/settings
// ==/UserScript==
function main(){
	try{
		var win = (typeof jQuery != "undefined") ? window : unsafeWindow;
	} catch(e){
		win = window;	
	}	
	if(!win.jQuery(document.body).hasClass('monkeyfly')){
		if(win.jQuery != undefined){
			(function($) {
				this.supported = true;
				if (typeof localStorage == 'undefined')
					this.supported = false;
				else
					var ls = localStorage;
				
				this.setItem = function(key, value, lifetime) {
					if (!this.supported)
						return false;
	
					ls.setItem(key, value);
				};
	
				this.getItem = function(key) {
					if (!this.supported)
						return false;
	
					return ls.getItem(key);
				};
	
				this.removeItem = function(key) {
					if (!this.supported)
						return false;
	
					ls.removeItem(key);
					return true;
				};
	
				$.localStorage = this;
				
				var srcURL = 'http://monkeyfly.egoing.net/';
				var seed = Math.random()*100;
				
				$('head').append('\
					<script type="text/javascript"> \
						var srcURL = 		"'+srcURL+'"; \
						var seed = 			"'+seed+'"; \
					</script>');
				
				var debug = false;
				if(location.href.indexOf('debug=debug')>-1)
					debug = true;
				
				var expired = false;
				if(location.href.indexOf('expired=expired')>-1)
					expired = true;
				
				if (debug || !this.supported) {
					loadRemote();
				} else if (!expired && $.localStorage.getItem('mf_version') && $.localStorage.getItem('mf_script') && $.localStorage.getItem('mf_style')) {
					insert($.localStorage.getItem('mf_script'), $.localStorage.getItem('mf_style'));
					$.ajax({
						url:srcURL + 'version.php?callback=?&' + seed,
						dataType:'jsonp',
						success:function(version) {
							if (version != $.localStorage.getItem('mf_version')) {
								var new_version = version;
								$.ajax({
									url:srcURL + 'updater.php?callback=?&' + seed,
									dataType:'jsonp',
									contentType:'jsonp',
									success:function(data) {
										$.localStorage.setItem('mf_version', new_version, 5000);
										$.localStorage.setItem('mf_script', data.script, 5000);
										$.localStorage.setItem('mf_style', data.style, 5000);
									}
								});
							}
						}
					})
				} else {
					$.ajax({
						url:srcURL + 'version.php?callback=?&' + seed,
						dataType:'jsonp',
						success:function(version) {
							var new_version = version;
							$.ajax({
								url:srcURL + 'updater.php?callback=?&' + seed,
								dataType:'jsonp',
								contentType:'jsonp',
								success:function(data) {
									$.localStorage.setItem('mf_version', new_version, 5000);
									$.localStorage.setItem('mf_script', data.script, 5000);
									$.localStorage.setItem('mf_style', data.style, 5000);
									insert(data.script, data.style);
								}
							});
						}
					})
				}
				
				function insert(script, style) {
					$('head').append('<script type="text/javascript">' + script + '</script>');
					$('head').append('<style type="text/css" rel="stylesheet" media="screen">' + style + '</style>');
				}
				
				function loadRemote() {
					$('head').append('<script type="text/javascript" src="' + srcURL + 'twitter.js?'+seed+'"/>');
					$('head').append('<link type="text/css" rel="stylesheet" media="screen" href="' + srcURL + 'twitter.css?'+seed+'"/>');
				}
			})(win.jQuery)
		}
	}
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);