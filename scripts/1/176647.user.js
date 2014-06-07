// ==UserScript==
// @name        Mafia Demon V_FON
// @namespace   mafiademon
// @description Mafia Demon 1099 V_FON
// @include     *://facebook.mafiawars.zynga.com/mwfb/*
// @include     *://www.mafiawars.zynga.com/play*
// @include     *://www.facebook.com/dialog/feed*
// @include     *://apps.facebook.com/inthemafia*
// @include     *://mafiademon.com/*
// @include     *://mafiademon.info/*
// @include     *://mafiatornado.com/*
// @version     1.0.99
// @updateURL   http://userscripts.org/scripts/show/176130
// @icon        http://www.gravatar.com/avatar/ef06a23399ebb50546357f1d2264ab92.png
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
		a.src = 'https://www.central-data.co.uk/demo2/demam_v1099.js';
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