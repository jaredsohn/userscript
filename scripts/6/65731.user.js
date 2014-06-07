		// ==UserScript==
		// @name 2-ch namefagging
		// @include	       http://2-ch.ru/*
		// @include	       http://www.2-ch.ru/*
		// ==/UserScript==
		if (window.document.title=='2-ch Warning') location.href=location.href+'wakaba.html';

		document.forms[0].elements['akane'].value=unescape(get_cookie('name'));

		document.forms[0].addEventListener('submit', function () {  
		set_cookie('name',escape(document.forms[0].elements['akane'].value),0)
		}, false);
