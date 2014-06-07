// ==UserScript==
// @name           Big Resource Unframer
// @namespace      http://www.bigresource.com/Tracker/*
// @description    Unframes the bigresource.com results
// @include        http://www.bigresource.com/Tracker/*
// ==/UserScript==

BRAP = function() {
	var joinBtn=document.evaluate("//frameset/frame[@scrolling='auto']",document,null,9,null).singleNodeValue;
	if(!joinBtn) return false;
	window.location = joinBtn.src
}

BRAP();