// ==UserScript==
// @name         Gmail Red Message Separator
// @namespace    http://hughbirkenhead.com/
// @description  Change Gmail's message separator lines to red
// @include      http*://mail.google.*/*
// @version      1.0
// ==/UserScript==

GM_addStyle(
	".hx .ky .Bk .G2, .hx .kv .Bk .G2, .hx .h7 .Bk .G2 { border-color: #DD4B39 !important; }\
	.Bk .G2 { border-top: 2px solid #DD4B39 !important; }\
	.hx .h7 .ac5 .gB, .hx .h7 .acO { border-top: 2px solid #DD4B39 !important; }\
	.hp { border-top: 2px solid #DD4B39 !important; }\
	.hx .kQ .Bk .G2 { border-color: #DD4B39 !important; }"
);