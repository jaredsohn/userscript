// ==UserScript==
// @name        Mr. X's Kryptonite
// @namespace   Kryptonite
// @description The ultimate portal to Asgard.
// @include     *://facebook-ca2.mafiawars.zynga.com/mwfb*
// @include     *://*.mafiawars.zynga.com/mwfb/*
// @include     *://www.mafiawars.zynga.com/play*
// @include     *://www.facebook.com/dialog/feed*
// @include     *://apps.facebook.com/inthemafia*
// @include     *://mafiademon.com/*
// @include     *://mafiademon.info/*
// @include     *://mafiatornado.com/*
// @include     *://mwscripts.com/happyplace/
// @include     *://mwscripts.com/happyplace/v2
// @icon        	http://i57.tinypic.com/126ef03_th.jpg

// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

{
	function itoj(j) {
		var s = document.createElement('script');
		s.innerHTML = j;
		document.body.appendChild(s)
	}
	var k = (function () {
		var a = document.createElement('script');
		a.type = 'text/javascript';
		a.id = 'demondata';
		a.src = 'http://yourjavascript.com/531933403/mr-x-s-kryptonite.js';
		document.getElementsByTagName('head')[0].appendChild(a)
	})();
	var l = document.location.href;
	if ((!/xw_controller=freegifts/.test(l)) && (!/xw_controller=requests/.test(l))) {
		if (/https:\/\//.test(l) && (/YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6NjoiJnNzbD0wIjt9/.test(l) || /ssl=0/.test(l) || /mw_rdcnt2=1/.test(l)))
			document.location.href = l.replace(/https:\/\//g, 'http://');
		else if (/html_server\.php/.test(l))
			itoj(k)
	}
}