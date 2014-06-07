// ==UserScript==
// @name 9GAG Antisocial
// @description Removes social media 'share' buttons.
// @version 1.0
// @include http://9gag.com/*
// @include https://9gag.com/*
// ==/UserScript==

GM_addStyle('.btn-share, .badge-more-share-button { display: none !important; }')