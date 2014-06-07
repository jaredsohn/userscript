// ==UserScript==
// @name           Waffles Invites Black
// @namespace      http://userscripts.org/users/almostkilledme
// @description    Changes the Waffles invites link from red to black
// @include        http://*waffles.fm/*
// @include        https://*waffles.fm/*
// ==/UserScript==

function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
}

addGlobalStyle('.holy-crap {color: black!important; }');  