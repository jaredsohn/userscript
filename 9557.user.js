// ==UserScript==
// @name		  HatenaSearchAddLink
// @namespace	  http://d.hatena.ne.jp/bluerabbit/
// @include		  http://search.hatena.ne.jp/*
// ==/UserScript==

(function() {

	// -- [Main] ----------------------------------------------------------------------
	function main() {
		$('hatena-search-menu').innerHTML += '<li><a id="tagsearch" href="http://b.hatena.ne.jp/t/" >\u30BF\u30B0</a></li>';
		$('hatena-search-menu').innerHTML += '<li><a id="goosearch" href="http://dictionary.goo.ne.jp/search.php" >goo \u8F9E\u66F8</a></li>';
		$S('//form[@class="headsearch"] //input').setAttribute('id', 'word');
		$('tagsearch').addEventListener('click', function() { this.href = 'http://b.hatena.ne.jp/t/' + encodeURIComponent($('word').value) + '?sort=count'; }, false);
		$('goosearch').addEventListener('click', function() { this.href = 'http://dictionary.goo.ne.jp/search.php?' + 'MT=' + encodeURIComponent($('word').value) + '&IE=UTF-8&kind=all&kwassist=0&mode=0'; }, false);
	}

	// -- [Templete] ----------------------------------------------------------------------

	// Firefox log api
	function log() { unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments)) };

	function $(element) {
		return document.getElementById(element);
	}
	
	function $S(xpath, context) {
		context = context || document;
		return document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}

	window.addEventListener('load', function(){main();}, false);
})();