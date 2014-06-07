// ==UserScript==
// @name           No Advert in Ikariam Board
// @namespace      NoBanner
// @description    No Advert in Ikariam Board
// @include        http://board.en.ikariam.com/*
// @include        http://board.en.ikariam.com/*
// @include        http://board.no.ikariam.com/*
// @include        http://board.no.ikariam.com/*
// @include        http://board.us.ikariam.com/*
// @include        http://board.us.ikariam.com/*
// @include        http://board.ar.ikariam.com/*
// @include        http://board.ar.ikariam.com/*
// @include        http://board.de.ikariam.com/*
// @include        http://board.de.ikariam.com/*
// @include        http://board.br.ikariam.com/*
// @include        http://board.br.ikariam.com/*
// @include        http://board.bg.ikariam.com/*
// @include        http://board.bg.ikariam.com/*
// @include        http://board.ve.ikariam.com/*
// @include        http://board.ve.ikariam.com/*
// @include        http://board.cl.ikariam.com/*
// @include        http://board.cl.ikariam.com/*


// ==/UserScript==

// ==============
// ==NoBanner==
body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = ".ego_column{display:none !important;}"
	body.appendChild(div);
}
// ==============