// Bloomberg.com Ad-Skip
// version 0.1 beta
// 03-07-2008
// Copyright (c) 2008, Sheil Naik
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name          Bloomberg Ad-Skipper
// @description   Skip the intro ad on Bloomberg.com
// @include       http://bloomberg.com/*
// @include       http://*.bloomberg.com/*
// ==/UserScript==

if (document.body.textContent.match(/Skip Ad/)) {
    window.location.href = 'http://www.bloomberg.com/index.html?Intro=intro3';
}
