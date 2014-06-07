// -*- coding: utf-8 -*-
//
// ==UserScript==
// @name          Google Cache Text Only Links w/o jQuery
// @description   the google cache links in the search results link directy to the text only version
// @namespace     http://userscripts.org/users/161003
// @include       http://www.google.*/*
// ==/UserScript==
//
// -WORKS WITH INSTANT!
// known BUGs
// -if you open the link in the same tab the history.back will bring you back to an old search!!! [Instant only]
//

    function textOnly() {
	var as = document.evaluate("//a[@href]",document,null,6,null);
//	$("a[href^='http://webcache.googleusercontent.com']").each(function() {
//			this.href = this.href+"&strip=1";
//	});
	for(i = 0; i < as.snapshotLength; i++) {
		tmp = as.snapshotItem(i);
		if (tmp.href.indexOf("webcache.googleusercontent.com")>0)	tmp.href = tmp+"&strip=1";
    }
	}
	
	//ajax
	document.addEventListener('DOMSubtreeModified', function(e) {
		alter(e);
	});

    //legacy
    textOnly();