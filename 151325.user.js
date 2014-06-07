// ==UserScript==
// @name        rpgcodex max width
// @namespace   rpgcodex
// @description Limits max width for rpgcodex
// @include     http://www.rpgcodex.net/*
// @include     www.rpgcodex.net/*
// @include     rpgcodex.net/*
// @grant	GM_addStyle
// @version     1
// ==/UserScript==

GM_addStyle( ".panel_nowidth { max-width: 800px; }" );

GM_addStyle( ".content { max-width: 800px; }" );

GM_addStyle( ".messageContent{ max-width: 800px; }" );
