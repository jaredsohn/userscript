// ==UserScript==
// @name			G0V Chanhot referer fix
// @description		Fixes referers on chanhot
// @namespace		http://userscripts.org/users/dvanon
// @include			http://onlyhot.biz/*
// @include			http://*.onlyhot.biz/*
// @match			http://onlyhot.biz/*
// @match			http://*.onlyhot.biz/*
// @version			1.0.0
// @run-at			document-start
// ==/UserScript==
(function() 
{
	if (document.referrer == "")
	{
		window.location.href = location.href;
	}
})();