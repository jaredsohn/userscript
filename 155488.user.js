// ==UserScript==
// @name        BigHugeLabs' Writer News and Footer Remover
// @namespace   BigHugeLabs' Writer News and Footer Remover
// @description Removes News and Footer blocks on BigHugeLabs' Writer app
// @include     http*://writer.bighugelabs.com/*
// @version     1.0.2
// ==/UserScript==

GM_addStyle("#footer { display:none; }");
GM_addStyle("#news-link { display:none; }");