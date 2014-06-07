// ==UserScript==
// @name           Short URL Expander
// @namespace      http://www.sukechan.net/
// @description    Expand shortened URLs. 
// @include        *
// @version        1.1
// ==/UserScript==

(function() {
	var apiUrl = 'http://www.longurlplease.com/api/v1.1';
	var urls = new Array();
	var shortUrlsPattern = new RegExp("(^http(s?)://(adjix\.com|b23\.ru|bacn\.me|bit\.ly|bloat\.me|budurl\.com|cli\.gs|clipurl\.us|dwarfurl\.com|ff\.im|fff\.to|href\.in|idek\.net|is\.gd|korta\.nu|lin\.cr|ln\-s\.net|loopt\.us|merky\.de|moourl\.com|nanourl\.se|ow\.ly|peaurl\.com|ping\.fm|piurl\.com|pnt\.me|poprl\.com|reallytinyurl\.com|rubyurl\.com|short\.ie|short\.to|smallr\.com|sn\.vc|snipr\.com|snipurl\.com|snurl\.com|tiny\.cc|tinyurl\.com|tr\.im|tra\.kz|twurl\.cc|twurl\.nl|u\.mavrev\.com|ur1\.ca|url\.az|url\.ie|urlx\.ie|w34\.us|xrl\.us|yep\.it|zi\.ma|zurl\.ws)/[a-zA-Z0-9_-]*)|((^http(s?)://[a-zA-Z0-9_-]+\.notlong\.com)|(^http(s?)://[a-zA-Z0-9_-]+\.qlnk\.net)|(^http(s?)://chilp\.it/[?][a-zA-Z0-9_-]+))[/]?$");
	
	// JSONP Callback Function
	function createNamespace() {
		window.shortURLExpanderUserJs = {
			json_callback: function(r) {
				for(url in r) {
					for(var i = 0, l = this.items.length; i < l; i++) {
						var item = this.items[i];
						if(item.href == url) {
							item.href = r[url];
							if(r[url].length <= 40) {
								item.textContent = r[url];
							} else {
								item.textContent = r[url].substr(0, 30) + '...';
							}
						}
					}
				}
			},
			items: []
		};
	}
	
	var f = function() {
		var x = document.evaluate('//a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; i < x.snapshotLength; i++) {
			var url = x.snapshotItem(i).href;
			if(url.match(shortUrlsPattern)) {
				if((urls.length == 0) && (typeof GM_xmlhttpRequest == 'undefined')) {
					createNamespace();
				} else {
					var items = new Array();
				}
				urls.push(url);
				if(typeof GM_xmlhttpRequest == 'undefined') {
					shortURLExpanderUserJs.items.push(x.snapshotItem(i));
				} else {
					items.push(x.snapshotItem(i));
				}
			}
		}
		if(urls.length > 0) {
			var requestUrl = apiUrl + '?q=' + urls.join('&q=');
			if(typeof GM_xmlhttpRequest == 'undefined') {
				jsonp(requestUrl);
			} else {
				GM_xmlhttpRequest({
					method: 'GET',
					url: requestUrl,
					onload: function(x) {
						var r = eval('(' + x.responseText + ')');
						for(var url in r) {
							for(var i = 0, l = items.length; i < l; i++) {
								var item = items[i];
								if(item.href == url) {
									item.href = r[url];
									if(r[url].length <= 40) {
										item.textContent = r[url];
									} else {
										item.textContent = r[url].substr(0, 30) + '...';
									}
								}
							}
						}
					}
				});
			}
		}
	}
	function jsonp(url) {
	  var s = document.createElement('script');
		s.src = url + '&callback=shortURLExpanderUserJs.json_callback';
		s.charset = 'UTF-8';
		document.body.appendChild(s);
	}
	
	f();
	addFilter(f);
	function addFilter(filter, i) {
		i = i || 4;
		if(window.AutoPagerize && window.AutoPagerize.addFilter) {
			window.AutoPagerize.addFilter(filter);
		} else if(i > 1) {
			setTimeout(arguments.callee, 1000, filter, i -1);
		}
	}
})();