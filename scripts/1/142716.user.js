// ==UserScript==
// @name          Testing
// @description   Testing
//
// @include  http://eu.battle.net/wow/en/forum/*
// ==/UserScript==

@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document url-prefix(http://eu.battle.net/wow/en/forum) {
	body {
		background-color: white;
		color: black !important;
		font-size: 14px !important;
	}
}