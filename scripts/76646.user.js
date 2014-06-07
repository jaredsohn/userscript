// ==UserScript==
// @name           myakuratter
// @namespace      http://seaoak.cocolog-nifty.com/
// @description    insert a link icon for myakuratter
// @include        http://twitter.com/*/status/*
// @include        http://twitter.com/*/statuses/*
// @include        http://favotter.net/status.php*
// @include        http://www.favotter.net/status.php*
// @include        http://favotter.net/
// @include        http://favotter.net/home.php*
// @include        http://www.favotter.net/
// @include        http://www.favotter.net/home.php*
// @include        http://favotter.net/user/*
// @include        http://www.favotter.net/user/*
// @include        http://favotter.net/user.php*
// @include        http://www.favotter.net/user.php*
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////
// 「みゃくらったー」へのリンクを埋め込むスクリプト
// 
//                                                      by Seaoak (seaoak2003)
//                                     http://seaoak.la.coocan.jp/myakuratter/
//
//////////////////////////////////////////////////////////////////////////////

(function(e){e.text='(function(){var f='+(function(){

	var isDebug = false;

	try {

		var baseUrl = 'http://seaoak.la.coocan.jp/myakuratter/';

		//========================================================================
		// utilities
		//========================================================================
		function arrayEach(array, func) {
			if (! array) return;
			if (! ('length' in array)) throw('arrayEach: must be an array or like an array');
			if (typeof(func) != 'function') throw('arrayEach: must be a function');
			for (var i=0; i<array.length; i++) {
				func(array[i]);
			}
		}

		//========================================================================
		// subroutines
		//========================================================================
		function makeLinkDom(id) {
			var imgDom = document.createElement('img');
			imgDom.src = baseUrl + '/icon_16x16.png';
			imgDom.setAttribute('alt', 'みゃくらったー');
			imgDom.style.margin = 0;
			imgDom.style.padding = 0;
			imgDom.style.borderStyle = 'none';
			
			var dom = document.createElement('a');
			dom.href = baseUrl + '?id=' + id;
			dom.setAttribute('title', 'みゃくらったー');
			dom.setAttribute('target', '_blank');
			dom.style.float = 'right';
			dom.appendChild(imgDom);

			return dom;
		}

		//========================================================================
		// for Twitter
		//========================================================================
		function procTwitterStatusPage(id) {
			var siblingDom = (function() {
				var list = document.getElementsByTagName('ul');
				for (var i in list) {
					if (list[i].className && (list[i].className.match(/(^\s*|\s)meta-data(\s|\s*$)/))) return list[i];
				}
				throw 'can not find "actions-hover" ul element';
			})();
			var linkDom = makeLinkDom(id);
			siblingDom.parentNode.insertBefore(linkDom, siblingDom);
		}

		//========================================================================
		// for ふぁぼったー
		//========================================================================
		function procFavotterPage() {
			arrayEach(document.getElementsByTagName('img'), function(imgDom) {
				if (! imgDom.src.match(/^(http:\/\/(www\.)?favotter\.net)?\/img\/twitter_favicon\.png$/)) return;
				if (! imgDom.parentNode.href) return;
				var match = imgDom.parentNode.href.match(/^https?:\/\/twitter\.com\/([-0-9a-zA-Z_]+)\/status(es)?\/(\d+)$/);
				if (! match) return;
				var id = match[3];
				var linkDom = makeLinkDom(id);
				linkDom.className = 'taggedlink';
				imgDom.parentNode.parentNode.insertBefore(linkDom, imgDom.parentNode.nextSibling);
			});
		}

		//========================================================================
		// main
		//========================================================================
		(function() {
			var match = location.href.match(/^https?:\/\/twitter\.com\/([-0-9a-zA-Z_]+)\/status(es)?\/(\d+)$/);
			if (match) {
				procTwitterStatusPage(match[3]);
			}
			return match;
		})() || (function() {
			var match = location.href.match(/^http:\/\/(www\.)?favotter\.net\/status\.php\?id=(\d+)$/);
			if (match) {
				procFavotterPage();
			}
			return match;
		})() || (function() {
			var match = location.href.match(/^http:\/\/(www\.)?favotter\.net\/(home\.php(\W\S*)?)?$/);
			if (match) {
				procFavotterPage();
			}
			return match;
		})() || (function() {
			var match = location.href.match(/^http:\/\/(www\.)?favotter\.net\/user\/([-0-9a-zA-Z_]+)(\W\S*)?$/);
			if (match) {
				procFavotterPage();
			}
			return match;
		})() || (function() {
			var match = location.href.match(/^http:\/\/(www\.)?favotter\.net\/user\.php\?user=([-0-9a-zA-Z_]+)$/);
			if (match) {
				procFavotterPage();
			}
			return match;
		})() || (function() {
			throw 'unknown URL: ' + location.href;
		})();

	} catch(e) {
		if (isDebug) alert('FATAL: ' + e);
	}

}).toString()+';with(f){f()}})()';document.body.appendChild(e)})(document.createElement('script'));
