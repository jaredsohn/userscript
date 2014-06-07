// Copyright (c) 2006, dingar@gmail.com
// ==UserScript==
// @name           CSDN Redirect
// @namespace      csdn
// @description    Auto redirect pages of tag.csdn.net or wz.csdn.net.
// @include        http://tag.csdn.net/Article/*
// @include        http://wz.csdn.net/url/*
// ==/UserScript==

if (history.length == 1) {
	var link = document.evaluate("//*[@id='LinkUrl']", document, null, 0, null).iterateNext();
	if(link==null)link = document.evaluate("//*[@class='link']/a[1]", document, null, 0, null).iterateNext();
	window.location = link.href;
}
