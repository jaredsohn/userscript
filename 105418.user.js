// ==UserScript==
// @author              qcts33
// @name                Google Reader Minimalistic Lite
// @namespace          http://google.com/reader/userscript
// @description           Removes all the whitespace from Google Reader and just gives you the news
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// @include             https://google.co.uk/reader/*
// @include             https://*.google.co.uk/reader/*
// ==/UserScript==
// Google Reader Minimalistic Lite

GM_addStyle("#logo-container,#chrome-header,#guser,#gbar,#gb{display:none;}");
GM_addStyle(".gbh {border-top: 0 none;}")
GM_addStyle("#top-bar {height:0px;}");
GM_addStyle("#main {left:0px;top:0px;margin-top:0px !important}");
GM_addStyle("#chrome {padding-top: 0px;}");
GM_addStyle("#search {position:absolute;left:700px;top:2px;z-index:10;margin-left: 0px;padding: 4px;}");
GM_addStyle("#search-input {width: 200px;}");
GM_addStyle("#lhn-add-subscription-section,#viewer-header{height: 35px;}");

