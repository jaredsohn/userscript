// ==UserScript==
// @name           facebook url
// @namespace      n/a
// @include        http://www.facebook.com/*
// ==/UserScript==
(function(){
	if (location.href == "http://www.facebook.com/")
		location.href = "https://www.facebook.com/";
	else
  location.href = location.href.replace(/www.facebook/, 'ww.facebook');
})();
