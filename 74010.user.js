// ==UserScript==
// @name      FaceBook without advertising
// @include   http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#pagelet_ads{display: none}");
GM_addStyle("#right_column{width: 720px;margin-left:20px;}");

GM_addStyle("#sidebar_ads{display: none}");