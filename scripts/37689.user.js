// ==UserScript==
// @name           Twitter: preferable Blip.fm link
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://twitter.com*
// @include        https://twitter.com*
// @require        http://gist.github.com/raw/3242/1a7950e033a207efcfc233ae8d9939b676bdbf46
// ==/UserScript==

(function() {
	function find_link(doc) {
		Array.forEach(doc.getElementsByTagName('a'), function(e) {
			if(e.href.match(/^http:\/\/blip.fm\/~/)) {
				convert(e);
			}
		});
	}

	function convert(e) {
		GM_xmlhttpRequest({
		  method : 'get',
		  url : e.href,
		  onload : function(res) {
		    var doc = createHTMLDocumentByString(res.responseText);
				e.innerHTML = $X('//span[starts-with(@id, "tweem")]', doc)[0].innerHTML;
		  }
		});
	}

	find_link(document);

	if (window.AutoPagerize) {
		window.AutoPagerize.addFilter(function (pages) {
			pages.forEach(function (page) {
				find_link(page);
			});
		});
	}

	function createHTMLDocumentByString(str) {
		var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '');
		var htmlDoc  = document.implementation.createDocument(null, 'html', null);
		var fragment = createDocumentFragmentByString(html);
		htmlDoc.documentElement.appendChild(fragment);
		return htmlDoc;
	}

	function createDocumentFragmentByString(str) {
		var range = document.createRange()
		range.setStartAfter(document.body)
		return range.createContextualFragment(str)
	}
})()
