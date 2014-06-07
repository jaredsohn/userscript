// ==UserScript==
// @name           test
// @author         test
// @version        1.0
// @namespace      test
// @description    test
// @include	   *
// @run_at         document_idle
// ==/UserScript==

var s_init=setInterval(function()
{
	clearInterval(s_init);
	alert('chrome test');
	alert(window.location.href);
},1000);
