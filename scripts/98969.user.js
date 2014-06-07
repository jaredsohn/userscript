// --------------------------------------------------------------------------------
//
// Remove Last.fm Ads
// version 0.1
// 14-03-2011
// Copyright (c) 2011, Danny Li
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove Last.fm Ads
// @namespace     http://www.userscripts.org/scripts/show/98969
// @description   Removes ads on the Last.fm website.
// @include       http://*.last.fm/*
// @include       https://*.last.fm/*
// ==/UserScript==
//
// --------------------------------------------------------------------------------
//
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {return}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style)
}
addGlobalStyle('#LastAd_Top, #LastAd_TopRight, #LastAd_Mid, #footer_ads, #footerStuff, #LastAd_skin {display: none !important}')
//
// --------------------------------------------------------------------------------