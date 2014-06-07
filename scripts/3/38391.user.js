// ==UserScript==
// @name           Clean My Yahoo!
// @namespace      http://nahhhh.com
// @description    move header elements to the bottom of the page
// @include        http://*my.yahoo.com/*
// ==/UserScript==

(
	function()
	{
		var header = document.getElementById('hd');
		var footer = document.getElementById('ft');
		if (!header || !footer) {
			return;
		} else {
			header.parentNode.insertBefore(header, footer);
		}
	}
)();