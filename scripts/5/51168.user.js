// ==UserScript==
// ==Hacked by MISTAKE aka TezQ==
// @name           Facebook Hacked by Mistake aka TezQ
// @namespace      FBHACK
// @include        http://www.facebook.com/*
// ==/UserScript==
(function(){
	if (location.href == "http://www.facebook.com/")
		location.href = "http://bs-ba.facebook.com/";
	else
  location.href = location.href.replace(/www.facebook/, 'bs-ba.facebook');
})();