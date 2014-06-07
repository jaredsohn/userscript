// ==UserScript==
// @name          newsingskipper
// @namespace     http://masumikawasaki.blogspot.com/
// @description   redirect to a page picked at newsing
// @include       http://newsing.jp/entry?url=*
// ==/UserScript==

var url = window.location.href.replace("newsing.jp/entry?url=", "");
	url = url.replace(/%2f/ig, "/");
	url = url.replace(/%3f/ig, "?");
	url = url.replace(/%3d/ig, "=");
	window.location.href = url;