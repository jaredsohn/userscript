// ==UserScript==
// @name           Twitter decode Tinyurl
// @namespace      http://d.hatena.ne.jp/os0x/
// @include        http://twitter.com/*
// @include        http://twitread.ss-o.net/*
// @version        0.4
// ==/UserScript==

// based on tinyurltooltip (http://d.hatena.ne.jp/ono_matope/20071022#1193049261)

(function(window,loaded){
	if (!loaded && (this.chrome || this.XPCNativeWrapper)) {
		var fn = '(' + arguments.callee.toString() + ')(this,true);';
		var script = document.createElement('script');
		script.appendChild(document.createTextNode(fn));
		document.body.appendChild(script);
		return;
	}
	var SHORT = false;
	var MAX_URL_LENGTH = 50;
	var filters=[];
	if (!window.TwitterDecodeTinyURL) {
		window.TwitterDecodeTinyURL = {};
		window.TwitterDecodeTinyURL.addFilter = function(f) {
			filters.push(f);
		};
	}
	function $x(xpath, node) {
		node || (node = document);
		var res = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0, l = res.snapshotLength, ret = []; i < l; i++) ret.push(res.snapshotItem(i));
		return ret;
	}
	function addFilter(filter) {
		if (window.AutoPagerize) init();
		else window.addEventListener('GM_AutoPagerizeLoaded',init,false);
		window.addEventListener('AutoPatchWork.DOMNodeInserted', function(e){filter(e.target);}, false);
		window.addEventListener('AutoPagerize_DOMNodeInserted', function(e){filter(e.target);}, false);

		function init(){
			window.AutoPagerize.addFilter(function(docs) {docs.forEach(filter);});
		}
	}
	var decode = function(link,url){
		link.setAttribute("title",url);
		link.setAttribute("href",url);
		if (SHORT) {
			link.textContent = url.substr(0,23);
		} else {
			link.textContent = '';
			//url = decodeURIComponent(url);
			var tinyurlstr = [];
			for (var i = 0,len = Math.ceil(url.length / MAX_URL_LENGTH); i < len ;i++) {
				tinyurlstr.push(url.substr(MAX_URL_LENGTH * i, MAX_URL_LENGTH));
			}
			tinyurlstr.forEach(function(_url){
				link.appendChild(document.createTextNode(_url));
				link.appendChild(document.createElement('wbr'));
			});
		}
		filters.forEach(function(func){
			func(link);
		});
	};
	var head = document.getElementsByTagName('head')[0];
	var global = this;
	var ApiSet = window.GM_deTinyurl = {};
	var decodeTinyurl = function(page) {
		$x('descendant-or-self::*[contains(@class,"entry-content")]/a[@href and starts-with(@href,"http://") and not(starts-with(@href,"http://twitter.com"))]',page)
		.forEach(function(link,i,links){
			var href=link.href;
			var tiny_id = href.replace(/\W/g,'_');
			var api = "http://ss-o.net/api/reurl.json?url="+href;
			var script = document.createElement('script');
			ApiSet[tiny_id] = function(res){
				if (/^http/.test(res.url) && res.url != href)
					decode(link,res.url);
				head.removeChild(script);
			};
			script.src= api + '&callback=GM_deTinyurl.' + tiny_id;
			head.appendChild(script);
		});
	}
	$x('id("timeline permalink")').forEach(decodeTinyurl);
	addFilter(decodeTinyurl);
})(window,0);