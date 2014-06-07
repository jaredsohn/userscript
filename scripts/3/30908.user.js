// ==UserScript==
// @name           QuotaDivAlignTextRight
// @namespace      http://userscripts.org/users/61459
// @description    Set CSS for #quota div so text aligns to the right.
// @include        https://mail.cooley.edu/gw/webacc
// ==/UserScript==
(function() {
	head = document.getElementsByTagName('head')[0];

	if (head)
	{
	 style = document.createElement('style');
	 style.type = 'text/css';
	 style.innerHTML = 'div#quota { text-align: right; }';
	 head.appendChild(style);
	}
})();