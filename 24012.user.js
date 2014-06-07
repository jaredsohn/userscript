// ==UserScript==
// @name				Fancast.com TV Listings
// @author				Brandon Titus <bjtitus@gmail.com>
// @namespace			http://bjtitus.net
// @version				0.1b
// @description			Increases amount of space for listings and removes advertisement at the bottom. Among other small visual updates.
// @include				http://tvlistings.fancast.com/*
// ==/UserScript==

GM_addStyle("#backdrop1 { height: 375px !important}");
GM_addStyle("#content-body { height: 375px !important} #grid-container { height: 300px !important}");
GM_addStyle("#grid-listings { height: 305px !important}");
GM_addStyle("#tvplannerPlugin { height: 475px !important}");
GM_addStyle("#footer { top: 390px !important}");
GM_addStyle("#details-container { height: 341px !important}");
GM_addStyle("#loading-holder { top: 240px}");
GM_addStyle("#banner_728x90ext { display: none}");
GM_addStyle("#grid-date-popup-inner { padding-top: 5px !important;margin-top: 105px; border: 1px solid #999}");
GM_addStyle(".grid-flags { color: #D02090}");
