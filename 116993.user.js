// ==UserScript==
// @name           Compact Google Reader
// @namespace      Compact Google Reader
// @description    Compact Google Reader UI
// @match          http://www.google.com/reader/*
// @match          https://www.google.com/reader/*
// @author         i@dingstyle.me
// ==/UserScript==

GM_addStyle('#gb,#top-bar,#logo-section{display:none !important}#sections-header,#viewer-header,#lhn-add-subscription-section{height:55px !important}div[title="搜索"]{display:none !important}');