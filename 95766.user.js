// ==UserScript==
// @name           hemnet cleanup
// @author         Peter Olby

// @version        1.0
// @namespace      olby.nu/hemnetcleanup
// @description    Removes irrelevant items on the Swedish site hmemnet.se
// @include        http://beta.hemnet.se/resultat
// @include        http://www.hemnet.se/*
// @include        http://beta.hemnet.se/*
// ==/UserScript==

//hide elements
GM_addStyle('#item-exposure, #exponeringsobjekt, #banner-topp, #banner-sida  {display:none;}');

//adjust padding for hidden elements
GM_addStyle('#sida, #kartsida, #enkel-sida  { padding:0px 10px 10px 10px;}');

//center main content
GM_addStyle('#sajt, #beta-banner { margin:0px auto 0px auto;}');

// --- hemnet beta ---

//hide elements
GM_addStyle('#top-banner, .ad-container, .object-box .header {display:none;}');