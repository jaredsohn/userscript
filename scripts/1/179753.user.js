// ==UserScript==
// @name           Amazon Cloud Player Enhancements
// @namespace      http://www.danielslaughter.com/
// @author         Daniel Slaughter
// @include        http*://*amazon.com/gp/dmusic/mp3/*
// @match          http://www.amazon.com/gp/dmusic/mp3/*
// @match          https://www.amazon.com/gp/dmusic/mp3/*
// @icon           http://www.danielslaughter.com/projects/amazoncloudplayer/icon_32x32.png
// @description    Adds Last.fm scrobbling support as well as other optional features.
// ==/UserScript==

var o = {
	interval: 250, // How often to check for page load. Default: 250 (1/4 second)
	max: 15000, // How long to check for page load. Default: 15000 (15 seconds)
	domain: location.protocol + '//' + location.hostname, // ie.: https://www.amazon.com
	protocol: location.protocol + '//', // Used for secure connections. ie.: https://
	version: '4/5/2011', // Script version number used to check for updates
	path: location.pathname, // leave this alone; it's used to determine if you're on a valid player page or not
	total: 0,
	pk: '8481956cd857e9525956cd8716b52595', // Private key unique to each individual download of this file. Do not change this!
	amazonid: null,
	init: function () {
		var el = document.body;
		o.total += o.interval;
		if (el) {
			if (unsafeWindow && unsafeWindow.amznMusic && unsafeWindow.amznMusic.customerId) {
				o.amazonid = unsafeWindow.amznMusic.customerId;
				o.buffer.request(
					o.protocol + 'www.danielslaughter.com/projects/amazoncloudplayer/stable/core.php?version=' + o.version + '&pk=' + o.pk + '&amazonid=' + o.amazonid,
					function (r) {
						o.core = eval(r.responseText);
						o.core.init();
					}
				);
			} else {
				o.buffer.request(
					o.protocol + 'www.amazon.com/gp/dmusic/mp3/player',
					function (r) {
						var temp = document.createElement('div');
						temp.innerHTML = r.responseText;
						temp = temp.getElementsByTagName('script');
						for(var i=0;i<temp.length;i++) {
							if (temp[i].innerHTML && temp[i].innerHTML.match(/customerId/gi)) {
								o.amazonid = temp[i].innerHTML.substr(temp[i].innerHTML.indexOf('customerId = \'')+14,temp[i].innerHTML.length).split('\'')[0];
								break;
							}
						}
						o.buffer.request(
							o.protocol + 'www.danielslaughter.com/projects/amazoncloudplayer/stable/core.php?version=' + o.version + '&pk=' + o.pk + '&amazonid=' + o.amazonid,
							function (r) {
								o.core = eval(r.responseText);
								o.core.init();
							}
						);
					},
					'GET'
				);
			}
		} else if (o.total < o.max) {
			window.setTimeout(o.init,o.interval);
		}
		return this;
	},
	buffer: {
		request: function (pUrl,pFunc,pMethod) {
			pMethod = pMethod || 'GET';
			if (!o.buffer.url) {
				// the buffer is empty, so push it onto the request
				o.buffer.url = pUrl;
				o.buffer.func = pFunc;
				o.buffer.method = pMethod;
				window.setTimeout(o.buffer.start,0);
			} else {
				// the buffer is full (max 1), wait 10ms and try again
				window.setTimeout(function(){o.buffer.request(pUrl,pFunc,pMethod)},10);
			}
		},
		start: function () {
			if (o.buffer.url != null) {
				if (o.buffer.url.indexOf(o.domain) >= 0 || navigator.userAgent && navigator.userAgent.indexOf('Firefox') >= 0) {
					// same domain or Firefox. We're keeping FF using this so it'll remain a secure connection.
					if (typeof GM_xmlhttpRequest == 'function') {
						GM_xmlhttpRequest({
						    method: o.buffer.method,
						    url: o.buffer.url,
							onload: function(response) {
								o.buffer.func(response);
							}
						});
					}
				} else {
					// cross domain, my method only supports GET (right now); this is needed because Chrome doesn't like using GM_xmlhttpRequest
					var el = document.createElement('script');
					el.id = 'pop3-cross-domain';
					el.setAttribute('src',o.buffer.url + '&inject=pop3-cross-domain');
					el.addEventListener('load',function() {
						var response = {
							responseText: this.innerHTML
						};
						o.buffer.func(response);
						this.parentNode.removeChild(this);
					},true);
					document.body.appendChild(el);
				}
				o.buffer.url = null;
			}
		},
		url: null,
		func: null,
		method: null
	}
};
o.init();