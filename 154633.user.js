// ==UserScript==
// @name        YouTube Design 2012/2013 Black Sidebar
// @author   Fetznschädl
// @description Makes the new YouTube sidebar black
// @include     http://youtube.com/*

// @include     https://youtube.com/*

// @include     http://*.youtube.com/*

// @include     https://*.youtube.com/*
// @version     1.0
// @resource      CustomCss http://rauschkugel.de/reference/youtube.css
// ==/UserScript==

GM_addStyle (GM_getResourceText ("CustomCss") );