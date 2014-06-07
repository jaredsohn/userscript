// ==UserScript==
// @name           MPU/Banner Fix MPUK
// @namespace      Omnituens
// @description    PEW PEW's New Advert layout on MPUK Forums
// @include        http://forums.multiplay.co.uk/*
// ==/UserScript==

GM_addStyle('.mp-container { display:none; }');
GM_addStyle('.lb-container { display:none; }');
GM_addStyle('.wraplinks { display:none; }');
GM_addStyle('#container { -moz-border-radius: 0px 0px 0px 0px; \
			-webkit-border-radius: 0px 0px 0px 0px; }');

var controlbar = document.getElementById('content-head');

if (controlbar) 
{
	controlbar.style.width = "auto";
}