// ==UserScript==
// @name           NZBMatrix Hindi Language Filter
// @version        1.0
// @namespace      http://www.nzbmatrix.com
// @description    Filters the nzbs on NZBMatrix to only show English ones.
// @include        http://*nzbmatrix.com/*
// @include        https://*nzbmatrix.com/*
// ==/UserScript==

/* Author:me_savage E:savage@live.co.za */

(function(){

  var hideElements = function(elements) {
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/french.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/mandarin.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/german.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/cantonese.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/korean.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/japan.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/english.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/dutch.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/polish.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/hebrew.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/spanish.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/swedish.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/danish.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/italian.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/portuguese.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/russian.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	images = document.evaluate('//tr/td/img[@src="'+window.location.protocol+'//nzbmatrix.com/images/flags/norwegian.gif"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (i = 0; i < images.snapshotLength; i++) {
		(foo = images.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
	}
	
}

  var getElementsByClassName = function(classname) {
    if(document.getElementsByClassName) {
      return document.getElementsByClassName(classname);
    }
  }

  languagefilter = getElementsByClassName("NewOff");
  hideElements(languagefilter);

})();