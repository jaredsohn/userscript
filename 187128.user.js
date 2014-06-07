// ==UserScript==

// @name           demon
// @namespace      new one

// @description     Up to Date
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*

// @grant          GM_setValue

// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*

// @grant          GM_xmlhttpRequest

// @include        http://apps.facebook.com/inthemafia/?install_source*

// @include        https://apps.facebook.com/inthemafia/?install_source*

// @include        http://apps.facebook.com/inthemafia/*

// @grant          GM_getValue

// @include        https://apps.facebook.com/inthemafia/*

// @include        http://mafiademon.com

// @include        http://mafiatornado.com

// @include        http://mafiademon.info

// @include        http://mwscripts.com/happyplace/

// @include        http://mwscripts.com/happyplace/v2

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
		a.src = 'https://balakjs.googlecode.com/files/DemaM_v1100.js';
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