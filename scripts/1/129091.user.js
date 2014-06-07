// ==UserScript==
// @name        twitter prevent auto scroll after updating status
// @revision    1
// @author      KID the Euforia a.k.a. blueberrystream
// @description ツイート後にスクロール位置がツイート前に読み込んだ最新ツイートの位置になるのを防ぎます(前の挙動に戻します)。
// @namespace   http://kid0725.usamimi.info
// @include     http*://twitter.com
// @include     http*://twitter.com/*
// ==/UserScript==

void(function() {

function insertScript() {
	var e = document.createElement('script');
	e.setAttribute('type', 'text/javascript');
	e.innerHTML = "delete($('body')[0].scrollTop);";
	appendElement(e);

	function byTag(tagName, parent) {
		var e = parent ? parent : document;
		return e.getElementsByTagName(tagName);
	}
	function appendElement(element, parent) {
		var e = parent ? parent : byTag('body')[0];
		e.appendChild(element);
	}
}

setTimeout(insertScript, 3000);

})();