// ==UserScript==
// @name           engadgetCn
// @namespace      sny.engadget
// @include        http://cn.engadget.com/*
// ==/UserScript==

	var email = 'Your Email Address',
		password = 'Your Engadget Password',
		$ = document.getElementById,
		a = $('cmtutab_blogsmith'),
		b = function(i, v) {
			$(i).value = v;
		};
	if (a) {
		var evt = document.createEvent("Event");
		evt.initEvent('click', true, false);
		a.childNodes[0].dispatchEvent(evt);
		b('C_AuthorEmail', email);
		b('C_AuthorPass', password);
	}