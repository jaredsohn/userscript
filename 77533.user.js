// ==UserScript==
// @name           demotywatory.pl - ukryte komentarze
// @description    wszystkie komentarze stają się widoczne
// @include        http://demotywatory.pl/*
// ==/UserScript==

if (typeof GM_addStyle !== 'function') {
	function GM_addStyle(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}

GM_addStyle('\
	.hidden { display: block; }\
	.negative { opacity: 1; }\
	.hidden_bar { display: none; }\
');
