// ==UserScript==
// @name           @FREE_LUNA interstitial Ad-skipper
// @namespace      http://userscripts.org/users/228765
// @description    @FREE_LUNA ad skipper
// @include        http://apps.futur3.it/interstitial/*
// @copyright      Alexandru Babescu
// @version        0.2
// @license        Creative Commons Attribution-Noncommercial 3.0 
// ==/UserScript==

window.stop();
window.location = window.location.search.substring(5);