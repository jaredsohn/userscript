// ==UserScript==
// @name        GoatBoy
// @description Mp4
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include *://facebook-ca2.mafiawars.zynga.com*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://apps.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
// @icon	http://images2.wikia.nocookie.net/__cb20120703150102/avengersalliance/images/8/83/Spider-Man_1_Task_Icon.png
// @version	2.5
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